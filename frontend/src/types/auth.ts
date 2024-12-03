import type { User } from './user';

export enum LoginStatus {
  IDLE = 'IDLE',
  IN = 'IN',
  OUT = 'OUT'
}

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin'
}

export interface SignMessagePayload {
  publicKey: string;
  nonce: string;
  statement: string;
}

export interface Permission {
  operation: string;
  resource: string;
}

export type RolePermissions = Record<UserRole, Permission[]>;

export interface AuthState {
  user: User | null;
  loginStatus: LoginStatus;
  address: string | null;
  isLoading: boolean;
  error: string | null;
} 