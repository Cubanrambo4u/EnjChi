/**
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
