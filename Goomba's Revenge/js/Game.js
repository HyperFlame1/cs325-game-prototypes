
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    // Create your own variables.
    this.music = null;
    this.background = null;
    this.gunshot = null;
    this.empty = null;
    this.reload = null;
    this.losing = null;
    this.mccree = null;
    this.earth = null;
    this.asteroids = null;
    this.crosshair = null;
    this.defendText = null;
    this.ammo = null;
    this.ammoText = null;
    this.score = null;
    this.scoreText = null;
    this.nextFire = 0;
    this.fireRate = 500;
    this.rKey = null;
};

function collisionHandler (crosshair, asteroid)
{
  asteroid.kill();
  this.score += 1;
  this.scoreText.text = 'Score: ' + this.score;
};

function gameEnd() {
  this.music.stop();
  this.losing.play();
  this.state.start('GameOver');
};

BasicGame.Game.prototype = {

    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.music = this.add.audio('stageMusic');
      this.music.loopFull();
    },

    update: function () {
      var randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber > 97)
      {
        var asteroid = this.asteroids.create(1600, Math.random() * 800, 'asteroid');
        asteroid.anchor.setTo(0.5);
        this.game.physics.arcade.moveToObject(asteroid, this.earth, 150);
      }
      this.crosshair.x = this.game.input.x;
      this.crosshair.y = this.game.input.y;
      for (var i = 0; i < this.asteroids.children.length; i++)
      {
        this.asteroids.children[i].rotation += 0.03;
      }
      if (this.game.input.activePointer.isDown)
      {
        if(this.game.time.now > this.nextFire && this.ammo > 0)
        {
          this.nextFire = this.game.time.now + this.fireRate;
          this.game.physics.arcade.overlap(this.crosshair, this.asteroids, collisionHandler, null, this);
          this.ammo--;
          this.ammoText.text = 'Ammo: ' + this.ammo;
          this.gunshot.play();
        }
        else if (this.game.time.now > this.nextFire && this.ammo == 0)
        {
          this.nextFire = this.game.time.now + this.fireRate;
          this.empty.play();
        }
      }
      if (this.ammo != 6 && this.rKey.isDown && this.game.time.now > this.nextFire)
      {
        this.ammo = 6;
        this.ammoText.text = 'Ammo: ' + 6;
        this.nextFire = this.game.time.now + 1500;
        this.reload.play();
      }
      this.game.physics.arcade.overlap(this.earth, this.asteroids, gameEnd, null, this);
    },
};
