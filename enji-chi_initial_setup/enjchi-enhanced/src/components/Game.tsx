/**
 * Game Component - Wraps Phaser game canvas in React
 */

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/game.config';
import { MainScene } from '../game/scenes/MainScene';
import './Game.css';

interface GameProps {
  onHatchComplete?: () => void;
}

export const Game: React.FC<GameProps> = ({ onHatchComplete }) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) {
      return;
    }

    // Initialize Phaser game
    gameRef.current = new Phaser.Game({
      ...GAME_CONFIG,
      parent: containerRef.current
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  /**
   * Trigger hatch animation
   */
  const triggerHatch = () => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene('MainScene') as MainScene;
      if (scene) {
        scene.animateHatch();
        if (onHatchComplete) {
          // Call callback after animation completes
          setTimeout(onHatchComplete, 3000);
        }
      }
    }
  };

  // Expose triggerHatch method to parent
  useEffect(() => {
    (window as any).triggerHatch = triggerHatch;
    return () => {
      delete (window as any).triggerHatch;
    };
  }, []);

  return (
    <div className="game-wrapper">
      <div id="game-container" ref={containerRef}></div>
    </div>
  );
};
