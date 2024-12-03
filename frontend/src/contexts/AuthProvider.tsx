import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRequestNonceMutation, useVerifySignatureMutation, useLogoutMutation } from '@/api/endpoints/auth';
import { setUser, setPublicKey, setAuthError, setAuthLoading } from '@/store/auth';
import { LoginStatus, UserRole } from '@/types/auth';
import bs58 from 'bs58';
import { ApiResponse, AuthResponse, isErrorResponse } from '@/types/api';

interface AuthContextType {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  can: (operation: string, resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { publicKey, signMessage, disconnect } = useWallet();
  const [requestNonce] = useRequestNonceMutation();
  const [verifySignature] = useVerifySignatureMutation();
  const [logoutMutation] = useLogoutMutation();
  const { loginStatus } = useAppSelector(state => state.auth);

  const login = useCallback(async () => {
    if (!publicKey || !signMessage || loginStatus === LoginStatus.IN) return;
    
    try {
      dispatch(setAuthLoading(true));
      
      // Request nonce
      const nonceResponse = await requestNonce({ 
        publicKey: publicKey.toBase58() 
      }).unwrap();
      
      if (isErrorResponse(nonceResponse)) {
        throw new Error(nonceResponse.error);
      }
      
      // Create sign message
      const messagePayload = {
        publicKey: publicKey.toBase58(),
        nonce: nonceResponse.data.nonce,
        statement: 'SignIn'
      };

      const message = `${messagePayload.statement}${messagePayload.nonce}`;
      console.log('Frontend signing message:', message);
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);
      
      // Verify signature
      const authResponse = await verifySignature({ 
        message: JSON.stringify(messagePayload),
        signature 
      }).unwrap() as ApiResponse<AuthResponse>;
      
      if (isErrorResponse(authResponse)) {
        throw new Error(authResponse.error);
      }

      dispatch(setUser(authResponse.data.user));
    } catch (error: any) {
      console.error('Login error:', error);
      dispatch(setAuthError(error.message || 'Authentication failed'));
      await logout();
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, [publicKey, signMessage, dispatch, requestNonce, verifySignature, loginStatus]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await disconnect();
      dispatch(setUser(null));
    }
  }, [dispatch, disconnect, logoutMutation]);

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

  useEffect(() => {
    dispatch(setPublicKey(publicKey?.toBase58() || null));
    login();
  }, [publicKey, dispatch, login]);

  return (
    <AuthContext.Provider value={{ login, logout, can }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loginStatus, isLoading, error, publicKey } = useAppSelector(state => state.auth);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return {
    ...context,
    user,
    publicKey,
    isAuthenticated: loginStatus === LoginStatus.IN,
    isInstructor: user?.role === UserRole.INSTRUCTOR,
    isAdmin: user?.role === UserRole.ADMIN,
    isStudent: user?.role === UserRole.STUDENT,
    isLoading,
    error,
    loginStatus,
  };
};
