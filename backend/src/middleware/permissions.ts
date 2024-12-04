import { ApiError } from '../types/apiError';
import { Permission } from '../types/permissions';
import type { ElysiaContext, RequestUser } from '../types/request';

function hasPermission(role: string, permission: Permission): boolean {
  switch (permission) {
    case Permission.CREATE_COURSE:
      return role === 'instructor' || role === 'admin';
    case Permission.READ_COURSE:
      return true;
    case Permission.UPDATE_COURSE:
      return role === 'instructor' || role === 'admin';
    case Permission.DELETE_COURSE:
      return role === 'instructor' || role === 'admin';
    case Permission.PUBLISH_COURSE:
      return role === 'instructor' || role === 'admin';
    default:
      return false;
  }
}

export const requirePermission = (permission: Permission) => 
  async (context: ElysiaContext) => {
    const user = context.user as RequestUser;
    
    if (!user) {
      throw new ApiError(401, 'Unauthorized');
    }

    if (!hasPermission(user.role, permission)) {
      throw new ApiError(403, 'Forbidden');
    }
  }; 