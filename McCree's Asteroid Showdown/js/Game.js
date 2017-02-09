
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
  this.scoreText = 'Score: ' + this.score;
};

function gameEnd() {
  this.music.stop();
  this.losing.play();
  this.state.start('GameOver');
};

BasicGame.Game.prototype = {

    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.music = this.add.audio('gameMusic');
      this.music.loopFull();
      this.background = this.add.sprite(0, 0, 'titlePage');
      this.crosshair = this.add.sprite(this.game.input.mousePointer.x, this.game.input.mousePointer.y, 'crosshair'); //this.game.input.mousePointer.x, this.game.input.mousePointer.y,
      this.crosshair.anchor.setTo(0.5);
      this.game.physics.arcade.enableBody(this.crosshair);
      this.defendText = this.add.sprite(800, 50, 'defendText');
      this.defendText.anchor.setTo(0.5);
      this.defendText.scale.setTo(1.2);
      this.game.add.tween(this.defendText).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 2000, 0, false);
      this.mccree = this.add.sprite(200, 290, 'mccree');
      this.mccree.anchor.setTo(0.5, 1);
      this.mccree.scale.setTo(0.3);
      this.earth = this.add.sprite(200, 450, 'earth');
      this.earth.anchor.setTo(0.5);
      this.earth.scale.setTo(0.8);
      this.game.physics.arcade.enableBody(this.earth);
      this.game.input.mouse.capture = true;
      this.asteroids = this.game.add.group();
      this.asteroids.enableBody = true;
      this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
      this.ammo = 6;
      this.score = 0;
      this.gunshot = this.add.audio('gunshot');
      this.empty = this.add.audio('empty');
      this.reload = this.add.audio('reload');
      this.losing = this.add.audio('losing');
      this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
      this.scoreText = this.game.add.text(50, 50, 'Score: 0', { fontSize: '32px', fill: '#FFF'});
      this.ammoText = this.game.add.text(50, 700, 'Ammo: 6', { fontSize: '32px', fill: '#FFF'});
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
          this.ammoText = 'Ammo: ' + this.ammo;
          this.gunshot.play();
        }
        else if (this.game.time.now > this.nextFire && this.ammo == 0)
        {
          this.nextFire = this.game.time.now + this.fireRate;
          this.ammoText = 'Press R to Reload';
          this.empty.play();
        }
      }
      if (this.rKey.isDown && this.game.time.now > this.nextFire)
      {
        this.ammo = 6;
        this.ammoText = 'Ammo: ' + 6;
        this.nextFire = this.game.time.now + 1500;
        this.reload.play();
      }
      this.game.physics.arcade.overlap(this.earth, this.asteroids, gameEnd, null, this);
    },
};
