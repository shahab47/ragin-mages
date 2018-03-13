export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, targetX, targetY) {
    Projectile.buildAnimations(scene, key);
    super(scene, x, y, key);
    this.type = key;

    this.vector = new Phaser.Math.Vector2(x + targetX - 400, y + targetY - 300);
    this.vector = this.vector.subtract({x: x, y: y}).normalize();
    this.rotation = this.vector.angle();
    this.scale = 0.8;

    this.speed = 250;

    this.anims.play(`proj_${key}-E`, true);

    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setVelocity(this.vector.x * this.speed, this.vector.y * this.speed);

  }

  static buildAnimations(scene) {
    if(!this.animationsCreated) {
      const coordinates = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const animations = [
        {
          name: 'orb', frames: 6
        },
        {
          name: 'ven', frames: 6
        },
        {
          name: 'fire', frames: 6
        },
        {
          name: 'light', frames: 6
        },
        {
          name: 'ice', frames: 6
        }
      ];


      for (const animation of animations) {
        for (const coordinate of coordinates) {
          let animFrames = scene.anims.generateFrameNames('projectiles', {
            start: 1, end: animation.frames, zeroPad: 4,
            prefix: `proj_${animation.name}/${coordinate}/`, suffix: ''
          });
          scene.anims.create({ key: `proj_${animation.name}-${coordinate}`, frames: animFrames, frameRate: 7, repeat: -1 });
        }
      }
      this.animationsCreated = true;
    }

    /*if(!this.animationsCreated) {
      const coordinates = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

      for (const coordinate of coordinates) {
        let animFrames = scene.anims.generateFrameNames(type, {
          start: 1, end: 8, zeroPad: 4,
          prefix: `${coordinate}/`, suffix: ''
        });
        scene.anims.create({ key: `${type}-${coordinate}`, frames: animFrames, frameRate: 10, repeat: -1 });
      }
      this.animationsCreated = true;
    }*/
  }


}