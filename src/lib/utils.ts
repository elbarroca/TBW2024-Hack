import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Navigation utility functions
export function getContentUrl(creatorSlug: string, contentSlug: string) {
    return `/content/${creatorSlug}/${contentSlug}`;
}

export function getCourseUrl(creatorSlug: string, courseSlug: string) {
    return `/${creatorSlug}/${courseSlug}`;
}

export function getCreatorUrl(creatorSlug: string) {
    return `/${creatorSlug}`;
}
