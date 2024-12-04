import type { BaseModel } from './db';
import type { User } from './user';

export enum CourseLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum CourseLanguage {
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Chinese'
}

export interface Course extends BaseModel {
  title: string;
  description: string;
  instructor_id: string;
  price: number;
  currency: string;
  duration: number;
  subtitle?: string;
  level: CourseLevel;
  language: CourseLanguage;
  enrolled: number;
  rating: number;
  reviews: number;
  original_price?: number;
  last_updated: string;
  certificate: boolean;
  image_url?: string;
  category?: string;
  what_you_will_learn?: string[];
  published: boolean;
  instructor?: User;
  tags?: string[];
}

export type NewCourse = Omit<Course, keyof BaseModel>;

export interface CourseInput {
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  subtitle?: string;
  level: CourseLevel;
  language: CourseLanguage;
  original_price?: number;
  certificate?: boolean;
  image_url?: string;
  category?: string;
  what_you_will_learn?: string[];
  tags?: string[];
} 