export interface Creator {
  name: string;
  slug: string;
  role: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  duration: string;
  level: string;
  bio: string;
  expertise: string[];
  socialLinks: {
    twitter: string;
    github: string;
  };
  achievements: {
    title: string;
    description: string;
  }[];
  earnings: number;
  tips: number;
  category: string;
  isTopCreator?: boolean;
}