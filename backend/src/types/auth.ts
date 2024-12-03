export interface SignMessagePayload {
  publicKey: string;
  nonce: string;
  statement: string;
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