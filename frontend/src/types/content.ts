export type ContentType = 'video' | 'text' | 'article' | 'ebook' | 'research_paper' | 'file';

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
  metadata?: Record<string, any>;
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
  metadata?: Record<string, any>;
  categories?: string[];
} 