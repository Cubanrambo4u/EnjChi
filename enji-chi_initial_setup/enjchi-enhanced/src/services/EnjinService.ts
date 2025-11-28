/**
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
