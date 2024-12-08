import React, { createContext, useContext, useCallback } from 'react';
import { useAppSelector } from '@/store';
import { UserRole } from '@/types/auth';

interface AuthContextType {
    can: (operation: string, resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const can = useCallback((operation: string, resource: string) => {
        const { user } = useAppSelector(state => state.auth);
        if (!user) return false;

        const rolePermissions: Record<UserRole, string[]> = {
            [UserRole.STUDENT]: ['read'],
            [UserRole.INSTRUCTOR]: ['read', 'create', 'update'],
            [UserRole.ADMIN]: ['read', 'create', 'update', 'delete']
        };

        const roleResources: Record<UserRole, string[]> = {
            [UserRole.STUDENT]: ['courses', 'content', 'enrollments', 'progress'],
            [UserRole.INSTRUCTOR]: ['courses', 'content', 'modules', 'lessons'],
            [UserRole.ADMIN]: ['*']
        };

        return rolePermissions[user.role]?.includes(operation) && 
            (roleResources[user.role]?.includes('*') || roleResources[user.role]?.includes(resource));
    }, []);

    return (
        <AuthContext.Provider value={{
            can,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

