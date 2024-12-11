import { Author } from '@/types/content';

export interface CreatorCardProps extends Omit<Author, 'id'> {
  creatorId: string;
  image: string;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creatorId,
  name,
  image,
  expertise,
  rating,
  bio,
  courses,
  students,
  slug,
  isTopCreator,
  twitterHandle,
  tags
}) => {
  // ... rest of the component implementation
}; 