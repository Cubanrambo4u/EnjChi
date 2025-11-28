/**
 * WalletService - Handles dual wallet connectivity (Enjin Wallet + MetaMask)
 * Uses ethers.js v6 for blockchain interactions
 */

import { ethers } from 'ethers';
import type { WalletState, WalletType, WalletProvider } from '../types';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain.config';

export class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private walletState: WalletState = {
    connected: false,
    address: null,
    chainId: null,
    walletType: null
  };
  private listeners: Array<(state: WalletState) => void> = [];

  /**
   * Detect available wallets
   */
  detectAvailableWallets(): { enjin: boolean; metamask: boolean } {
    const hasEnjin = typeof window.ethereum !== 'undefined' && 
                     (window.ethereum as any).isEnjin === true;
    const hasMetaMask = typeof window.ethereum !== 'undefined' && 
                        window.ethereum.isMetaMask === true;
    
    return { enjin: hasEnjin, metamask: hasMetaMask };
  }

  /**
   * Connect to wallet
   */
  async connect(walletType: WalletType): Promise<WalletState> {
    try {
      let walletProvider: WalletProvider | undefined;

      // Select the appropriate wallet provider
      if (walletType === 'enjin' && (window.ethereum as any)?.isEnjin) {
        walletProvider = window.ethereum;
      } else if (walletType === 'metamask' && window.ethereum?.isMetaMask) {
        walletProvider = window.ethereum;
      } else if (window.ethereum) {
        // Fallback to default provider
        walletProvider = window.ethereum;
      }

      if (!walletProvider) {
        throw new Error(`${walletType} wallet not found. Please install the wallet extension.`);
      }

      // Request account access
      const accounts = await walletProvider.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Create ethers provider
      this.provider = new ethers.BrowserProvider(walletProvider as any);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const chainId = Number(network.chainId);

      // Check if on correct network
      if (chainId !== BLOCKCHAIN_CONFIG.chainId) {
        await this.switchNetwork();
      }

      // Update wallet state
      this.walletState = {
        connected: true,
        address,
        chainId,
        walletType
      };

      // Setup event listeners
      this.setupEventListeners(walletProvider);

      // Notify listeners
      this.notifyListeners();

      return this.walletState;
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    }
  }

  /**
   * Switch to Matrixchain network
   */
  async switchNetwork(): Promise<void> {
    if (!window.ethereum) {
      throw new Error('No wallet provider found');
    }

    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${BLOCKCHAIN_CONFIG.chainId.toString(16)}` }]
      });
    } catch (switchError: any) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${BLOCKCHAIN_CONFIG.chainId.toString(16)}`,
            chainName: BLOCKCHAIN_CONFIG.chainName,
            nativeCurrency: {
              name: BLOCKCHAIN_CONFIG.currency.name,
              symbol: BLOCKCHAIN_CONFIG.currency.symbol,
              decimals: BLOCKCHAIN_CONFIG.currency.decimals
            },
            rpcUrls: [BLOCKCHAIN_CONFIG.rpcUrl],
            blockExplorerUrls: [BLOCKCHAIN_CONFIG.blockExplorer]
          }]
        });
      } else {
        throw switchError;
      }
    }
  }

  /**
   * Setup wallet event listeners
   */
  private setupEventListeners(walletProvider: WalletProvider): void {
    // Account changed
    walletProvider.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.disconnect();
      } else {
        this.walletState.address = accounts[0];
        this.notifyListeners();
      }
    });

    // Chain changed
    walletProvider.on('chainChanged', (chainId: string) => {
      this.walletState.chainId = parseInt(chainId, 16);
      this.notifyListeners();
      // Reload page on chain change (recommended by MetaMask)
      window.location.reload();
    });

    // Disconnect
    walletProvider.on('disconnect', () => {
      this.disconnect();
    });
  }

  /**
   * Disconnect wallet
   */
  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.walletState = {
      connected: false,
      address: null,
      chainId: null,
      walletType: null
    };
    this.notifyListeners();
  }

  /**
   * Get current wallet state
   */
  getState(): WalletState {
    return { ...this.walletState };
  }

  /**
   * Get provider
   */
  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  /**
   * Get signer
   */
  getSigner(): ethers.JsonRpcSigner | null {
    return this.signer;
  }

  /**
   * Subscribe to wallet state changes
   */
  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.walletState));
  }

  /**
   * Check if wallet is connected
   */
  isConnected(): boolean {
    return this.walletState.connected;
  }

  /**
   * Get connected address
   */
  getAddress(): string | null {
    return this.walletState.address;
  }
}

// Export singleton instance
export const walletService = new WalletService();
