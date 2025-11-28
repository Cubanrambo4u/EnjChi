import Phaser from 'phaser';
import { HatchButton } from '../components/HatchButton';
import { WalletUI } from '../components/WalletUI';
import { BlockchainService } from '../services/BlockchainService';
import { EnjinService } from '../services/EnjinService';
import { WalletConnectService } from '../services/WalletConnectService';
import { GAME_CONFIG } from '../config/game.config';

/**
 * MainScene - The main game scene with egg sprite and interactions
 */
export class MainScene extends Phaser.Scene {
  private egg!: Phaser.GameObjects.Sprite | Phaser.GameObjects.Graphics;
  private hatchButton!: HatchButton;
  private walletUI!: WalletUI;
  private background!: Phaser.GameObjects.Graphics;
  
  // Services
  private blockchainService!: BlockchainService;
  private enjinService!: EnjinService;
  private walletConnectService!: WalletConnectService;
  
  // UI Text elements
  private titleText!: Phaser.GameObjects.Text;
  private infoText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  /**
   * Initialize services
   */
  async init(): Promise<void> {
    console.log('Initializing MainScene...');
    
    // Initialize blockchain services
    this.blockchainService = new BlockchainService();
    this.enjinService = new EnjinService();
    this.walletConnectService = new WalletConnectService();
    
    await this.blockchainService.initialize();
    await this.enjinService.initialize();
    await this.walletConnectService.initialize();
  }

  /**
   * Create game objects and UI
   */
  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create background
    this.createBackground();

    // Create title
    this.titleText = this.add.text(width / 2, 60, 'Enji-Chi', {
      fontSize: '56px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    });
    this.titleText.setOrigin(0.5);

    // Create subtitle
    const subtitleText = this.add.text(width / 2, 110, 'NFT Hatching Game', {
      fontSize: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#cccccc'
    });
    subtitleText.setOrigin(0.5);

    // Create egg sprite (or placeholder)
    this.createEgg(width / 2, height / 2);

    // Create info text
    this.infoText = this.add.text(width / 2, height / 2 + 120, 'Connect your wallet to hatch your Enji-Chi egg', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width - 100 }
    });
    this.infoText.setOrigin(0.5);

    // Create status text
    this.statusText = this.add.text(width / 2, height - 100, '', {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffff00',
      align: 'center',
      wordWrap: { width: width - 100 }
    });
    this.statusText.setOrigin(0.5);

    // Create wallet UI
    this.walletUI = new WalletUI(
      this,
      width / 2,
      50,
      () => this.handleWalletConnect()
    );

    // Create hatch button
    this.hatchButton = new HatchButton(
      this,
      width / 2,
      height - 150,
      () => this.handleHatchClick()
    );
    this.hatchButton.disable(); // Disabled until wallet is connected

    // Add keyboard shortcuts
    this.setupKeyboardShortcuts();

