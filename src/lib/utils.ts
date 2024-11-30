import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        ...options,
    }).format(number);
}
