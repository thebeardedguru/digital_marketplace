import { notFound } from 'next/navigation';
import prisma from '../lib/db';
import Link from 'next/link';
import { LoadingProductCard, ProductCard } from './ProductCard';
import { conditionTypes } from '../lib/conditionTypes';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface iAppProps {
  category: 'newest' | 'purses' | 'clothing' | 'accessories';
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case 'accessories': {
      const data = await prisma.product.findMany({
        where: {
          category: 'accessories',
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          condition: true,
          images: true,
          id: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: 'Accessories',
        link: '/products/accessories',
      };
    }
    case 'clothing': {
      const data = await prisma.product.findMany({
        where: {
          category: 'clothing',
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          condition: true,
          images: true,
          id: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: 'Clothing',
        link: '/products/clothing',
      };
    }
    case 'purses': {
      const data = await prisma.product.findMany({
        where: {
          category: 'purses',
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          condition: true,
          images: true,
          id: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: 'Purses',
        link: '/products/purses',
      };
    }
    case 'newest': {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          condition: true,
          images: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 3,
      });

      return {
        data: data,
        title: 'Newest Products',
        link: '/products/all',
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: iAppProps) {
  return (
    <section className='mt-12'>
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='text-2xl font-extrabold tracking-tighter '>
          {data.title}
        </h2>
        <Link
          href={data.link}
          className='text-sm hidden font-medium text-primary hover:text-primary/90 md:block'
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10'>
        {data.data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            condition={
              conditionTypes.filter((condition) => {
                return condition.name === product.condition;
              })[0]
            }
            smallDescription={product.smallDescription}
            images={product.images}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className='h-8 w-56' />
      <div className='grid grid-cols-1 sm:grid-cols-2 mt-24 gap-10 lg:grid-cols-3'>
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
