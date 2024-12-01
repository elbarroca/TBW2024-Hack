import type { BaseModel, Json } from './db';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface User extends BaseModel {
  address: string | null;
  avatar_url: string | null;
  full_name: string | null;
  email: string;
  role: UserRole;
  last_auth: string | null;
  last_auth_status: string | null;
  nonce: string | null;
  billing_address: Json | null;
  payment_method: Json | null;
}

export type NewUser = Omit<User, keyof BaseModel | 'role'> & { role: UserRole };

export interface UserWithToken {
  user: User;
  token: string;
} 