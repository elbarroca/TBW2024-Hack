export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin'
}

export interface PaymentMethod {
  type: 'crypto' | 'card';
  details: {
    address?: string;
    card_last4?: string;
    card_brand?: string;
  };
}

export interface BillingAddress {
  street: string;
  city: string;
  state?: string;
  country: string;
  postal_code: string;
}

export interface User {
  id: string;
  auth_user_id: string | null;
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
}

export type NewUser = Pick<User, 'id' | 'role'> & Partial<Omit<User, 'id' | 'role'>>;

export interface UserWithToken {
  user: User;
  token: string;
} 