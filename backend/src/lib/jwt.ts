import { sign, verify } from 'jsonwebtoken';
import type { User } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET!;

export function createToken(user: User): string {
  return sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: string; role: string } | null {
  try {
    const decoded = verify(token, JWT_SECRET) as { sub: string; role: string };
    return { id: decoded.sub, role: decoded.role };
  } catch {
    return null;
  }
} 