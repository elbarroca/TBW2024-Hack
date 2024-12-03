export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  address: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  last_auth: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  billing_address?: any;
  payment_method?: any;
} 