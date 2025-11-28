#!/usr/bin/env python3
"""
Script to create all source files for the enhanced Enji-Chi game
"""
import os

def write_file(path, content):
    """Write content to file"""
    with open(path, 'w') as f:
        f.write(content)
    print(f"✓ Created: {path}")

def create_typescript_config():
    """Create tsconfig.json"""
    content = """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "types": ["vite/client"],

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
"""
    write_file("enjchi-enhanced/tsconfig.json", content)

def create_typescript_node_config():
    """Create tsconfig.node.json"""
    content = """{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
"""
    write_file("enjchi-enhanced/tsconfig.node.json", content)

def create_vite_config():
    """Create vite.config.ts"""
    content = """import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          react: ['react', 'react-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['phaser']
  }
});
"""
    write_file("enjchi-enhanced/vite.config.ts", content)

def create_index_html():
    """Create index.html"""
    content = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Enji-Chi - A blockchain-powered NFT hatching game" />
    <title>Enji-Chi Enhanced</title>
    <style>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
"""
    write_file("enjchi-enhanced/index.html", content)

def create_types():
    """Create TypeScript type definitions"""
    content = """/**
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
"""
    write_file("enjchi-enhanced/src/types/index.ts", content)

def create_blockchain_config():
    """Create blockchain configuration"""
    content = """/**
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
"""
    write_file("enjchi-enhanced/src/config/blockchain.config.ts", content)

def create_game_config():
    """Create Phaser game configuration"""
    content = """/**
 * Phaser Game Configuration
 */

import Phaser from 'phaser';
import { MainScene } from '../game/scenes/MainScene';

export const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

export const EGG_ANIMATION_CONFIG = {
  pulseScale: 1.1,
  pulseDuration: 1000,
  pulseEase: 'Sine.easeInOut'
};
"""
    write_file("enjchi-enhanced/src/config/game.config.ts", content)

if __name__ == "__main__":
    print("Creating configuration and type files...\n")
    create_typescript_config()
    create_typescript_node_config()
    create_vite_config()
    create_index_html()
    create_types()
    create_blockchain_config()
    create_game_config()
    print("\n✅ Configuration files created successfully!")
