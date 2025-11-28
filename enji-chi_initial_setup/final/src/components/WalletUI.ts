import Phaser from 'phaser';

/**
 * WalletUI component - Displays wallet connection status and information
 */
export class WalletUI extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Graphics;
  private statusText: Phaser.GameObjects.Text;
  private addressText: Phaser.GameObjects.Text;
  private connectButton!: Phaser.GameObjects.Container;
  private buttonBackground!: Phaser.GameObjects.Graphics;
  private buttonText!: Phaser.GameObjects.Text;
  private onConnect: () => void;
  private isConnected: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, onConnect: () => void) {
    super(scene, x, y);

    this.onConnect = onConnect;

    // Create background panel
    this.background = scene.add.graphics();
    this.drawBackground();
    this.add(this.background);

    // Create status text
    this.statusText = scene.add.text(0, -30, 'Wallet: Not Connected', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    this.statusText.setOrigin(0.5);
    this.add(this.statusText);

    // Create address text (initially hidden)
    this.addressText = scene.add.text(0, 0, '', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#cccccc'
    });
    this.addressText.setOrigin(0.5);
    this.addressText.setVisible(false);
    this.add(this.addressText);

    // Create connect button
    this.createConnectButton();

    // Add to scene
    scene.add.existing(this);
  }

  /**
   * Draw the background panel
   */
  private drawBackground(): void {
    this.background.clear();
    this.background.fillStyle(0x1a1a1a, 0.9);
    this.background.fillRoundedRect(-150, -50, 300, 100, 10);
    this.background.lineStyle(2, 0x4CAF50, 1);
    this.background.strokeRoundedRect(-150, -50, 300, 100, 10);
  }

  /**
   * Create the connect button
   */
  private createConnectButton(): void {
    this.connectButton = this.scene.add.container(0, 20);

    // Button background
    this.buttonBackground = this.scene.add.graphics();
    this.drawConnectButton(false);
    this.connectButton.add(this.buttonBackground);

    // Button text
    this.buttonText = this.scene.add.text(0, 0, 'Connect Wallet', {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    this.buttonText.setOrigin(0.5);
    this.connectButton.add(this.buttonText);

    // Make button interactive
    this.connectButton.setSize(200, 40);
    this.connectButton.setInteractive(
      new Phaser.Geom.Rectangle(-100, -20, 200, 40),
      Phaser.Geom.Rectangle.Contains
    );

    // Setup button events
    this.connectButton.on('pointerover', () => {
      if (!this.isConnected) {
        this.drawConnectButton(true);
        this.scene.input.setDefaultCursor('pointer');
      }
    });

    this.connectButton.on('pointerout', () => {
      this.drawConnectButton(false);
      this.scene.input.setDefaultCursor('default');
    });

    this.connectButton.on('pointerdown', () => {
      if (!this.isConnected) {
        this.connectButton.scale = 0.95;
      }
    });

    this.connectButton.on('pointerup', () => {
      if (!this.isConnected) {
        this.connectButton.scale = 1;
        this.onConnect();
      }
    });

    this.add(this.connectButton);
  }

  /**
   * Draw the connect button
   */
  private drawConnectButton(hovered: boolean): void {
    this.buttonBackground.clear();

    const width = 200;
    const height = 40;
    const radius = 8;

    const fillColor = hovered ? 0x5CBF60 : 0x4CAF50;
    const borderColor = hovered ? 0xFFFFFF : 0x45A049;

    // Draw shadow
    this.buttonBackground.fillStyle(0x000000, 0.3);
    this.buttonBackground.fillRoundedRect(-width / 2 + 2, -height / 2 + 2, width, height, radius);

    // Draw button
    this.buttonBackground.lineStyle(2, borderColor, 1);
    this.buttonBackground.fillStyle(fillColor, 1);
    this.buttonBackground.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
    this.buttonBackground.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);
  }

  /**
   * Update UI to show connected state
   */
  showConnected(address: string): void {
    this.isConnected = true;
    
    // Update status text
    this.statusText.setText('Wallet: Connected');
    this.statusText.setColor('#4CAF50');
    this.statusText.setY(-20);

    // Show and update address
    const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    this.addressText.setText(shortAddress);
    this.addressText.setVisible(true);
    this.addressText.setY(5);

    // Hide connect button
    this.connectButton.setVisible(false);

    // Redraw background to accommodate new layout
    this.drawBackground();
  }

  /**
   * Update UI to show disconnected state
   */
  showDisconnected(): void {
    this.isConnected = false;

    // Update status text
    this.statusText.setText('Wallet: Not Connected');
    this.statusText.setColor('#ffffff');
    this.statusText.setY(-30);

    // Hide address
    this.addressText.setVisible(false);

    // Show connect button
    this.connectButton.setVisible(true);

    // Redraw background
    this.drawBackground();
  }

  /**
   * Show loading state
   */
  showLoading(): void {
    this.statusText.setText('Connecting...');
    this.connectButton.setVisible(false);
  }

  /**
   * Show error state
   */
  showError(message: string): void {
    this.statusText.setText(`Error: ${message}`);
    this.statusText.setColor('#ff4444');
    this.connectButton.setVisible(true);
  }

  /**
   * Update wallet balance display
   */
  updateBalance(_balance: string): void {
    if (this.isConnected) {
      this.addressText.setY(10);
      // Could add a balance text here if needed
    }
  }
}
