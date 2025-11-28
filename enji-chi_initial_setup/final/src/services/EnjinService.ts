import { request } from 'graphql-request';
import { ENJIN_CONFIG, ENJIN_QUERIES } from '../config/sdk.config';

/**
 * NFT ownership information
 */
export interface NFTOwnership {
  owned: boolean;
  balance: number;
  tokenId: string;
  collectionId: string;
}

/**
 * EnjinService handles interactions with the Enjin Platform API
 * for NFT verification and blockchain data retrieval
 */
export class EnjinService {
  private apiEndpoint: string;
  private apiKey: string;

  constructor() {
    this.apiEndpoint = ENJIN_CONFIG.apiEndpoint;
    this.apiKey = ENJIN_CONFIG.apiKey;
  }

  /**
   * Initialize the Enjin service
   */
  async initialize(): Promise<void> {
    console.log('Initializing EnjinService...');
    
    // Validate API configuration
    if (this.apiKey === 'YOUR_ENJIN_API_KEY_HERE') {
      console.warn('⚠️ Enjin API key not configured. NFT verification will use mock data.');
      console.warn('Please set your API key in src/config/sdk.config.ts');
    }
  }

  /**
   * Check if a wallet owns the required NFT
   */
  async checkNFTOwnership(walletAddress: string): Promise<NFTOwnership> {
    try {
      // If API key is not configured, return mock data for development
      if (this.apiKey === 'YOUR_ENJIN_API_KEY_HERE') {
        console.log('Using mock NFT ownership data (API key not configured)');
        return this.getMockNFTOwnership(walletAddress);
      }

      // Make GraphQL request to Enjin Platform API
      const variables = {
        collectionId: ENJIN_CONFIG.nft.collectionId,
        tokenId: ENJIN_CONFIG.nft.tokenId,
        accountId: walletAddress
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

      const tokenAccount = data.GetTokenAccount;
      
      return {
        owned: tokenAccount && tokenAccount.balance > 0,
        balance: tokenAccount?.balance || 0,
        tokenId: ENJIN_CONFIG.nft.tokenId,
        collectionId: ENJIN_CONFIG.nft.collectionId
      };
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
      
      // Return mock data on error for development
      console.log('Falling back to mock NFT ownership data');
      return this.getMockNFTOwnership(walletAddress);
    }
  }

  /**
   * Get all tokens owned by a wallet
   */
  async getWalletTokens(walletAddress: string): Promise<any> {
    try {
      // If API key is not configured, return mock data
      if (this.apiKey === 'YOUR_ENJIN_API_KEY_HERE') {
        console.log('Using mock wallet tokens data (API key not configured)');
        return this.getMockWalletTokens(walletAddress);
      }

      const variables = {
        account: walletAddress
      };

      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      const data: any = await request(
        this.apiEndpoint,
        ENJIN_QUERIES.getWalletTokens,
        variables,
        headers
      );

      return data.GetWallet;
    } catch (error) {
      console.error('Error getting wallet tokens:', error);
      return this.getMockWalletTokens(walletAddress);
    }
  }

  /**
   * Verify if wallet has the required NFT for hatching
   */
  async verifyHatchRequirements(walletAddress: string): Promise<boolean> {
    try {
      const ownership = await this.checkNFTOwnership(walletAddress);
      
      if (!ownership.owned) {
        console.log('❌ Wallet does not own the required NFT');
        return false;
      }

      console.log('✅ Wallet owns the required NFT:', ownership);
      return true;
    } catch (error) {
      console.error('Error verifying hatch requirements:', error);
      return false;
    }
  }

  /**
   * Mock NFT ownership data for development/testing
   */
  private getMockNFTOwnership(_walletAddress: string): NFTOwnership {
    // For development, simulate that the wallet owns the NFT
    return {
      owned: true,
      balance: 1,
      tokenId: ENJIN_CONFIG.nft.tokenId,
      collectionId: ENJIN_CONFIG.nft.collectionId
    };
  }

  /**
   * Mock wallet tokens data for development/testing
   */
  private getMockWalletTokens(_walletAddress: string): any {
    return {
      collectionAccounts: [
        {
          collection: {
            collectionId: ENJIN_CONFIG.nft.collectionId
          },
          tokenAccounts: [
            {
              token: {
                tokenId: ENJIN_CONFIG.nft.tokenId
              },
              balance: 1
            }
          ]
        }
      ]
    };
  }

  /**
   * Simulate a hatch transaction
   * In production, this would interact with a smart contract
   */
  async executeHatchTransaction(walletAddress: string): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      console.log('Executing hatch transaction for wallet:', walletAddress);

      // Verify NFT ownership first
      const hasNFT = await this.verifyHatchRequirements(walletAddress);
      
      if (!hasNFT) {
        return {
          success: false,
          error: 'You do not own the required Enji-chi Egg NFT'
        };
      }

      // In production, this would call a smart contract method
      // For now, simulate a successful transaction
      console.log('✅ Hatch transaction simulated successfully');
      
      // Generate a mock transaction hash
      const mockTxHash = '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      return {
        success: true,
        txHash: mockTxHash
      };
    } catch (error: any) {
      console.error('Error executing hatch transaction:', error);
      return {
        success: false,
        error: error.message || 'Transaction failed'
      };
    }
  }

  /**
   * Get NFT metadata
   */
  async getNFTMetadata(_collectionId: string, _tokenId: string): Promise<any> {
    // This would fetch metadata from IPFS or Enjin API
    // For now, return mock metadata
    return {
      name: 'Enji-chi Egg #001',
      description: 'A mysterious egg containing an Enji-chi creature',
      image: '/assets/sprites/egg.png',
      attributes: [
        { trait_type: 'Rarity', value: 'Common' },
        { trait_type: 'Generation', value: '1' },
        { trait_type: 'Status', value: 'Unhatched' }
      ]
    };
  }
}
