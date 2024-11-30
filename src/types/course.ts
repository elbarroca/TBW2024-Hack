import { LucideIcon } from 'lucide-react';

export interface Course {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    instructor: {
        id: string;
        name: string;
        avatar: string;
        bio: string;
    };
    image: string;
    category: string;
    duration: string;
    enrolled: number;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    language: string;
    lastUpdated: string;
    whatYouWillLearn: string[];
    modules?: CourseModule[];
}

export interface CourseModule {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];
    duration: string;
    order: number;
}

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    duration: string;
    type: 'video' | 'quiz' | 'assignment';
    content: {
        videoUrl?: string;
        ipfsHash?: string;
        arweaveHash?: string;
    };
    isPreview: boolean;
    order: number;
    materials: CourseMaterial[];
    quiz?: Quiz;
}

export interface CourseMaterial {
    id: string;
    title: string;
    type: 'pdf' | 'slides' | 'code' | 'link';
    url: string;
    description?: string;
}

export interface Quiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
    passingScore: number;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}
