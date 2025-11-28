import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/game.config';

/**
 * HatchButton component - Interactive button for hatching the egg
 */
export class HatchButton extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private isEnabled: boolean = true;
  private isHovered: boolean = false;
  private onClick: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number, onClick: () => void) {
    super(scene, x, y);

    this.onClick = onClick;

    // Create button background
    this.background = scene.add.graphics();
    this.drawButton(false);
    this.add(this.background);

    // Create button text
    this.text = scene.add.text(0, 0, 'HATCH NOW', {
      fontSize: GAME_CONFIG.buttonStyle.fontSize,
      fontFamily: GAME_CONFIG.buttonStyle.fontFamily,
      color: GAME_CONFIG.buttonStyle.color,
      fontStyle: 'bold'
    });
    this.text.setOrigin(0.5);
    this.add(this.text);

    // Make interactive
    this.setSize(300, 80);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-150, -40, 300, 80),
      Phaser.Geom.Rectangle.Contains
    );

    // Setup event listeners
    this.setupEventListeners();

    // Add to scene
    scene.add.existing(this);
  }

  /**
   * Setup interactive event listeners
   */
  private setupEventListeners(): void {
    this.on('pointerover', () => {
      if (this.isEnabled) {
        this.isHovered = true;
        this.drawButton(true);
        this.scene.input.setDefaultCursor('pointer');
      }
    });

    this.on('pointerout', () => {
      this.isHovered = false;
      this.drawButton(false);
      this.scene.input.setDefaultCursor('default');
    });

    this.on('pointerdown', () => {
      if (this.isEnabled) {
        this.scale = 0.95;
      }
    });

    this.on('pointerup', () => {
      if (this.isEnabled) {
        this.scale = 1;
        this.onClick();
      }
    });
  }

  /**
   * Draw the button background
   */
  private drawButton(hovered: boolean): void {
    this.background.clear();

    const width = 300;
    const height = 80;
    const radius = GAME_CONFIG.buttonStyle.borderRadius;

    // Determine colors based on state
    let fillColor: number;
    let borderColor: number;

    if (!this.isEnabled) {
      fillColor = 0x666666;
      borderColor = 0x444444;
    } else if (hovered) {
      fillColor = 0x5CBF60; // Lighter green on hover
      borderColor = 0xFFFFFF;
    } else {
      fillColor = 0x4CAF50; // Default green
      borderColor = 0x45A049;
    }

    // Draw shadow
    this.background.fillStyle(0x000000, 0.3);
    this.background.fillRoundedRect(-width / 2 + 4, -height / 2 + 4, width, height, radius);

    // Draw border
    this.background.lineStyle(3, borderColor, 1);
    this.background.fillStyle(fillColor, 1);
    this.background.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
    this.background.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);
  }

  /**
   * Enable the button
   */
  enable(): void {
    this.isEnabled = true;
    this.setAlpha(1);
    this.drawButton(this.isHovered);
  }

  /**
   * Disable the button
   */
  disable(): void {
    this.isEnabled = false;
    this.setAlpha(0.6);
    this.drawButton(false);
    this.scene.input.setDefaultCursor('default');
  }

  /**
   * Update button text
   */
  setText(newText: string): void {
    this.text.setText(newText);
  }

  /**
   * Show loading state
   */
  showLoading(): void {
    this.disable();
    this.setText('HATCHING...');
  }

  /**
   * Reset to default state
   */
  reset(): void {
    this.enable();
    this.setText('HATCH NOW');
  }
}
