import { ReactNode } from 'react';
import {
  Gift,
  Smile,
  Box,
  ThumbsUp,
  Check,
  ShieldAlert,
  SquareBottomDashedScissors,
} from 'lucide-react';

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const conditionTypes: iAppProps[] = [
  {
    id: 0,
    name: 'NEW_WITH_TAGS',
    title: 'New with Tags',
    image: <Gift />,
  },
  {
    id: 1,
    name: 'NEW_WITHOUT_TAGS',
    title: 'New without Tags',
    image: <Box />,
  },
  {
    id: 2,
    name: 'LIKE_NEW',
    title: 'Like New',
    image: <Smile />,
  },
  {
    id: 3,
    name: 'GENTLY_USED',
    title: 'Gently Used',
    image: <ThumbsUp />,
  },
  {
    id: 4,
    name: 'GOOD',
    title: 'Good',
    image: <Check />,
  },
  {
    id: 5,
    name: 'FAIR',
    title: 'Fair',
    image: <ShieldAlert />,
  },
  {
    id: 6,
    name: 'FOR_PARTS_OR_REPAIR',
    title: 'For Parts or Repair',
    image: <SquareBottomDashedScissors />,
  },
];
