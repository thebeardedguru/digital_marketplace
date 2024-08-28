import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../lib/db';
import { ConditionObj, ProductCard } from '../components/ProductCard';
import { getConditionType } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      images: true,
      smallDescription: true,
      id: true,
      condition: true,
      price: true,
    },
  });

  return data;
}

export default async function MyProducts() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error('Unauthorized');

  const data = await getData(user.id);
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-8'>
      <h1 className='text-2xl font-bold'>My Products</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4'>
        {data.map((item) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              images={item.images}
              price={item.price}
              name={item.name}
              smallDescription={item.smallDescription}
              condition={getConditionType(item.condition)}
            />
          );
        })}
      </div>
    </section>
  );
}
