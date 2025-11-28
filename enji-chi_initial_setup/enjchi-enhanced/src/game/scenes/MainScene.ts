/**
 * MainScene - Simplified game scene with black background and pulsing egg
 */

import Phaser from 'phaser';
import { EGG_ANIMATION_CONFIG } from '../../config/game.config';

export class MainScene extends Phaser.Scene {
  private egg!: Phaser.GameObjects.Graphics;
  private pulseTween!: Phaser.Tweens.Tween;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Black background (already set in game config, but ensuring it's solid black)
    this.cameras.main.setBackgroundColor('#000000');

    // Create egg sprite in center
    this.createEgg(width / 2, height / 2);

    // Start pulsing animation
    this.startPulseAnimation();
  }

  /**
   * Create egg graphic
   */
  private createEgg(x: number, y: number): void {
    this.egg = this.add.graphics();
    this.egg.setPosition(x, y);
    this.drawEgg();
  }

  /**
   * Draw egg shape
   */
  private drawEgg(): void {
    this.egg.clear();
    
    // Main egg body - light green/mint color
    this.egg.fillStyle(0xE8F5E9, 1);
    this.egg.fillEllipse(0, 0, 100, 130);
    
    // Add decorative spots
    this.egg.fillStyle(0x4CAF50, 0.6);
    this.egg.fillCircle(-18, -25, 12);
    this.egg.fillCircle(22, -8, 10);
    this.egg.fillCircle(-12, 18, 8);
    this.egg.fillCircle(18, 30, 11);
    
    // Add highlight for 3D effect
    this.egg.fillStyle(0xFFFFFF, 0.4);
    this.egg.fillEllipse(-12, -35, 25, 35);
    
    // Add subtle shadow at bottom
    this.egg.fillStyle(0x000000, 0.1);
    this.egg.fillEllipse(0, 45, 80, 15);
  }

  /**
   * Start pulsing animation
   */
  private startPulseAnimation(): void {
    this.pulseTween = this.tweens.add({
      targets: this.egg,
      scaleX: EGG_ANIMATION_CONFIG.pulseScale,
      scaleY: EGG_ANIMATION_CONFIG.pulseScale,
      duration: EGG_ANIMATION_CONFIG.pulseDuration,
      ease: EGG_ANIMATION_CONFIG.pulseEase,
      yoyo: true,
      repeat: -1
    });
  }

  /**
   * Stop pulsing animation
   */
  stopPulseAnimation(): void {
    if (this.pulseTween) {
      this.pulseTween.stop();
    }
  }

  /**
   * Animate egg hatching
   */
  animateHatch(): void {
    // Stop pulse animation
    this.stopPulseAnimation();

    // Shake animation
    this.tweens.add({
      targets: this.egg,
      x: this.egg.x + 8,
      duration: 50,
      yoyo: true,
      repeat: 12,
      onComplete: () => {
        // Scale up and fade out
        this.tweens.add({
          targets: this.egg,
          scaleX: 2.5,
          scaleY: 2.5,
          alpha: 0,
          duration: 600,
          ease: 'Power2',
          onComplete: () => {
            // Reset egg
            this.egg.setAlpha(1);
            this.egg.setScale(1);
            this.egg.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
            this.startPulseAnimation();
          }
        });
      }
    });
  }

  /**
   * Get egg object for external access
   */
  getEgg(): Phaser.GameObjects.Graphics {
    return this.egg;
  }
}
