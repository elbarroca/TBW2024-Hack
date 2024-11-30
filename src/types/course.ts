export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  title?: string;
  rating?: number;
  students?: number;
  courses?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  enrolled: number;
  estimatedCompletionTime: string;
  level: string;
  language: string;
  lastUpdated: string;
  whatYouWillLearn: string[];
  requirements?: string[];
  targetAudience?: string[];
  modules?: Module[];
  instructor: Instructor;
  faq?: FAQ[];
}