import nacl from 'tweetnacl';
import bs58 from 'bs58';
import jwt from 'jsonwebtoken';
import type { User } from '../types/user';
import { config } from './config';

const BLOCK_VALID_FOR_SECONDS = 60;
const MESSAGE_PREFIX = 'Sign this message to log in to Mentora // ';

export async function generateNonce(): Promise<string> {
  const slot = await config.RPC.getSlot().send();
  return slot.toString();
}

export async function verifySignature(payload: {
  address: string;
  nonce: string;
  signature: string;
}): Promise<boolean> {
  try {
    // Verify block time
    const blockTime = await config.RPC.getBlockTime(BigInt(payload.nonce)).send();
    const now = Math.floor(Date.now() / 1000);
    const isRecent = blockTime && blockTime > (now - BLOCK_VALID_FOR_SECONDS);

    if (!isRecent) return false;

    const messageStr = MESSAGE_PREFIX + payload.nonce;
    const messageBytes = new TextEncoder().encode(messageStr);
    const signatureBytes = bs58.decode(payload.signature);
    const publicKeyBytes = bs58.decode(payload.address);

    // Verify the signature
    try {
      return nacl.sign.detached.verify(
        messageBytes,
        signatureBytes,
        publicKeyBytes
      );
    } catch (e) {
      console.error('Signature verification failed:', e);
      return false;
    }
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

export function createToken(user: User): string {
  const payload = {
    id: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
  };

  return jwt.sign(payload, config.SUPABASE_KEY);
}

export function verifyToken(token: string): { id: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, config.SUPABASE_KEY) as { id: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}