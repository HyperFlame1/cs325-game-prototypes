
BasicGame.Preloader = function (game) {

	this.preloadBar = null;
	this.loadingText = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(256, 256, 'preloaderBar');
    this.loadingText = this.add.sprite(256, 256, 'loadingText');
    this.preloadBar.anchor.setTo(0.5);
    this.loadingText.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		this.load.image('title', 'assets/title.png');
		this.load.atlas('mario_running', 'assets/mario_running.png', 'assets/mario_running.json', Phaser.Loader.TEXTURE_ATLAS_JASON_ARRAY);
		this.load.atlas('playButton', 'assets/playButton.png', 'assets/playButton.json', Phaser.Loader.TEXTURE_ATLAS_JASON_ARRAY);
		this.load.image('standingGoombaRight', 'assets/standingGoombaRight.png');
		this.load.image('standingGoombaLeft', 'assets/standingGoombaLeft.png');
		this.load.image('ground', 'assets/ground.png');
		this.load.image('background', 'assets/background.png');
		this.load.audio('titleMusic', 'assets/titleMusic.wav');
		this.load.audio('stageMusic', 'assets/stageMusic.mp3');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
