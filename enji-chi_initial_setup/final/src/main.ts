import Phaser from 'phaser';
import { PreloadScene } from './scenes/PreloadScene';
import { MainScene } from './scenes/MainScene';
import { phaserConfig } from './config/game.config';
import { validateConfig } from './config/sdk.config';

/**
 * Main entry point for the Enji-Chi game
 */
class EnjiChiGame {
  private game: Phaser.Game | null = null;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the game
   */
  private async initialize(): Promise<void> {
    console.log('🎮 Initializing Enji-Chi Game...');

    // Validate configuration
    this.validateConfiguration();

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startGame());
    } else {
      this.startGame();
    }
  }

  /**
   * Validate SDK configuration
   */
  private validateConfiguration(): void {
    const validation = validateConfig();
    
    if (!validation.valid) {
      console.warn('⚠️ Configuration warnings:');
      validation.errors.forEach(error => {
        console.warn(`  - ${error}`);
      });
      console.warn('\n📝 Please update your configuration in src/config/sdk.config.ts');
      console.warn('The game will run with mock data until properly configured.\n');
    } else {
      console.log('✅ Configuration validated successfully');
    }
  }

  /**
   * Start the Phaser game
   */
  private startGame(): void {
    try {
      // Create game configuration with scenes
      const config: Phaser.Types.Core.GameConfig = {
        ...phaserConfig,
        scene: [PreloadScene, MainScene]
      };

      // Create the game instance
      this.game = new Phaser.Game(config);

      // Log game info
      console.log('✅ Phaser game initialized');
      console.log(`📱 Game size: ${config.width}x${config.height}`);
      console.log(`🎨 Renderer: ${config.type === Phaser.AUTO ? 'AUTO' : config.type === Phaser.WEBGL ? 'WebGL' : 'Canvas'}`);

      // Setup window resize handler
      this.setupResizeHandler();

      // Setup error handlers
      this.setupErrorHandlers();

      // Log helpful information
      this.logHelpfulInfo();
    } catch (error) {
      console.error('❌ Failed to initialize game:', error);
      this.showErrorMessage('Failed to initialize game. Please refresh the page.');
    }
  }

  /**
   * Setup window resize handler
   */
  private setupResizeHandler(): void {
    window.addEventListener('resize', () => {
      if (this.game) {
        this.game.scale.refresh();
      }
    });
  }

  /**
   * Setup global error handlers
   */
  private setupErrorHandlers(): void {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }

  /**
   * Log helpful information for developers
   */
  private logHelpfulInfo(): void {
    console.log('\n📚 Enji-Chi Game - Quick Start Guide');
    console.log('=====================================');
    console.log('1. Connect your wallet by clicking "Connect Wallet"');
    console.log('2. Make sure you have the Enji-chi Egg NFT in your wallet');
    console.log('3. Click "HATCH NOW" to hatch your egg');
    console.log('\n⌨️  Keyboard Shortcuts:');
    console.log('  W - Connect Wallet');
    console.log('  H - Hatch Egg');
    console.log('\n🔧 Configuration:');
    console.log('  Edit src/config/sdk.config.ts to set your API keys');
    console.log('  - Enjin API Key: Get from https://platform.enjin.io');
    console.log('  - WalletConnect Project ID: Get from https://cloud.walletconnect.com');
    console.log('\n🌐 Network:');
    console.log('  Chain: Enjin Matrixchain Testnet');
    console.log('  Chain ID: 6678');
    console.log('  RPC: https://enjin-matrix-rpc.n.dwellir.com/');
    console.log('=====================================\n');
  }

  /**
   * Show error message to user
   */
  private showErrorMessage(message: string): void {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.innerHTML = `
        <div style="color: #ff4444; text-align: center;">
          <h2>Error</h2>
          <p>${message}</p>
        </div>
      `;
    }
  }

  /**
   * Destroy the game instance
   */
  public destroy(): void {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
      console.log('Game destroyed');
    }
  }
}

// Create and start the game
const enjiChiGame = new EnjiChiGame();

// Export for debugging purposes
(window as any).enjiChiGame = enjiChiGame;

// Log version info
console.log('🎮 Enji-Chi Game v1.0.0');
console.log('Built with Phaser 3, Vite, and TypeScript');
