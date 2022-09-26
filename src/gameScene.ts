import Phaser from 'phaser';
import { Platform, platformMap } from './map';

enum Physics {
  BOUNCE = 0.1,
  VELOCITY_X = 200,
  VELOCITY_Y = 500
}

export default class GameScene extends Phaser.Scene {
  private player: any;
  private platforms: any;
  private cursors: any;

  constructor() {
    super('GameScene');
  }

  // -------------------------- //
  // ------ Game's state ------ //
  // -------------------------- //
  
  preload() {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('chunky', 'assets/chunky.png', {
      frameWidth: 60,
      frameHeight: 96,
    });
  }

  create() {
    this.add.image(400, 250, 'bg');
    this.platforms = this.physics.add.staticGroup();
    this.player = this.physics.add.sprite(100, 400, 'chunky');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, this.platforms);

    this.createPlatforms();
    this.createPlayer();
    this.createMovementAnimations();
  }

  update() {
    this.handlePlayerInput();
  }

  // ----------------------------------- //
  // ------ Create & load sprites ------ //
  // ----------------------------------- //

  createPlatforms() {
    platformMap.map((platform: Platform) => {
        this.platforms.create(platform.x, platform.y, platform.key).setScale(platform.scale ?? 1).refreshBody();
    })
  }

  createPlayer() {
    this.player.setBounce(Physics.BOUNCE);
    this.player.setCollideWorldBounds(false);
  }

  // ------------------------ //
  // ------ Animations ------ //
  // ------------------------ //

  createMovementAnimations() {
    this.createMoveLeftAnim();
    this.createMoveRightAnim();
    this.createIdleAnim();
  }

  createMoveLeftAnim() {
    const configMoveLeft = {
      key: 'left',
      frames: this.anims.generateFrameNumbers('chunky', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    };
    this.anims.create(configMoveLeft);
  }

  createMoveRightAnim() {
    const configMoveRight = {
      key: 'right',
      frames: this.anims.generateFrameNumbers('chunky', { start: 5, end: 9 }),
      frameRate: 10,
      repeat: -1
    }
    this.anims.create(configMoveRight);
  }
  
  createIdleAnim() {
    const configIdle = {
      key: 'idle',
      frames: [ { key: 'chunky', frame: 0 } ],
      frameRate: 20
    };
    this.anims.create(configIdle);
  }

  // -------------------------------- //
  // ------ Movement functions ------ //
  // -------------------------------- //

  handlePlayerInput() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.jump();
    }
    if (this.cursors.left.isDown) {
      this.moveLeft();
      return;
    }
    if (this.cursors.right.isDown) {
      this.moveRight();
      return;
    } 
    this.idle();
  }

  jump() {
    this.player.setVelocityY(-Physics.VELOCITY_Y);
  }

  moveLeft() {
    this.player.setVelocityX(-Physics.VELOCITY_X);
    this.player.anims.play('left', true);
  }

  moveRight() {
    this.player.setVelocityX(Physics.VELOCITY_X);
    this.player.anims.play('right', true);
  }

  idle() {
    this.player.setVelocityX(0);
    this.player.anims.play('idle'); 
  }
}
