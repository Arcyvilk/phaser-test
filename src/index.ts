import Phaser from 'phaser';
import GameScene from './gameScene';

const CONFIG = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    width: 800,
    height: 500,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    fps: 120,
    arcade: {
        gravity: { y: 800 },
        debug: false
    }
  }
};

const game = new Phaser.Game(
  Object.assign(CONFIG, {
    scene: [GameScene]
  })
);
