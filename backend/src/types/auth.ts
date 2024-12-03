import type { User } from './user';
import type { Context } from 'elysia';
import type { Cookie } from 'elysia';

export interface SignMessagePayload {
  publicKey: string;
  nonce: string;
  statement: string;
}

export interface AuthAdapter {
  generateNonce: () => string;
  createToken: (user: User) => Promise<string>;
  verifyToken: (token: string) => { id: string; role: string } | null;
  saveLoginAttempt: (address: string, nonce: string) => Promise<void>;
  validateLoginAttempt: (address: string, nonce: string) => Promise<boolean>;
}

export interface LoginAttempt {
  address: string;
  nonce: string | null;
  ttl: string | null;
  created_at: string;
}

export interface SignInAttempt {
  address: string;
  nonce: string;
  ttl: string;
}