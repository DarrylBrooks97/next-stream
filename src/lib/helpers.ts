import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export function cn(...input: ClassValue[]) {
	return twMerge(clsx(input));
}
