import type { User, UserRole } from './user'

// to-do: refactor this to be more consistent with other types
export interface WalletUser {
  id: string;
  role: UserRole;
  address?: string;
  email?: string;
}

export interface RequestWithUser {
  user: WalletUser | null;
  headers?: Headers;
} 