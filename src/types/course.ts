export interface LessonPart {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'quiz' | 'assignment';
    content?: {
        videoUrl?: string;
        ipfsHash?: string;
        arweaveHash?: string;
    };
    isPreview: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    duration: string;
    parts: LessonPart[];
    order: number;
}

export interface Module {
    id: string;
    title: string;
    duration: string;
    lessons: Lesson[];
}

export interface Creator {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    expertise: string[];
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
    description: string;
    creator: Creator;
    image: string;
    category: string;
    duration: string;
    enrolled: number;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    level: Level;
    language: string;
    lastUpdated: string;
    whatYouWillLearn: string[];
    lessons?: Lesson[];
    certificate?: boolean;
    tags?: string[];
}

export interface CourseModule {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];
    duration: string;
    order: number;
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
