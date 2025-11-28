#!/usr/bin/env python3
"""
Script to create main React app components and entry point
"""

def write_file(path, content):
    """Write content to file"""
    with open(path, 'w') as f:
        f.write(content)
    print(f"✓ Created: {path}")

def create_game_component():
    """Create Game component that wraps Phaser"""
    content = """/**
 * Game Component - Wraps Phaser game canvas in React
 */

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/game.config';
import { MainScene } from '../game/scenes/MainScene';
import './Game.css';

interface GameProps {
  onHatchComplete?: () => void;
}

export const Game: React.FC<GameProps> = ({ onHatchComplete }) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) {
      return;
    }

    // Initialize Phaser game
    gameRef.current = new Phaser.Game({
      ...GAME_CONFIG,
      parent: containerRef.current
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  /**
   * Trigger hatch animation
   */
  const triggerHatch = () => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene('MainScene') as MainScene;
      if (scene) {
        scene.animateHatch();
        if (onHatchComplete) {
          // Call callback after animation completes
          setTimeout(onHatchComplete, 3000);
        }
      }
    }
  };

  // Expose triggerHatch method to parent
  useEffect(() => {
    (window as any).triggerHatch = triggerHatch;
    return () => {
      delete (window as any).triggerHatch;
    };
  }, []);

  return (
    <div className="game-wrapper">
      <div id="game-container" ref={containerRef}></div>
    </div>
  );
};
"""
    write_file("enjchi-enhanced/src/components/Game.tsx", content)

def create_game_css():
    """Create CSS for Game component"""
    content = """.game-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

#game-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

#game-container canvas {
  display: block;
  border-radius: 12px;
}
"""
    write_file("enjchi-enhanced/src/components/Game.css", content)

def create_use_wallet_hook():
    """Create custom React hook for wallet state"""
    content = """/**
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
"""
    write_file("enjchi-enhanced/src/hooks/useWallet.ts", content)

def create_app_component():
    """Create main App component"""
    content = """/**
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
"""
    write_file("enjchi-enhanced/src/App.tsx", content)

def create_app_css():
    """Create CSS for App component"""
    content = """.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #000000;
  color: #ffffff;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-title {
  font-size: 64px;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.app-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin: 10px 0 0 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.app-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  flex: 1;
}

.status-message {
  padding: 16px 24px;
  border-radius: 12px;
  margin: 20px 0;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  width: 100%;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-message.success {
  background: rgba(76, 175, 80, 0.1);
  border: 2px solid rgba(76, 175, 80, 0.3);
  color: #4CAF50;
}

.status-message.error {
  background: rgba(244, 67, 54, 0.1);
  border: 2px solid rgba(244, 67, 54, 0.3);
  color: #ff6b6b;
}

.status-message.warning {
  background: rgba(255, 193, 7, 0.1);
  border: 2px solid rgba(255, 193, 7, 0.3);
  color: #ffc107;
}

.status-message.info {
  background: rgba(33, 150, 243, 0.1);
  border: 2px solid rgba(33, 150, 243, 0.3);
  color: #2196F3;
}

.info-message {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin: 20px 0;
  padding: 16px;
}

.app-footer {
  margin-top: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  padding: 20px;
}

.app-footer p {
  margin: 5px 0;
}

.network-info {
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

/* Responsive design */
@media (max-width: 768px) {
  .app {
    padding: 10px;
  }

  .app-title {
    font-size: 48px;
  }

  .app-subtitle {
    font-size: 16px;
  }

  .status-message {
    font-size: 14px;
    padding: 12px 16px;
  }
}
"""
    write_file("enjchi-enhanced/src/App.css", content)

def create_main_entry():
    """Create main.tsx entry point"""
    content = """/**
 * Main Entry Point
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"""
    write_file("enjchi-enhanced/src/main.tsx", content)

def create_index_css():
    """Create global CSS"""
    content = """/**
 * Global Styles
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000000;
  color: #ffffff;
  overflow-x: hidden;
}

#root {
  width: 100%;
  min-height: 100vh;
}

button {
  font-family: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
"""
    write_file("enjchi-enhanced/src/index.css", content)

def create_vite_env_dts():
    """Create vite-env.d.ts for TypeScript"""
    content = """/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENJIN_API_ENDPOINT: string;
  readonly VITE_ENJIN_API_KEY: string;
  readonly VITE_NFT_COLLECTION_ID: string;
  readonly VITE_NFT_TOKEN_ID: string;
  readonly VITE_CHAIN_ID: string;
  readonly VITE_CHAIN_NAME: string;
  readonly VITE_RPC_URL: string;
  readonly VITE_BLOCK_EXPLORER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
"""
    write_file("enjchi-enhanced/src/vite-env.d.ts", content)

if __name__ == "__main__":
    print("Creating main app components and entry point...\n")
    create_game_component()
    create_game_css()
    create_use_wallet_hook()
    create_app_component()
    create_app_css()
    create_main_entry()
    create_index_css()
    create_vite_env_dts()
    print("\n✅ Main app files created successfully!")
