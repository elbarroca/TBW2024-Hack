import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useAppSelector } from '@/store';
import { UserRole } from '@/types/auth';

interface AuthContextType {
    can: (operation: string, resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAppSelector(state => state.auth);

    const rolePermissions = useMemo(() => ({
        [UserRole.STUDENT]: ['read'],
        [UserRole.INSTRUCTOR]: ['read', 'create', 'update'],
        [UserRole.ADMIN]: ['read', 'create', 'update', 'delete']
    }), []);

    const roleResources = useMemo(() => ({
        [UserRole.STUDENT]: ['courses', 'content', 'enrollments', 'progress'],
        [UserRole.INSTRUCTOR]: ['courses', 'content', 'modules', 'lessons'],
        [UserRole.ADMIN]: ['*']
    }), []);

    const can = useCallback((operation: string, resource: string) => {
        if (!user) return false;
        const permissions = rolePermissions[user.role];
        const resources = roleResources[user.role];
        return permissions?.includes(operation) && 
            (resources?.includes('*') || resources?.includes(resource));
    }, [user, rolePermissions, roleResources]);

    const contextValue = useMemo(() => ({
        can,
    }), [can]);

    return (
        <AuthContext.Provider value={contextValue}>
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