/**
 * useWallet Hook - Custom React hook for wallet state management
 */

import { useState, useEffect } from 'react';
import { walletService } from '../services/WalletService';
import type { WalletState } from '../types';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(walletService.getState());

  useEffect(() => {
    // Subscribe to wallet state changes
    const unsubscribe = walletService.subscribe((state) => {
      setWalletState(state);
    });

    return () => unsubscribe();
  }, []);

  return walletState;
};
