import type { BaseModel, Json } from './db';
import type { User } from './user';

export type ContentType = 'video' | 'text' | 'article' | 'ebook' | 'research_paper' | 'file';

export interface ContentParams {
  id: string;
}

export interface Content extends BaseModel {
  title: string;
  description: string;
  creator_id: string;
  type: ContentType;
  file_url: string;
  thumbnail_url: string | null;
  price: number;
  currency: string;
  metadata: Json | null;
  published: boolean;
  creator?: User;
  categories?: string[];
}

export type NewContent = Omit<Content, keyof BaseModel>;

export interface CreateContentRequest {
  title: string;
  description: string;
  type: ContentType;
  price: number;
  currency: string;
  file: File;
  thumbnail?: File;
  categories?: string[];
  metadata?: Json;
}

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: string;
  };
} 