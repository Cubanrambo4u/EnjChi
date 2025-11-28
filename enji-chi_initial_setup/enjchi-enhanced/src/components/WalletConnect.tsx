/**
 * WalletConnect Component - Handles wallet selection and connection
 */

import React, { useState, useEffect } from 'react';
import { walletService } from '../services/WalletService';
import type { WalletType } from '../types';
import './WalletConnect.css';

interface WalletConnectProps {
  onConnect: (address: string, walletType: WalletType) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [availableWallets, setAvailableWallets] = useState({ enjin: false, metamask: false });
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Detect available wallets
    const wallets = walletService.detectAvailableWallets();
    setAvailableWallets(wallets);

    // Subscribe to wallet state changes
    const unsubscribe = walletService.subscribe((state) => {
      setConnected(state.connected);
      setAddress(state.address);
    });

    return () => unsubscribe();
  }, []);

  const handleConnect = async (walletType: WalletType) => {
    setConnecting(true);
    setError(null);

    try {
      const state = await walletService.connect(walletType);
      if (state.connected && state.address) {
        onConnect(state.address, walletType);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Connection error:', err);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    walletService.disconnect();
    setConnected(false);
    setAddress(null);
  };

  const formatAddress = (addr: string): string => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (connected && address) {
    return (
      <div className="wallet-connect connected">
        <div className="wallet-info">
          <span className="status-indicator">●</span>
          <span className="address">{formatAddress(address)}</span>
        </div>
        <button className="disconnect-btn" onClick={handleDisconnect}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <h3>Connect Your Wallet</h3>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="wallet-options">
        {availableWallets.enjin && (
          <button
            className="wallet-btn enjin"
            onClick={() => handleConnect('enjin')}
            disabled={connecting}
          >
            <span className="wallet-icon">🎮</span>
            <span className="wallet-name">Enjin Wallet</span>
          </button>
        )}

        {availableWallets.metamask && (
          <button
            className="wallet-btn metamask"
            onClick={() => handleConnect('metamask')}
            disabled={connecting}
          >
            <span className="wallet-icon">🦊</span>
            <span className="wallet-name">MetaMask</span>
          </button>
        )}

        {!availableWallets.enjin && !availableWallets.metamask && (
          <div className="no-wallet-message">
            <p>No wallet detected. Please install:</p>
            <ul>
              <li><a href="https://enjin.io/products/wallet" target="_blank" rel="noopener noreferrer">Enjin Wallet</a></li>
              <li><a href="https://metamask.io" target="_blank" rel="noopener noreferrer">MetaMask</a></li>
            </ul>
          </div>
        )}
      </div>

      {connecting && (
        <div className="connecting-message">
          Connecting...
        </div>
      )}
    </div>
  );
};
