import type { BaseModel, Json } from './db';

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin'
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
  billing_address: Json | null;
  payment_method: Json | null;
}

export type NewUser = Pick<User, 'id' | 'role'> & Partial<Omit<User, 'id' | 'role'>>;

export interface UserWithToken {
  user: User;
  token: string;
} 