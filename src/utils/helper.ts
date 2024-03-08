import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ClassNameInput = string | object | undefined | null | false;

export const cn = (...inputs: ClassNameInput[]): string => {
  return twMerge(clsx(inputs)) as string;
};
