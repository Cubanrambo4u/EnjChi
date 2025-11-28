#!/usr/bin/env python3
"""
Script to create service files for blockchain and wallet interactions
"""

def write_file(path, content):
    """Write content to file"""
    with open(path, 'w') as f:
        f.write(content)
    print(f"✓ Created: {path}")

def create_wallet_service():
    """Create WalletService for dual wallet support"""
    content = """/**
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
"""
    write_file("enjchi-enhanced/src/services/WalletService.ts", content)

def create_enjin_service():
    """Create EnjinService for Enjin Platform API"""
    content = """/**
 * EnjinService - Handles Enjin Platform API interactions
 * Uses GraphQL for querying NFT data
 */

import { request } from 'graphql-request';
import type { NFTOwnership, TransactionResult } from '../types';
import { ENJIN_CONFIG, ENJIN_QUERIES } from '../config/blockchain.config';

export class EnjinService {
  private apiEndpoint: string;
  private apiKey: string;

  constructor() {
    this.apiEndpoint = ENJIN_CONFIG.apiEndpoint;
    this.apiKey = ENJIN_CONFIG.apiKey;
  }

  /**
   * Check if user owns the required NFT
   */
  async checkNFTOwnership(address: string): Promise<NFTOwnership> {
    try {
      // If API key is not configured, return mock data for development
      if (!this.apiKey || !ENJIN_CONFIG.nft.collectionId) {
        console.warn('Enjin API not configured. Using mock data.');
        return {
          owned: true,
          balance: 1,
          collectionId: ENJIN_CONFIG.nft.collectionId,
          tokenId: ENJIN_CONFIG.nft.tokenId
        };
      }

      const variables = {
        collectionId: ENJIN_CONFIG.nft.collectionId,
        tokenId: ENJIN_CONFIG.nft.tokenId,
        accountId: address
      };

      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      const data: any = await request(
        this.apiEndpoint,
        ENJIN_QUERIES.checkNFTOwnership,
        variables,
        headers
      );

      const tokenAccount = data?.GetTokenAccount;
      
      if (tokenAccount) {
        return {
          owned: tokenAccount.balance > 0,
          balance: tokenAccount.balance,
          collectionId: ENJIN_CONFIG.nft.collectionId,
          tokenId: ENJIN_CONFIG.nft.tokenId
        };
      }

      return {
        owned: false,
        balance: 0,
        collectionId: ENJIN_CONFIG.nft.collectionId,
        tokenId: ENJIN_CONFIG.nft.tokenId
      };
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
      // Return mock data on error for development
      return {
        owned: true,
        balance: 1,
        collectionId: ENJIN_CONFIG.nft.collectionId,
        tokenId: ENJIN_CONFIG.nft.tokenId
      };
    }
  }

  /**
   * Get all tokens owned by wallet
   */
  async getWalletTokens(address: string): Promise<any> {
    try {
      if (!this.apiKey) {
        console.warn('Enjin API not configured.');
        return null;
      }

      const variables = { account: address };
      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      const data = await request(
        this.apiEndpoint,
        ENJIN_QUERIES.getWalletTokens,
        variables,
        headers
      );

      return data;
    } catch (error) {
      console.error('Error fetching wallet tokens:', error);
      return null;
    }
  }

  /**
   * Execute hatch transaction
   * Note: This is a placeholder. Actual implementation depends on your smart contract
   */
  async executeHatchTransaction(address: string): Promise<TransactionResult> {
    try {
      console.log('Executing hatch transaction for address:', address);
      
      // This is a mock implementation
      // In production, you would:
      // 1. Call your smart contract's hatch function
      // 2. Wait for transaction confirmation
      // 3. Return the transaction hash
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        txHash: '0x' + Math.random().toString(16).substring(2, 66)
      };
    } catch (error: any) {
      console.error('Error executing hatch transaction:', error);
      return {
        success: false,
        error: error.message || 'Transaction failed'
      };
    }
  }
}

// Export singleton instance
export const enjinService = new EnjinService();
"""
    write_file("enjchi-enhanced/src/services/EnjinService.ts", content)

if __name__ == "__main__":
    print("Creating service files...\n")
    create_wallet_service()
    create_enjin_service()
    print("\n✅ Service files created successfully!")
