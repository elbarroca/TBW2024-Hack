import { Course, Module, FAQ } from './course';

export interface CourseDetails extends Course {
    modules: Module[];
    faqs?: FAQ[];
    prerequisites?: string[];
    certificate?: boolean;
    objectives?: string[];
    targetAudience?: string[];
    syllabus?: {
        weeks: number;
        hoursPerWeek: number;
        topics: string[];
    };
    tools?: {
        name: string;
        description: string;
        link?: string;
    }[];
    projects?: {
        title: string;
        description: string;
        skills: string[];
    }[];
    testimonials?: {
        id: string;
        name: string;
        avatar?: string;
        role?: string;
        comment: string;
        rating: number;
    }[];
} 