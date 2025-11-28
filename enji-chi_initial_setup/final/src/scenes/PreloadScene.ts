import Phaser from 'phaser';

/**
 * PreloadScene - Handles loading of all game assets
 */
export class PreloadScene extends Phaser.Scene {
  private loadingText!: Phaser.GameObjects.Text;
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  /**
   * Preload all game assets
   */
  preload(): void {
    // Create loading UI
    this.createLoadingUI();

    // Setup loading event listeners
    this.setupLoadingEvents();

    // Load assets
    this.loadAssets();
  }

  /**
   * Create loading UI elements
   */
  private createLoadingUI(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Title text
    const titleText = this.add.text(width / 2, height / 2 - 100, 'Enji-Chi', {
      fontSize: '48px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    titleText.setOrigin(0.5);

    // Loading text
    this.loadingText = this.add.text(width / 2, height / 2 + 50, 'Loading... 0%', {
      fontSize: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff'
    });
    this.loadingText.setOrigin(0.5);

    // Progress bar background
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRoundedRect(width / 2 - 160, height / 2 - 30, 320, 50, 10);

    // Progress bar
    this.progressBar = this.add.graphics();
  }

  /**
   * Setup loading event listeners
   */
  private setupLoadingEvents(): void {
    // Update progress bar
    this.load.on('progress', (value: number) => {
      this.updateProgressBar(value);
    });

    // Update loading text with file name
    this.load.on('fileprogress', (file: Phaser.Loader.File) => {
      this.loadingText.setText(`Loading: ${file.key}`);
    });

    // Loading complete
    this.load.on('complete', () => {
      this.loadingText.setText('Loading Complete!');
      this.progressBar.destroy();
      this.progressBox.destroy();
    });
  }

  /**
   * Update progress bar visual
   */
  private updateProgressBar(value: number): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.progressBar.clear();
    this.progressBar.fillStyle(0x4CAF50, 1);
    this.progressBar.fillRoundedRect(
      width / 2 - 150,
      height / 2 - 20,
      300 * value,
      30,
      8
    );

    // Update percentage text
    const percentage = Math.floor(value * 100);
    this.loadingText.setText(`Loading... ${percentage}%`);
  }

  /**
   * Load all game assets
   */
  private loadAssets(): void {
    // Set base path for assets
    this.load.setPath('assets/');

    // Load sprites
    // Note: These will be created as placeholder graphics if files don't exist
    this.load.image('egg', 'sprites/egg.png');
    this.load.image('background', 'sprites/background.png');
    
    // Load audio (optional)
    // this.load.audio('hatch', 'audio/hatch.mp3');
    // this.load.audio('bgm', 'audio/background.mp3');

    // Handle load errors gracefully
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.warn(`Failed to load asset: ${file.key}`);
      // Continue anyway - we'll create placeholder graphics in MainScene
    });
  }

  /**
   * Called when scene is ready
   */
  create(): void {
    // Hide the HTML loading indicator
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }

    // Small delay before transitioning to main scene
    this.time.delayedCall(500, () => {
      this.scene.start('MainScene');
    });
  }
}
