export type ContentType = 'video' | 'article' | 'ebook' | 'file';

export interface Author {
  name: string;
  role: string;
}

export interface Metrics {
  views: number;
  rating: number;
  completions: number;
  totalDuration: string;
  language: string;
}

export interface Details {
  mainCategory: string;
  tags: string[];
  description: string;
  lastUpdated: string;
}

export interface LearningObjective {
  id: string;
  title: string;
}

export interface Content {
  id: string;
  title: string;
  creator: Author;
  author: Author;
  price: number;
  type: ContentType;
  thumbnail: string;
  metrics: Metrics;
  details: Details;
  learningObjectives: LearningObjective[];
  prerequisites: string[];
  duration: string;
  level: string;
}

export interface CreateContentInput {
  title: string;
  description: string;
  type: ContentType;
  file_url: string;
  thumbnail_url?: string;
  price: number;
  currency: string;
  metadata?: Record<string, unknown>;
  categories?: string[];
}