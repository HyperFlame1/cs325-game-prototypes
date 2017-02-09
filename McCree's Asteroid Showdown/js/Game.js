
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
    this.mccree = null;
    this.earth = null;
    this.asteroids = null;
    this.crosshair = null;
    this.defendText = null;
    this.ammo = null;
    this.score = null;
};

function collisionHandler (crosshair, asteroid)
{
  asteroid.kill();
  this.score += 1;
}


BasicGame.Game.prototype = {

    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.music = this.add.audio('gameMusic');
      this.music.loopFull();
      this.background = this.add.sprite(0, 0, 'titlePage');
      this.crosshair = this.add.sprite(this.game.input.mousePointer.x, this.game.input.mousePointer.y, 'crosshair'); //this.game.input.mousePointer.x, this.game.input.mousePointer.y,
      this.crosshair.anchor.setTo(0.5);
      this.defendText = this.add.sprite(800, 50, 'defendText');
      this.defendText.anchor.setTo(0.5);
      this.defendText.scale.setTo(1.2);
      this.game.add.tween(this.defendText).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 2000, 0, false);
      this.mccree = this.add.sprite(200, 240, 'mccree');
      this.mccree.anchor.setTo(0.5, 1);
      this.mccree.scale.setTo(0.3);
      this.earth = this.add.sprite(200, 400, 'earth');
      this.earth.anchor.setTo(0.5);
      this.earth.scale.setTo(0.8);
      this.game.input.mouse.capture = true;
      this.asteroids = this.game.add.group();
      this.asteroids.enableBody = true;
      this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
      this.ammo = 6;
      this.score = 0;
    },

    update: function () {
      var randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber > 98)
      {
        var asteroid = this.asteroids.create(1600, Math.random() * 800, 'asteroid');
        this.game.physics.arcade.moveToObject(asteroid, this.earth, 150);
      }
      this.crosshair.x = this.game.input.x;
      this.crosshair.y = this.game.input.y;
      if (this.game.input.activePointer.isDown)
      {
        this.game.physics.arcade.overlap(this.crosshair, this.asteroids, collisionHandler, null, this);
      }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
