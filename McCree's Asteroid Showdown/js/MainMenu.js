
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.mccree_select = null;
	this.mccree_text = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');
		this.mccree_text = this.add.sprite(800, 700, 'mccree_text');
		this.mccree_text.anchor.setTo(0.5);

		this.mccree_select = this.add.button(800, 650, 'mccree_select', this.startGame, this, 'over', 'out', 'down');
		this.mccree_select.anchor.setTo(0.5);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
