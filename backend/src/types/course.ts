import type { BaseModel } from './db';
import type { User } from './user';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course extends BaseModel {
  title: string;
  description: string;
  instructor_id: string;
  price: string;
  currency: string;
  duration: number;
  level: CourseLevel;
  categories: string[];
  thumbnail_url: string | null;
  published: boolean;
  instructor?: User;
}

export type NewCourse = Omit<Course, keyof BaseModel>;

export interface CourseInput {
  title: string;
  description: string;
  price: string;
  currency: string;
  duration: number;
  level: CourseLevel;
  categories: string[];
  thumbnail_url?: string;
} 