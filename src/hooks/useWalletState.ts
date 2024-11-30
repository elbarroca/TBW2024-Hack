import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState, useCallback } from 'react';

export function useWalletState() {
  const { publicKey, connected, connecting } = useWallet();
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const checkWalletConnection = useCallback(() => {
    // Only consider connected if we have both connected state and publicKey
    const isWalletConnected = connected && !!publicKey && !connecting;
    
    if (isWalletConnected) {
      try {
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAddress', publicKey.toBase58());
        setIsProfileVisible(true);
      } catch (error) {
        console.error('Error storing wallet state:', error);
      }
    } else {
      try {
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');
        setIsProfileVisible(false);
      } catch (error) {
        console.error('Error removing wallet state:', error);
      }
    }
  }, [connected, publicKey, connecting]);

  // Check connection status whenever wallet state changes
  useEffect(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  // Initial check on mount
  useEffect(() => {
    const storedWalletConnected = localStorage.getItem('walletConnected') === 'true';
    if (storedWalletConnected && !connected) {
      // Clear stored state if wallet is disconnected
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');
      setIsProfileVisible(false);
    }
  }, []);

  return {
    isProfileVisible,
    walletAddress: publicKey?.toBase58(),
    isConnecting: connecting,
    isConnected: connected && !!publicKey
  };
} 