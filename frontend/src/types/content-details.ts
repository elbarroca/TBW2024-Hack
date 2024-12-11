export type ContentType = 'ebook' | 'video' | 'article' | 'file';

export interface Content {
  id: string;
  title: string;
  creator: string;
  price: number;
  originalPrice?: number;
  type: ContentType;
  thumbnail: string;
  downloads: number;
  rating: number;
  category: string;
  tags: string[];
  description: string;
  detailedDescription: string;
  lastUpdated: string;
  author: {
    id: string;
    name: string;
    slug: string;
    avatar: string;
    bio: string;
    followers: number;
    totalViews: number;
    expertise: string;
    rating: string;
    courses: number;
    students: number;
    isTopCreator: boolean;
    twitterHandle: string;
    tags: string[];
  };
  metrics: {
    views: number;
    likes: number;
    rating: number;
    completions: number;
    totalDuration: string;
    lastUpdated: string;
    language: string;
    subtitles: string[];
  };
  details: {
    chapters: number;
    exercises: number;
    quizzes: number;
    resources: number;
    level: string;
    format: string;
    overview?: string;
  };
  learningObjectives: {
    id: string;
    title: string;
    description: string;
  }[];
  prerequisites: string[];
  targetAudience: string[];
  certification: boolean;
}
