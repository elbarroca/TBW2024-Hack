export interface Creator {
  slug: string;
  name: string;
  image: string;
  bio: string;
  expertise: string[];
  rating: number;
  courses: number;
  students: number;
  category: string;
  isTopCreator?: boolean;
  twitterHandle?: string;
  githubHandle?: string;
  linkedinHandle?: string;
  website?: string;
  email?: string;
} 