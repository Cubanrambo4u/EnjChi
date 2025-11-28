/**
 * Blockchain and Enjin Platform Configuration
 * Uses environment variables for sensitive data
 */

import type { BlockchainConfig, EnjinConfig } from '../types';

export const BLOCKCHAIN_CONFIG: BlockchainConfig = {
  chainId: Number(import.meta.env.VITE_CHAIN_ID) || 6678,
  chainName: import.meta.env.VITE_CHAIN_NAME || 'Enjin Matrixchain Testnet',
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://enjin-matrix-rpc.n.dwellir.com/',
  currency: {
    name: 'ENJ',
    symbol: 'ENJ',
    decimals: 18
  },
  blockExplorer: import.meta.env.VITE_BLOCK_EXPLORER || 'https://explorer.enjin.io'
};

export const ENJIN_CONFIG: EnjinConfig = {
  apiEndpoint: import.meta.env.VITE_ENJIN_API_ENDPOINT || 'https://platform.enjin.io/graphql',
  apiKey: import.meta.env.VITE_ENJIN_API_KEY || '',
  nft: {
    collectionId: import.meta.env.VITE_NFT_COLLECTION_ID || '',
    tokenId: import.meta.env.VITE_NFT_TOKEN_ID || 'Enji-chi Egg #001'
  }
};

/**
 * GraphQL Queries for Enjin Platform API
 */
export const ENJIN_QUERIES = {
  checkNFTOwnership: `
    query GetTokenAccount($collectionId: String!, $tokenId: String!, $accountId: String!) {
      GetTokenAccount(
        collectionId: $collectionId
        tokenId: $tokenId
        accountId: $accountId
      ) {
        balance
        isFrozen
      }
    }
  `,
  
  getWalletTokens: `
    query GetWallet($account: String!) {
      GetWallet(account: $account) {
        collectionAccounts {
          collection {
            collectionId
          }
          tokenAccounts {
            token {
              tokenId
            }
            balance
          }
        }
      }
    }
  `
};

/**
 * Validate configuration
 */
export function validateConfig(): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];
  
  if (!ENJIN_CONFIG.apiKey) {
    warnings.push('Enjin API key not configured. Set VITE_ENJIN_API_KEY in .env file');
  }
  
  if (!ENJIN_CONFIG.nft.collectionId) {
    warnings.push('NFT collection ID not configured. Set VITE_NFT_COLLECTION_ID in .env file');
  }
  
  return {
    valid: warnings.length === 0,
    warnings
  };
}