    console.log('MainScene created successfully');
  }

  /**
   * Create background gradient
   */
  private createBackground(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.background = this.add.graphics();
    
    // Create gradient effect using multiple rectangles
    const steps = 20;
    for (let i = 0; i < steps; i++) {
      const ratio = i / steps;
      // Interpolate between colors
      const r = Math.floor(102 + (118 - 102) * ratio);
      const g = Math.floor(126 + (75 - 126) * ratio);
      const b = Math.floor(234 + (162 - 234) * ratio);
      const color = (r << 16) | (g << 8) | b;
      
      this.background.fillStyle(color);
      this.background.fillRect(0, (height / steps) * i, width, height / steps + 1);
    }
  }

  /**
   * Create egg sprite with pulsing animation
   */
  private createEgg(x: number, y: number): void {
    // Try to use loaded sprite, fallback to graphics
    if (this.textures.exists('egg')) {
      this.egg = this.add.sprite(x, y, 'egg');
      this.egg.setScale(2);
    } else {
      // Create placeholder egg graphic
      console.log('Creating placeholder egg graphic');
      this.egg = this.add.graphics();
      this.drawPlaceholderEgg(this.egg as Phaser.GameObjects.Graphics);
      (this.egg as Phaser.GameObjects.Graphics).setPosition(x, y);
    }

    // Add pulsing animation
    this.createPulseAnimation();
  }

  /**
   * Draw a placeholder egg graphic
   */
  private drawPlaceholderEgg(graphics: Phaser.GameObjects.Graphics): void {
    graphics.clear();
    
    // Draw egg shape
    graphics.fillStyle(0xE8F5E9, 1);
    graphics.fillEllipse(0, 0, 120, 150);
    
    // Add spots
    graphics.fillStyle(0x4CAF50, 0.6);
    graphics.fillCircle(-20, -30, 15);
    graphics.fillCircle(25, -10, 12);
    graphics.fillCircle(-15, 20, 10);
    graphics.fillCircle(20, 35, 14);
    
    // Add highlight
    graphics.fillStyle(0xFFFFFF, 0.4);
    graphics.fillEllipse(-15, -40, 30, 40);
  }

  /**
   * Create pulsing animation for the egg
   */
  private createPulseAnimation(): void {
    this.tweens.add({
      targets: this.egg,
      scaleX: GAME_CONFIG.eggPulse.scaleMax,
      scaleY: GAME_CONFIG.eggPulse.scaleMax,
      duration: GAME_CONFIG.eggPulse.duration,
      ease: 'Sine.easeInOut',
      yoyo: GAME_CONFIG.eggPulse.yoyo,
      repeat: GAME_CONFIG.eggPulse.repeat
    });
  }

  /**
   * Handle wallet connection
   */
  private async handleWalletConnect(): Promise<void> {
    try {
      this.walletUI.showLoading();
      this.statusText.setText('Connecting to wallet...');

      // Connect wallet
      const walletState = await this.blockchainService.connectWallet();

      if (walletState.connected && walletState.address) {
        // Update UI
        this.walletUI.showConnected(walletState.address);
        this.statusText.setText('✅ Wallet connected successfully!');
        this.statusText.setColor('#4CAF50');

        // Check NFT ownership
        await this.checkNFTOwnership(walletState.address);

        // Enable hatch button
        this.hatchButton.enable();
        this.infoText.setText('Click "HATCH NOW" to hatch your Enji-Chi egg!');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      this.walletUI.showError('Connection failed');
      this.statusText.setText(`❌ Error: ${error.message || 'Failed to connect wallet'}`);
      this.statusText.setColor('#ff4444');
    }
  }

  /**
   * Check NFT ownership
   */
  private async checkNFTOwnership(address: string): Promise<void> {
    try {
      this.statusText.setText('Checking NFT ownership...');
      
      const ownership = await this.enjinService.checkNFTOwnership(address);
      
      if (ownership.owned) {
        this.statusText.setText(`✅ You own ${ownership.balance}x Enji-chi Egg NFT!`);
        this.statusText.setColor('#4CAF50');
      } else {
        this.statusText.setText('⚠️ You do not own the required Enji-chi Egg NFT');
        this.statusText.setColor('#ffaa00');
        this.hatchButton.disable();
        this.infoText.setText('You need to own an Enji-chi Egg NFT to hatch');
      }
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
      this.statusText.setText('⚠️ Could not verify NFT ownership');
      this.statusText.setColor('#ffaa00');
    }
  }

  /**
   * Handle hatch button click
   */
  private async handleHatchClick(): Promise<void> {
    try {
      const address = this.blockchainService.getAddress();
      
      if (!address) {
        this.statusText.setText('❌ Please connect your wallet first');
        this.statusText.setColor('#ff4444');
        return;
      }

      // Show loading state
      this.hatchButton.showLoading();
      this.statusText.setText('Initiating hatch transaction...');
      this.statusText.setColor('#ffff00');

      // Execute hatch transaction
      const result = await this.enjinService.executeHatchTransaction(address);

      if (result.success) {
        // Success!
        this.handleHatchSuccess(result.txHash);
      } else {
        // Failed
        this.handleHatchError(result.error || 'Transaction failed');
      }
    } catch (error: any) {
      console.error('Error hatching egg:', error);
      this.handleHatchError(error.message || 'An error occurred');
    }
  }

  /**
   * Handle successful hatch
   */
  private handleHatchSuccess(txHash?: string): void {
    this.statusText.setText('🎉 Hatching successful!');
    this.statusText.setColor('#4CAF50');
    
    if (txHash) {
      console.log('Transaction hash:', txHash);
    }

    // Animate egg hatching
    this.animateHatching();

    // Reset button after delay
    this.time.delayedCall(3000, () => {
      this.hatchButton.reset();
    });
  }

  /**
   * Handle hatch error
   */
  private handleHatchError(errorMessage: string): void {
    this.statusText.setText(`❌ ${errorMessage}`);
    this.statusText.setColor('#ff4444');
    this.hatchButton.reset();
  }

  /**
   * Animate egg hatching effect
   */
  private animateHatching(): void {
    // Stop pulse animation
    this.tweens.killTweensOf(this.egg);

    // Shake animation
    this.tweens.add({
      targets: this.egg,
      x: this.egg.x + 10,
      duration: 50,
      yoyo: true,
      repeat: 10,
      onComplete: () => {
        // Scale up and fade out
        this.tweens.add({
          targets: this.egg,
          scaleX: 2,
          scaleY: 2,
          alpha: 0,
          duration: 500,
          ease: 'Power2',
          onComplete: () => {
            // Reset egg
            this.egg.setAlpha(1);
            this.egg.setScale(1);
            this.createPulseAnimation();
          }
        });
      }
    });
  }

  /**
   * Setup keyboard shortcuts
   */
  private setupKeyboardShortcuts(): void {
    // Press 'H' to hatch
    this.input.keyboard?.on('keydown-H', () => {
      if (this.hatchButton && !this.hatchButton.active) {
        return;
      }
      this.handleHatchClick();
    });

    // Press 'W' to connect wallet
    this.input.keyboard?.on('keydown-W', () => {
      if (!this.blockchainService.isConnected()) {
        this.handleWalletConnect();
      }
    });
  }

  /**
   * Update loop
   */
  update(_time: number, _delta: number): void {
    // Add any per-frame updates here if needed
  }
}
