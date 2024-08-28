import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface ConditionObj {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  condition: ConditionObj | undefined;
  smallDescription: string;
  id: string;
}

export function ProductCard({
  images,
  name,
  price,
  condition,
  smallDescription,
  id,
}: iAppProps) {
  // console.log('condition is: ', condition);
  return (
    <div className='rounded-lg'>
      <Carousel className='w-full mx-auto'>
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className='relative h-[230px]'>
                <Image
                  alt='Product image'
                  src={item}
                  fill
                  className='object-cover w-full h-full rounded-lg'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='ml-16' />
        <CarouselNext className='mr-16' />
      </Carousel>

      <div className='flex justify-between items-center mt-2'>
        <h1 className='font-semibold text-md'>{name}</h1>
        <h3 className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10'>
          ${price}
        </h3>
      </div>
      <div className='flex mt-4'>
        <h3 className='text-gray-500'>Condition:</h3>
        <div className='flex items-center ml-auto'>
          <span className='ml-4 font-medium text-gray-500'>
            {condition?.title}
          </span>
          <span className='ml-4 text-primary'>{condition?.image}</span>
        </div>
      </div>

      <p className='text-gray-600 line-clamp-2 mt-2'>{smallDescription}</p>

      <Button asChild className='w-full mt-5 bg-primary'>
        <Link href={`/product/${id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className='flex flex-col'>
      <Skeleton className='w-full h-[230px]' />
      <div className='flex flex-col mt-2 gap-y-2'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-6' />
      </div>

      <Skeleton className='w-full h-10 mt-5' />
    </div>
  );
}
