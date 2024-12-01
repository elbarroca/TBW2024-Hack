import { Elysia } from "elysia";
import type { RequestWithUser } from "../types/content";
import { UserRole } from "../types/user";
import { verifyToken } from "../lib/jwt";

// Define allowed operations per role
const rolePermissions: Record<UserRole, string[]> = {
  student: ['read'],
  instructor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete']
};

// Define resource access per role
const roleResources: Record<UserRole, string[]> = {
  student: ['courses', 'content', 'enrollments', 'progress'],
  instructor: ['courses', 'content', 'modules', 'lessons'],
  admin: ['*']  // All resources
};

export const verifyAuth = new Elysia()
  .derive(({ request }: { request: RequestWithUser }) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return { user: null };
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);
    return { user };
  });

export const requireRole = (roles: UserRole[]) => 
  new Elysia().derive(({ request }: { request: RequestWithUser }) => {
    const user = request.user;
    if (!user || !roles.includes(user.role as UserRole)) {
      throw new Error('Unauthorized: Insufficient permissions');
    }
  });

export const checkPermission = (operation: string, resource: string) =>
  new Elysia().derive(({ request }: { request: RequestWithUser }) => {
    const user = request.user;
    if (!user) {
      throw new Error('Unauthorized');
    }

    const userPerms = rolePermissions[user.role as UserRole];
    const userResources = roleResources[user.role as UserRole];

    const hasPermission = userPerms.includes(operation) && 
      (userResources.includes('*') || userResources.includes(resource));

    if (!hasPermission) {
      throw new Error(`Unauthorized: Cannot ${operation} ${resource}`);
    }
  }); 