export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  image: string;
  category: string;
  duration: string;
  enrolled: number;
  rating?: number;
  totalReviews?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  materials?: CourseMaterial[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'slides' | 'code';
  url: string;
  reviewed: boolean;
}