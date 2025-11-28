import { ethers } from 'ethers';
import { ENJIN_CONFIG } from '../config/sdk.config';

/**
 * Wallet connection state
 */
export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

/**
 * BlockchainService handles wallet connectivity and blockchain interactions
 * using ethers.js for Enjin Matrixchain
 */
export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private walletState: WalletState = {
    connected: false,
    address: null,
    chainId: null,
    balance: null
  };

  /**
   * Initialize the blockchain service
   */
  async initialize(): Promise<void> {
    console.log('Initializing BlockchainService...');
    
    // Check if MetaMask or other Web3 wallet is available
    if (typeof window.ethereum !== 'undefined') {
      console.log('Web3 wallet detected');
      this.setupEventListeners();
    } else {
      console.warn('No Web3 wallet detected. Please install MetaMask or use WalletConnect.');
    }
  }

  /**
   * Connect to user's wallet
   */
  async connectWallet(): Promise<WalletState> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No Web3 wallet detected. Please install MetaMask.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Create provider and signer
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);

      // Update wallet state
      this.walletState = {
        connected: true,
        address,
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance)
      };

      console.log('Wallet connected:', this.walletState);

      // Check if connected to correct network
      if (this.walletState.chainId !== ENJIN_CONFIG.network.chainId) {
        console.warn(`Wrong network. Please switch to ${ENJIN_CONFIG.network.name}`);
        await this.switchToEnjinNetwork();
      }

      return this.walletState;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  /**
   * Switch to Enjin Matrixchain network
   */
  async switchToEnjinNetwork(): Promise<void> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No Web3 wallet detected');
      }

      const chainIdHex = `0x${ENJIN_CONFIG.network.chainId.toString(16)}`;

      try {
        // Try to switch to the network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
      } catch (switchError: any) {
        // If network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainIdHex,
              chainName: ENJIN_CONFIG.network.name,
              nativeCurrency: ENJIN_CONFIG.network.currency,
              rpcUrls: [ENJIN_CONFIG.network.rpcUrl],
              blockExplorerUrls: ['https://explorer.enjin.io']
            }],
          });
        } else {
          throw switchError;
        }
      }

      console.log('Switched to Enjin Matrixchain');
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }

  /**
   * Disconnect wallet
   */
  disconnectWallet(): void {
    this.provider = null;
    this.signer = null;
    this.walletState = {
      connected: false,
      address: null,
      chainId: null,
      balance: null
    };
    console.log('Wallet disconnected');
  }

  /**
   * Get current wallet state
   */
  getWalletState(): WalletState {
    return { ...this.walletState };
  }

  /**
   * Check if wallet is connected
   */
  isConnected(): boolean {
    return this.walletState.connected;
  }

  /**
   * Get connected wallet address
   */
  getAddress(): string | null {
    return this.walletState.address;
  }

  /**
   * Setup event listeners for wallet changes
   */
  private setupEventListeners(): void {
    if (typeof window.ethereum === 'undefined') return;

    // Account changed
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      console.log('Account changed:', accounts);
      if (accounts.length === 0) {
        this.disconnectWallet();
      } else {
        // Reconnect with new account
        this.connectWallet().catch(console.error);
      }
    });

    // Chain changed
    window.ethereum.on('chainChanged', (chainId: string) => {
      console.log('Chain changed:', chainId);
      // Reload the page as recommended by MetaMask
      window.location.reload();
    });

    // Disconnect
    window.ethereum.on('disconnect', () => {
      console.log('Wallet disconnected');
      this.disconnectWallet();
    });
  }

  /**
   * Sign a message with the connected wallet
   */
  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await this.signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  /**
   * Get the provider instance
   */
  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  /**
   * Get the signer instance
   */
  getSigner(): ethers.Signer | null {
    return this.signer;
  }
}

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
