import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch, type RootState } from '@/store';
import { UserRole } from '@/types/auth';
import { clearUser } from '@/store/auth';
import { useWallet } from '@solana/wallet-adapter-react';

interface AuthContextType {
    can: (operation: string, resource: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.auth);
    const wallet = useWallet();

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

    const logout = useCallback(async () => {
        try {
            if (wallet.disconnect) {
                await wallet.disconnect();
            }
            dispatch(clearUser());
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }, [dispatch, wallet]);

    const contextValue = useMemo(() => ({
        can,
        logout,
    }), [can, logout]);

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