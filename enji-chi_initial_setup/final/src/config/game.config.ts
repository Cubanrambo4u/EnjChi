import Phaser from 'phaser';

/**
 * Game configuration constants
 */
export const GAME_CONFIG = {
  // Game dimensions
  width: 800,
  height: 600,
  
  // Mobile scaling
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    width: 800,
    height: 600
  },
  
  // Animation settings
  eggPulse: {
    duration: 1500,
    scaleMin: 0.95,
    scaleMax: 1.05,
    repeat: -1,
    yoyo: true
  },
  
  // UI settings
  buttonStyle: {
    fontSize: '32px',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    backgroundColor: '#4CAF50',
    padding: {
      x: 40,
      y: 20
    },
    borderRadius: 10
  }
};

/**
 * Phaser game configuration
 */
export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  parent: 'game-container',
  backgroundColor: '#2d2d2d',
  scale: GAME_CONFIG.scale,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  render: {
    pixelArt: false,
    antialias: true
  }
};
