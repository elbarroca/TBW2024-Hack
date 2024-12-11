export interface Lesson {
    id: string;
    title: string;
    duration: string;
    isPreview: boolean;
}

export interface Module {
    id: string;
    title: string;
    duration: string;
    order: number;
    lessons: Lesson[];
}

export interface Creator {
    id: string;
    name: string;
    title?: string;
    bio?: string;
    avatar: string;
    expertise?: string[];
}

export interface FAQ {
    question: string;
    answer: string;
}

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
    id: string;
    title: string;
    subtitle: string;
    description?: string;
    creator: Creator;
    rating?: number;
    reviews?: number;
    enrolled?: number;
    duration?: string;
    level?: string;
    language?: string;
    lastUpdated?: string;
    whatYouWillLearn?: string[];
    price: number;
    originalPrice?: number;
    category?: string;
    image?: string;
    tags?: string[];
    url?: string;
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
