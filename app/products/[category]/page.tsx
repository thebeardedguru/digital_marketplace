import { ProductCard } from '@/app/components/ProductCard';
import { conditionTypes } from '@/app/lib/conditionTypes';
import prisma from '@/app/lib/db';
import { getConditionType } from '@/lib/utils';
import { CategoryTypes } from '@prisma/client';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(category: string) {
  noStore();
  let input;

  switch (category) {
    case 'purses': {
      input = 'purses';
      break;
    }
    case 'clothing': {
      input = 'clothing';
      break;
    }
    case 'accessories': {
      input = 'accessories';
      break;
    }
    case 'all': {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      smallDescription: true,
      condition: true,
      name: true,
      price: true,
    },
  });

  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data = await getData(params.category);
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4'>
        {data?.map((product) => {
          // console.log('product is: ', product);
          return (
            <ProductCard
              key={product.id}
              images={product.images}
              condition={getConditionType(product.condition)}
              price={product.price}
              name={product.name}
              id={product.id}
              smallDescription={product.smallDescription}
            />
          );
        })}
      </div>
    </section>
  );
}
