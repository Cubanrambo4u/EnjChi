#!/usr/bin/env python3
"""
Script to create Phaser game scene and React components
"""

def write_file(path, content):
    """Write content to file"""
    with open(path, 'w') as f:
        f.write(content)
    print(f"✓ Created: {path}")

def create_main_scene():
    """Create simplified MainScene with black background and pulsing egg"""
    content = """/**
 * MainScene - Simplified game scene with black background and pulsing egg
 */

import Phaser from 'phaser';
import { EGG_ANIMATION_CONFIG } from '../../config/game.config';

export class MainScene extends Phaser.Scene {
  private egg!: Phaser.GameObjects.Graphics;
  private pulseTween!: Phaser.Tweens.Tween;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Black background (already set in game config, but ensuring it's solid black)
    this.cameras.main.setBackgroundColor('#000000');

    // Create egg sprite in center
    this.createEgg(width / 2, height / 2);

    // Start pulsing animation
    this.startPulseAnimation();
  }

  /**
   * Create egg graphic
   */
  private createEgg(x: number, y: number): void {
    this.egg = this.add.graphics();
    this.egg.setPosition(x, y);
    this.drawEgg();
  }

  /**
   * Draw egg shape
   */
  private drawEgg(): void {
    this.egg.clear();
    
    // Main egg body - light green/mint color
    this.egg.fillStyle(0xE8F5E9, 1);
    this.egg.fillEllipse(0, 0, 100, 130);
    
    // Add decorative spots
    this.egg.fillStyle(0x4CAF50, 0.6);
    this.egg.fillCircle(-18, -25, 12);
    this.egg.fillCircle(22, -8, 10);
    this.egg.fillCircle(-12, 18, 8);
    this.egg.fillCircle(18, 30, 11);
    
    // Add highlight for 3D effect
    this.egg.fillStyle(0xFFFFFF, 0.4);
    this.egg.fillEllipse(-12, -35, 25, 35);
    
    // Add subtle shadow at bottom
    this.egg.fillStyle(0x000000, 0.1);
    this.egg.fillEllipse(0, 45, 80, 15);
  }

  /**
   * Start pulsing animation
   */
  private startPulseAnimation(): void {
    this.pulseTween = this.tweens.add({
      targets: this.egg,
      scaleX: EGG_ANIMATION_CONFIG.pulseScale,
      scaleY: EGG_ANIMATION_CONFIG.pulseScale,
      duration: EGG_ANIMATION_CONFIG.pulseDuration,
      ease: EGG_ANIMATION_CONFIG.pulseEase,
      yoyo: true,
      repeat: -1
    });
  }

  /**
   * Stop pulsing animation
   */
  stopPulseAnimation(): void {
    if (this.pulseTween) {
      this.pulseTween.stop();
    }
  }

  /**
   * Animate egg hatching
   */
  animateHatch(): void {
    // Stop pulse animation
    this.stopPulseAnimation();

    // Shake animation
    this.tweens.add({
      targets: this.egg,
      x: this.egg.x + 8,
      duration: 50,
      yoyo: true,
      repeat: 12,
      onComplete: () => {
        // Scale up and fade out
        this.tweens.add({
          targets: this.egg,
          scaleX: 2.5,
          scaleY: 2.5,
          alpha: 0,
          duration: 600,
          ease: 'Power2',
          onComplete: () => {
            // Reset egg
            this.egg.setAlpha(1);
            this.egg.setScale(1);
            this.egg.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
            this.startPulseAnimation();
          }
        });
      }
    });
  }

  /**
   * Get egg object for external access
   */
  getEgg(): Phaser.GameObjects.Graphics {
    return this.egg;
  }
}
"""
    write_file("enjchi-enhanced/src/game/scenes/MainScene.ts", content)

def create_wallet_connect_component():
    """Create WalletConnect React component"""
    content = """/**
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
"""
    write_file("enjchi-enhanced/src/components/WalletConnect.tsx", content)

def create_wallet_connect_css():
    """Create CSS for WalletConnect component"""
    content = """.wallet-connect {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  max-width: 400px;
  width: 100%;
}

.wallet-connect h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
}

.wallet-connect.connected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  color: #4CAF50;
  font-size: 12px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.address {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #ffffff;
}

.disconnect-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.disconnect-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.wallet-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wallet-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.wallet-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.wallet-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wallet-btn.enjin {
  border-color: rgba(138, 43, 226, 0.5);
}

.wallet-btn.enjin:hover:not(:disabled) {
  border-color: rgba(138, 43, 226, 0.8);
  background: rgba(138, 43, 226, 0.1);
}

.wallet-btn.metamask {
  border-color: rgba(246, 133, 27, 0.5);
}

.wallet-btn.metamask:hover:not(:disabled) {
  border-color: rgba(246, 133, 27, 0.8);
  background: rgba(246, 133, 27, 0.1);
}

.wallet-icon {
  font-size: 24px;
}

.wallet-name {
  flex: 1;
  text-align: left;
}

.error-message {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #ff6b6b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.no-wallet-message {
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.no-wallet-message p {
  margin-bottom: 12px;
}

.no-wallet-message ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.no-wallet-message li {
  margin: 8px 0;
}

.no-wallet-message a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 500;
}

.no-wallet-message a:hover {
  text-decoration: underline;
}

.connecting-message {
  text-align: center;
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}
"""
    write_file("enjchi-enhanced/src/components/WalletConnect.css", content)

def create_hatch_button_component():
    """Create HatchButton React component"""
    content = """/**
 * HatchButton Component - Large prominent button for hatching
 */

import React from 'react';
import './HatchButton.css';

interface HatchButtonProps {
  enabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export const HatchButton: React.FC<HatchButtonProps> = ({ enabled, loading, onClick }) => {
  return (
    <button
      className={`hatch-button ${enabled ? 'enabled' : 'disabled'} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={!enabled || loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          <span>HATCHING...</span>
        </>
      ) : (
        <span>HATCH</span>
      )}
    </button>
  );
};
"""
    write_file("enjchi-enhanced/src/components/HatchButton.tsx", content)

def create_hatch_button_css():
    """Create CSS for HatchButton component"""
    content = """.hatch-button {
  position: relative;
  padding: 20px 60px;
  font-size: 32px;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  margin: 30px 0;
  min-width: 250px;
}

.hatch-button.enabled {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.hatch-button.enabled:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
  border-color: rgba(255, 255, 255, 0.5);
}

.hatch-button.enabled:active {
  transform: translateY(-2px);
}

.hatch-button.disabled {
  background: rgba(100, 100, 100, 0.3);
  color: rgba(255, 255, 255, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}

.hatch-button.loading {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  cursor: wait;
}

.hatch-button.loading:hover {
  transform: none;
}

.hatch-button span {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 768px) {
  .hatch-button {
    padding: 16px 48px;
    font-size: 24px;
    min-width: 200px;
  }
}
"""
    write_file("enjchi-enhanced/src/components/HatchButton.css", content)

if __name__ == "__main__":
    print("Creating game scene and React components...\n")
    create_main_scene()
    create_wallet_connect_component()
    create_wallet_connect_css()
    create_hatch_button_component()
    create_hatch_button_css()
    print("\n✅ Game scene and components created successfully!")
