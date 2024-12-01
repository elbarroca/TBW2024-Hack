import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRequestNonceMutation, useVerifySignatureMutation } from '@/api/endpoints/auth';
import { setLoginStatus, setUser, setAuthError, setAuthLoading } from '@/store/auth';
import { LoginStatus } from '@/types/auth';
import { UserRole } from '@/types/user';
import bs58 from 'bs58';
interface AuthContextType {
  login: (address: string, signMessage: (message: string) => Promise<string>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { publicKey,signMessage, disconnect } = useWallet();
  const [requestNonce] = useRequestNonceMutation();
  const [verifySignature] = useVerifySignatureMutation();

  useEffect(() => {
    if (!publicKey) return;
    const address = publicKey.toBase58();

    login(address);
  }, [publicKey]);

  const login = useCallback(async (address: string) => {
    if (!signMessage) return;

    try {
      dispatch(setAuthLoading(true));
      
      // Request nonce
      const { nonce } = await requestNonce({ address }).unwrap();
      
      // Sign nonce
      const message = new TextEncoder().encode(nonce);
      const signedMessage = await signMessage(message);
      const signature = bs58.encode(signedMessage);
      
      // Verify signature
      const { user, token } = await verifySignature({ address, signature }).unwrap();
      
      // Store auth data
      localStorage.setItem('token', token);
      dispatch(setUser(user));
      dispatch(setLoginStatus(LoginStatus.IN));
    } catch (error) {
      console.error('Login error:', error);
      dispatch(setAuthError('Authentication failed'));
      await logout();
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch, requestNonce, verifySignature]);

  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    await disconnect();
    dispatch(setUser(null));
    dispatch(setLoginStatus(LoginStatus.OUT));
  }, [dispatch, disconnect]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loginStatus, isLoading, error } = useAppSelector(state => state.auth);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

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

    return rolePermissions[user.role]?.includes(operation) && 
      (roleResources[user.role]?.includes('*') || roleResources[user.role]?.includes(resource));
  };

  return {
    ...context,
    user,
    isAuthenticated: !!user,
    isInstructor: user?.role === 'instructor',
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isLoading,
    error,
    loginStatus,
    can
  };
};
