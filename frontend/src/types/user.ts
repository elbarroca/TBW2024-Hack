export type UserRole = 'student' | 'creator' | 'admin';

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
  token: string;
}

export interface UserProfile extends User {
  billing_address?: string;
  payment_method?: string;
} 