import { User } from './user';

export interface RequestUser {
  id: string;
  role: User['role'];
}

export interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

export interface ElysiaContext {
  body: unknown;
  query: Record<string, string | undefined>;
  params: Record<string, string>;
  headers: Record<string, string | undefined>;
  request: Request;
  [key: string]: any;
} 