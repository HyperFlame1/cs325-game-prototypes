
BasicGame.Preloader = function (game) {

	this.preloadBar = null;
	this.loadingText = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(800, 400, 'preloaderBar');
    this.loadingText = this.add.sprite(800, 400, 'loadingText');
    this.preloadBar.anchor.setTo(0.5);
    this.loadingText.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		this.load.image('titlePage', 'assets/title.png');
    this.load.atlas('mccree_select', 'assets/mccree_select.png', 'assets/mccree_select.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
    this.load.image('mccree_text', 'assets/mccree_text.png');
    this.load.image('mccree', 'assets/mccree.png');
		this.load.image('crosshair', 'assets/crosshair.png');
		this.load.image('defendText', 'assets/defendText.png');
		this.load.image('earth', 'assets/earth.png');
		this.load.image('asteroid', 'assets/asteroid.png');
		this.load.image('gameOverScreen', 'assets/gameOverScreen.png');
    this.load.audio('selectMcCree', 'assets/mccree_select.mp3');
		this.load.audio('gunshot', 'assets/gunshot.wav');
		this.load.audio('empty', 'assets/empty.wav');
		this.load.audio('reload', 'assets/reload.wav');
		this.load.audio('losing', 'assets/losing.mp3');
		this.load.audio('gameOver', 'assets/gameOver.wav');
		this.load.audio('titleMusic', ['assets/Overwatch - Rally The Heroes.mp3']);
		this.load.audio('gameMusic', ['assets/Overtime.mp3']);
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
