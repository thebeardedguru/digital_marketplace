import { ReactNode } from 'react';
import { ShoppingBasket, Shirt, Gem } from 'lucide-react';

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: 'purses',
    title: 'Purses',
    image: <ShoppingBasket />,
  },
  {
    id: 1,
    name: 'clothing',
    title: 'Clothing',
    image: <Shirt />,
  },
  {
    id: 2,
    name: 'accessories',
    title: 'Accessories',
    image: <Gem />,
  },
];
