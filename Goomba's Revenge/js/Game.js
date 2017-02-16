
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

    this.music = null;
    this.background = null;
    this.ground = null;
    this.goomba = null;
    this.mario = null;
    this.shell = null;
    this.jumped = false;
    this.jumpSound = null;
};

var marioIsGrounded = false;
var marioIsHurt = false;
var goombaIsGrounded = false;
var shellSpin = false;
var stompSound = null;
var hurtSound = null;
var score = null;
var scoreText = null;

function goombaDeath(goomba, shell)
{
  hurtSound.play();
  goomba.body.velocity.x = -200;
  goomba.body.velocity.y = -500;
  goomba.body.angularVelocity = -300;
};

function goombaLand(goomba, ground)
{
  goomba.animations.play('running');
  goombaIsGrounded = true;
};

function goombaStomp(goomba, shell)
{
  stompSound.play();
  goomba.animations.stop();
  goomba.animations.play('jumping');
  goomba.body.velocity.x = 0;
  goomba.x = 50;
  goomba.body.velocity.y = -140;
  shell.body.velocity.x = 400;
};

function marioLand(mario, ground)
{
  mario.animations.play('running');
  mario.body.angularVelocity = 0;
  mario.rotation = 0;
  marioIsGrounded = true;
  marioIsHurt = false;
};

function marioHurt(mario, shell)
{
  hurtSound.play();
  mario.body.velocity.x = 0;
  mario.body.velocity.y = -800;
  marioIsGrounded = false;
  marioIsHurt = true;
  score += 1;
  scoreText.text = 'Score: ' + score;
};

function marioStomp(mario, shell)
{
	stompSound.play();
  var randomNum = Math.floor(Math.random() * 120);
	shell.body.velocity.x = -180 - randomNum;
  shell.animations.play('spinning');
	mario.body.velocity.y = -140;
	mario.animations.stop();
	mario.animations.play('jumping');
  shellSpin = true;
};

function gameOver(music, state) {
  music.stop();
  state.start('GameOver');
};

BasicGame.Game.prototype = {

    create: function () {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1400;

      this.music = this.add.audio('stageMusic');
      this.music.loopFull(0.7);

      this.jumpSound = this.add.audio('jump');
      stompSound = this.add.audio('stomp');
      hurtSound = this.add.audio('hurt');

      this.background = this.add.tileSprite(0, 0, 512, 512, 'background');
  		this.ground = this.add.tileSprite(0, 0, 512, 512, 'ground');
      this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;
      this.ground.body.setSize(512, 512, 0, 456);

      this.mario = this.add.sprite(350, 456, 'mario_running');
      this.mario.anchor.setTo(0.5, 1);
      this.mario.animations.add('running', Phaser.Animation.generateFrameNames('running', 1, 3), 15, true);
      this.mario.animations.add('jumping', Phaser.Animation.generateFrameNames('jumping', 1, 2), 2, false);
      this.mario.animations.play('running');
      this.game.physics.enable(this.mario, Phaser.Physics.ARCADE);
      marioIsGrounded = true;
      marioIsHurt = false;

      this.goomba = this.add.sprite(50, 456, 'goomba_running');
      this.goomba.anchor.setTo(0.5, 1);
      this.goomba.animations.add('running', ['running 1', 'running 2'], 8, true);
      this.goomba.animations.add('jumping', ['running 1', 'running 2'], 10, false);
      this.goomba.animations.play('running');
      this.game.physics.enable(this.goomba, Phaser.Physics.ARCADE);
      goombaIsGrounded = true;

      this.shell = this.add.sprite(540, 456, 'shell');
      this.shell.anchor.setTo(0.5, 1);
      this.shell.animations.add('still', ['shell1'], 1, false);
      this.shell.animations.add('spinning', Phaser.Animation.generateFrameNames('shell', 1, 4), 15, true);
      this.shell.animations.play('still');
      this.game.physics.enable(this.shell, Phaser.Physics.ARCADE);
      this.shell.body.allowGravity = false;
      this.shell.body.immovable = true;
      this.shell.body.velocity.x = -120;
      shellSpin = false;

      score = 0;
      scoreText = this.game.add.text(256, 492, 'Score: 0', { fontSize: '18px', fill: '#FFF'});
      scoreText.anchor.setTo(0.5);
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    },

    update: function () {

      this.ground.tilePosition.x -= 2;
      this.background.tilePosition.x -= 0.3;

      if (this.goomba.alive && (this.goomba.x < -40))
      {
        this.goomba.kill();
        gameOver(this.music, this.state);
      }


      if (this.shell.alive && (this.shell.x < -40 || this.shell.x > 700))
      {
        this.shell.kill();
      }

      if (!this.shell.alive)
      {
        this.shell.reset(515, 456);
        this.shell.body.velocity.x = -120;
        shellSpin = false;
        this.shell.animations.play('still');
      }

      if (marioIsGrounded == true)
      {
        this.game.physics.arcade.collide(this.mario, this.ground);
        this.game.physics.arcade.collide(this.mario, this.shell, marioHurt);
      }
      else
      {
        this.game.physics.arcade.collide(this.mario, this.ground, marioLand);
        if (marioIsHurt == false)
        {
          this.game.physics.arcade.collide(this.mario, this.shell, marioStomp);
        }
      }

      if (goombaIsGrounded == true)
      {
        this.game.physics.arcade.collide(this.goomba, this.ground);
        this.game.physics.arcade.collide(this.goomba, this.shell, goombaDeath);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
          this.goomba.animations.play('jumping');
          this.goomba.body.velocity.y = -380;
          this.jumpSound.play();
          goombaIsGrounded = false;
        }
      }
      else
      {
        this.game.physics.arcade.collide(this.goomba, this.ground, goombaLand);
        if (this.goomba.body.velocity.y > 0)
        {
          this.game.physics.arcade.collide(this.goomba, this.shell, goombaStomp);
        }
        else
        {
          this.game.physics.arcade.collide(this.goomba, this.shell, goombaDeath);
        }
      }

      if ((this.shell.x - this.mario.x) < 75 && marioIsGrounded == true && shellSpin == false)
      {
        this.mario.animations.play('jumping');
        this.mario.body.velocity.y = -480;
        this.jumped = true;
        this.jumpSound.play();
        marioIsGrounded = false;
      }
    }
};
