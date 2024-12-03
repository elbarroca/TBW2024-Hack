import type { User, UserRole } from './user'

// to-do: refactor this to be more consistent with other types
export interface WalletUser {
  id: string;
  role: UserRole;
  address?: string;
  email?: string;
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
    role: UserRole;
    address?: string;
    email?: string;
  } | null;
  headers: Headers;
} 