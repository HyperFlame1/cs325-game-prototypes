"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var road = null;
	var ambulance = null;
	var playButton = null;

    function startGame(pointer)
		{
      music.stop();
      game.state.start('Game');
    }

    return {

        create: function ()
				{
					music = game.add.audio('titleMusic');
					music.loopFull();

					this.game.physics.startSystem(Phaser.Physics.ARCADE);

					road = game.add.tileSprite(0, 0, 400, 800, 'road');

					ambulance = game.add.sprite(50, 750, 'ambulance');
					ambulance.anchor.setTo(0.5);
					game.physics.arcade.enable(ambulance);
					ambulance.body.velocity.y = 0;

					playButton = game.add.button(200, 400, 'playButton', startGame, null, 'over', 'out', 'down');
					playButton.anchor.setTo(0.5);
        },

        update: function () {
					road.tilePosition.y += 3;
        }

    };
};
