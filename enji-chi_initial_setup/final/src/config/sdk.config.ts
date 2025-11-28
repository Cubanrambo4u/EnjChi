/**
 * Enjin SDK and Blockchain Configuration
 * 
 * IMPORTANT: Replace placeholder values with your actual API keys and configuration
 * before deploying to production.
 */

export const ENJIN_CONFIG = {
  // Enjin Platform API Configuration
  apiEndpoint: 'https://platform.enjin.io/graphql',
  
  // API Key - REPLACE WITH YOUR ACTUAL API KEY
  // Get your API key from: https://platform.enjin.io
  apiKey: 'YOUR_ENJIN_API_KEY_HERE',
  
  // Matrixchain Network Configuration
  network: {
    chainId: 6678, // Enjin Matrixchain Chain ID
    name: 'Enjin Matrixchain Testnet',
    rpcUrl: 'https://enjin-matrix-rpc.n.dwellir.com/',
    currency: {
      name: 'ENJ',
      symbol: 'ENJ',
      decimals: 18
    }
  },
  
  // NFT Configuration
  nft: {
    collectionId: 'YOUR_COLLECTION_ID', // Replace with your collection ID
    tokenId: 'Enji-chi Egg #001', // The specific NFT token
    requiredForHatch: true
  }
};

/**
 * WalletConnect Configuration
 * Used as fallback wallet connection method
 */
export const WALLETCONNECT_CONFIG = {
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from: https://cloud.walletconnect.com
  
  metadata: {
    name: 'Enji-Chi Game',
    description: 'A blockchain-powered NFT hatching game',
    url: window.location.origin,
    icons: [`${window.location.origin}/assets/icon.png`]
  },
  
  chains: [
    `eip155:${ENJIN_CONFIG.network.chainId}` // Enjin Matrixchain
  ]
};

/**
 * GraphQL Queries for Enjin Platform API
 */
export const ENJIN_QUERIES = {
  // Query to check NFT ownership
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
  
  // Query to get wallet tokens
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
 * Validates if the SDK configuration is properly set up
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (ENJIN_CONFIG.apiKey === 'YOUR_ENJIN_API_KEY_HERE') {
    errors.push('Enjin API key not configured. Please set ENJIN_CONFIG.apiKey');
  }
  
  if (WALLETCONNECT_CONFIG.projectId === 'YOUR_WALLETCONNECT_PROJECT_ID') {
    errors.push('WalletConnect project ID not configured. Please set WALLETCONNECT_CONFIG.projectId');
  }
  
  if (ENJIN_CONFIG.nft.collectionId === 'YOUR_COLLECTION_ID') {
    errors.push('NFT collection ID not configured. Please set ENJIN_CONFIG.nft.collectionId');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
