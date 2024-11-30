export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  expertise: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  enrolled: number;
  estimatedCompletionTime: string;
  level: string;
  language: string;
  lastUpdated: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  category: string;
  duration: string;
  Creator: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    title: string;
    expertise: string[];
  };
  modules: {
    id: string;
    title: string;
    description: string;
    duration: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      isPreview: boolean;
    }[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  offersCertificate?: boolean;
  instructorRating?: number;
}