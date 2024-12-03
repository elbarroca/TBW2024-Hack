import { useAppSelector } from '@/store';
import type { UserRole } from '@/types/user';

export function useAuth() {
  const { user, loginStatus, isLoading, error } = useAppSelector(state => state.auth);
  const isAuthenticated = !!user;

  const can = (operation: string, resource: string) => {
    if (!user) return false;

    const rolePermissions: Record<UserRole, string[]> = {
      student: ['read'],
      instructor: ['read', 'create', 'update'],
      admin: ['read', 'create', 'update', 'delete']
    };

    const roleResources: Record<UserRole, string[]> = {
      student: ['courses', 'content', 'enrollments', 'progress'],
      instructor: ['courses', 'content', 'modules', 'lessons'],
      admin: ['*']
    };

    const userPerms = rolePermissions[user.role];
    const userResources = roleResources[user.role];

    return userPerms.includes(operation) && 
      (userResources.includes('*') || userResources.includes(resource));
  };

  return {
    user,
    isAuthenticated,
    isInstructor: user?.role === 'instructor',
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isLoading,
    error,
    loginStatus,
    can
  };
} 