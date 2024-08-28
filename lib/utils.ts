import { conditionTypes } from '@/app/lib/conditionTypes';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getConditionType(conditionName: string) {
  const condition = conditionTypes.find(
    (condition) => condition.name === conditionName
  );
  return condition;
}
