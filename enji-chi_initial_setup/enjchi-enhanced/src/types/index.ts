/**
 * Type definitions for the Enji-Chi Enhanced game
 */

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  walletType: 'enjin' | 'metamask' | null;
}

export interface NFTOwnership {
  owned: boolean;
  balance: number;
  collectionId: string;
  tokenId: string;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface BlockchainConfig {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorer: string;
}

export interface EnjinConfig {
  apiEndpoint: string;
  apiKey: string;
  nft: {
    collectionId: string;
    tokenId: string;
  };
}

export type WalletType = 'enjin' | 'metamask';

export interface WalletProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
  isEnjin?: boolean;
}

declare global {
  interface Window {
    ethereum?: WalletProvider;
    enjin?: WalletProvider;
  }
}
