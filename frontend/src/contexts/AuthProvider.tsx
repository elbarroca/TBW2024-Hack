import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRequestNonceMutation, useVerifySignatureMutation, useLogoutMutation } from '@/api/endpoints/auth';
import { setUser, setPublicKey, setAuthError, setAuthLoading, resetAuth } from '@/store/auth';
import { LoginStatus, UserRole } from '@/types/auth';
import bs58 from 'bs58';
import { ApiResponse, AuthResponse } from '@/types/api';
import { PublicKey } from '@solana/web3.js';
import { useGetBalancesQuery, useLazyGetBalancesQuery } from '@/api/endpoints/solana';
import { setBalances, setUserDataError, setUserDataLoading, resetUserData } from '@/store/user';

interface AuthContextType {
  logout: () => Promise<void>;
  can: (operation: string, resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MESSAGE_PREFIX = 'Sign this message to log in to Mentora // ';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { publicKey, signMessage, disconnect } = useWallet();
  const [requestNonce] = useRequestNonceMutation();
  const [verifySignature] = useVerifySignatureMutation();
  const [logoutMutation] = useLogoutMutation();
  const [fetchBalances] = useLazyGetBalancesQuery();
  const { loginStatus } = useAppSelector(state => state.auth);

  const login = useCallback(async (publicKey: PublicKey | null) => {
    if (!publicKey || !signMessage || loginStatus === LoginStatus.IN) return;
    
    // Check if wallet supports signing
    if (typeof signMessage !== 'function') {
      dispatch(setAuthError('Wallet does not support message signing'));
      return;
    }
    
    dispatch(setPublicKey(publicKey.toBase58()));
    try {
      dispatch(setAuthLoading(true));
      
      // Request nonce
      const { nonce } = await requestNonce({ 
        address: publicKey.toBase58() 
      }).unwrap();
      
      // Create message with the same prefix as backend
      const message = MESSAGE_PREFIX + nonce;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);
      
      // Verify signature
      const { user } = await verifySignature({ 
        address: publicKey.toBase58(),
        nonce,
        signature 
      }).unwrap();

      dispatch(setUser(user));

      // Fetch user balances
      try {
        dispatch(setUserDataLoading(true));
        const response = await fetchBalances(publicKey.toBase58()).unwrap();
        // Ensure balances exist before dispatching
        if (response && response.balances) {
          dispatch(setBalances(response.balances));
        } else {
          dispatch(setBalances([])); // Set empty balances if none found
        }
      } catch (balanceError) {
        console.error('Failed to fetch balances:', balanceError);
        dispatch(setBalances([])); // Set empty balances on error
      } finally {
        dispatch(setUserDataLoading(false));
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        dispatch(setAuthError(error.message));
      } else {
        dispatch(setAuthError('Authentication failed'));
      }
      await logout();
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, [publicKey, signMessage, dispatch, requestNonce, verifySignature, loginStatus, fetchBalances]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(resetAuth());
      dispatch(resetUserData());
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
    login(publicKey);
  }, [publicKey, login]);

  return (
    <AuthContext.Provider value={{ logout, can }}>
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
    isInstructor: user ? user.role === UserRole.INSTRUCTOR : false,
    isAdmin: user ? user.role === UserRole.ADMIN : false,
    isStudent: user ? user.role === UserRole.STUDENT : false,
    isLoading,
    error,
    loginStatus,
  };
};

