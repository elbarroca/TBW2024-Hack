export type UserRole = 'student' | 'instructor' | 'admin';

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface PaymentMethod {
  type: string;
  last4: string;
  expiry: string;
}

export interface User {
  id: string;
  address: string | null;
  avatar_url: string | null;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
  last_auth: string | null;
  last_auth_status: string | null;
  nonce: string | null;
  billing_address: BillingAddress | null;
  payment_method: PaymentMethod | null;
  bio: string | null;
  title: string | null;
  expertise: string[] | null;
  twitter_handle: string | null;
  is_top_creator: boolean;
  total_students: number;
  total_courses: number;
  creator_rating: number;
}

export type NewUser = Pick<User, 'id' | 'role'> & Partial<Omit<User, 'id' | 'role'>>;

export interface UserWithToken {
  user: User;
  token: string;
}

export interface CreatorStats {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  title: string | null;
  expertise: string[] | null;
  twitter_handle: string | null;
  is_top_creator: boolean;
  course_count: number;
  total_students: number;
  avg_rating: number;
} 