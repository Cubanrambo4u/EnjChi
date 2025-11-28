/**
 * App Component - Main application component
 */

import React, { useState, useEffect } from 'react';
import { Game } from './components/Game';
import { WalletConnect } from './components/WalletConnect';
import { HatchButton } from './components/HatchButton';
import { useWallet } from './hooks/useWallet';
import { enjinService } from './services/EnjinService';
import { validateConfig } from './config/blockchain.config';
import type { WalletType, NFTOwnership } from './types';
import './App.css';

function App() {
  const walletState = useWallet();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [nftOwnership, setNftOwnership] = useState<NFTOwnership | null>(null);

  useEffect(() => {
    // Validate configuration on mount
    const { valid, warnings } = validateConfig();
    if (!valid) {
      console.warn('Configuration warnings:', warnings);
      setStatusMessage('⚠️ Running in development mode. Configure .env for production.');
    }
  }, []);

  useEffect(() => {
    // Check NFT ownership when wallet connects
    if (walletState.connected && walletState.address) {
      checkNFTOwnership(walletState.address);
    } else {
      setNftOwnership(null);
      setStatusMessage('');
    }
  }, [walletState.connected, walletState.address]);

  const checkNFTOwnership = async (address: string) => {
    try {
      setStatusMessage('Checking NFT ownership...');
      const ownership = await enjinService.checkNFTOwnership(address);
      setNftOwnership(ownership);
      
      if (ownership.owned) {
        setStatusMessage(`✅ You own ${ownership.balance}x Enji-chi Egg NFT!`);
      } else {
        setStatusMessage('⚠️ You do not own the required Enji-chi Egg NFT');
      }
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
      setStatusMessage('⚠️ Could not verify NFT ownership');
    }
  };

  const handleWalletConnect = (address: string, walletType: WalletType) => {
    console.log(`Connected to ${walletType} wallet:`, address);
    setStatusMessage(`✅ Connected to ${walletType} wallet`);
  };

  const handleHatchClick = async () => {
    if (!walletState.connected || !walletState.address) {
      setStatusMessage('❌ Please connect your wallet first');
      return;
    }

    if (nftOwnership && !nftOwnership.owned) {
      setStatusMessage('❌ You need to own an Enji-chi Egg NFT to hatch');
      return;
    }

    setLoading(true);
    setStatusMessage('🥚 Initiating hatch transaction...');

    try {
      const result = await enjinService.executeHatchTransaction(walletState.address);
      
      if (result.success) {
        setStatusMessage('🎉 Hatching successful!');
        // Trigger game animation
        if ((window as any).triggerHatch) {
          (window as any).triggerHatch();
        }
      } else {
        setStatusMessage(`❌ ${result.error || 'Transaction failed'}`);
      }
    } catch (error: any) {
      console.error('Error hatching:', error);
      setStatusMessage(`❌ ${error.message || 'An error occurred'}`);
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  const isHatchEnabled = walletState.connected && nftOwnership?.owned === true;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Enji-Chi</h1>
        <p className="app-subtitle">NFT Hatching Game</p>
      </header>

      <main className="app-main">
        <WalletConnect onConnect={handleWalletConnect} />
        
        <Game />
        
        <HatchButton
          enabled={isHatchEnabled}
          loading={loading}
          onClick={handleHatchClick}
        />

        {statusMessage && (
          <div className={`status-message ${getStatusClass(statusMessage)}`}>
            {statusMessage}
          </div>
        )}

        {!walletState.connected && (
          <div className="info-message">
            Connect your wallet to hatch your Enji-Chi egg
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React, Phaser 3, and Enjin Platform</p>
        <p className="network-info">
          Network: Enjin Matrixchain Testnet (Chain ID: 6678)
        </p>
      </footer>
    </div>
  );
}

function getStatusClass(message: string): string {
  if (message.includes('✅') || message.includes('🎉')) return 'success';
  if (message.includes('❌')) return 'error';
  if (message.includes('⚠️')) return 'warning';
  return 'info';
}

export default App;
