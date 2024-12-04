export type ContentType = 'video' | 'article' | 'ebook' | 'course' | 'file';

export interface Content {
  id: string;
  title: string;
  description: string;
  creator_id: string;
  type: ContentType;
  file_url: string;
  thumbnail_url?: string;
  price: number;
  currency: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: string[];
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