
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.background = null;
	this.ground = null;
	this.playButton = null;
	this.goomba1 = null;
	this.goomba2 = null;
	this.mario = null;
	
};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.music = this.add.audio('titleMusic');
		this.music.loopFull();

		this.background = this.add.tileSprite(0, 0, 'background');
		this.ground = this.add.tileSprite(0, 0, 'ground');

		this.goomba1 = this.add.sprite(250, 432, 'standingGoombaRight');
		this.goomba1.anchor.setTo(0.5, 1);
		this.goomba2 = this.add.sprite(262, 432, 'standingGoombaLeft');
		this.goomba2.anchor.setTo(0.5, 1);

		this.playButton = this.add.button(256, 256, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.playButton.anchor.setTo(0.5);
	},

	update: function () {
		this.background.tilePosition.x += 1;
	},

	startGame: function (pointer) {

		this.music.stop();
		this.state.start('Game');

	}

};
