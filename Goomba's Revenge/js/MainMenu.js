
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.background = null;
	this.ground = null;
	this.goomba1 = null;
	this.goomba2 = null;
	this.mario = null;
	this.jumpSound = null;
	this.title = null;
	this.jumped = false;
	this.landed = false;
};

var stompSound = null;

function stomp(mario, goomba)
{
	stompSound.play();
	goomba.body.allowGravity = true;
	goomba.body.velocity.x = 5;
	goomba.body.velocity.y = 10;
	goomba.body.angularVelocity = 70;
	mario.body.velocity.y = -140;
	mario.animations.stop();
	mario.animations.play('jumping');
};

function landing(mario, ground)
{
	mario.animations.play('running');
	this.landed = true;
};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 800;

		this.jumpSound = this.add.audio('jump');
		stompSound = this.add.audio('stomp');
		this.music = this.add.audio('titleMusic');
		this.music.loopFull(0.6);

		this.background = this.add.tileSprite(0, 0, 512, 512, 'background');
		this.ground = this.add.tileSprite(0, 0, 512, 512, 'ground');
		this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.allowGravity = false;
		this.ground.body.immovable = true;
		this.ground.body.setSize(512, 512, 0, 456);

		this.goomba1 = this.add.sprite(226, 456, 'standingGoombaRight');
		this.goomba1.anchor.setTo(0.5, 1);
		this.goomba2 = this.add.sprite(286, 456, 'standingGoombaLeft');
		this.goomba2.anchor.setTo(0.5, 1);
		this.game.physics.enable(this.goomba2, Phaser.Physics.ARCADE);
		this.goomba2.body.allowGravity = false;

		this.playButton = this.add.button(256, 256, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.playButton.anchor.setTo(0.5);

		this.title = this.add.sprite(256, 35, 'title');
		this.title.anchor.setTo(0.5, 0);

		this.mario = this.add.sprite(10, 456, 'mario_running');
		this.mario.anchor.setTo(0.5, 1);
		this.mario.animations.add('running', Phaser.Animation.generateFrameNames('running', 1, 3), 10, true);
		this.mario.animations.add('jumping', Phaser.Animation.generateFrameNames('jumping', 1, 2), 2, false);
		this.mario.animations.play('running');
		this.game.physics.enable(this.mario, Phaser.Physics.ARCADE);
		this.mario.body.enable = true;
		this.mario.body.velocity.x = 90;

		this.jumped = false;

	},

	update: function () {

		this.game.physics.arcade.collide(this.mario, this.goomba2, stomp);

		if (this.jumped != true || this.landed == true)
		{
			this.game.physics.arcade.collide(this.mario, this.ground);
		}

		if ((this.goomba1.x - this.mario.x) < 25 && this.jumped == false)
		{
			this.mario.animations.stop();
			this.mario.animations.play('jumping');
			this.jumpSound.play();
			this.mario.body.velocity.y = -370;
			this.jumped = true;
		}

		if (this.jumped == true && this.landed != true)
		{
			this.game.physics.arcade.collide(this.mario, this.ground, landing);
		}

	},

	startGame: function (pointer) {

		this.music.stop();
		this.state.start('Game');

	}

};
