"use strict";

GameStates.makePreloader = function( game ) {

	var ambulance = null;

    return {

        preload: function ()
				{
					game.load.audio('titleMusic', 'assets/titleMusic.wav');
					game.load.audio('gameMusic', 'assets/gameMusic.wav');
					game.load.atlas('playButton', 'assets/playButton.png', 'assets/playButton.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
					game.load.image('road', 'assets/road.png');
					game.load.image('ambulance', 'assets/ambulance.png');
					game.load.image('blueCar', 'assets/blue.png');
					game.load.image('greenCar', 'assets/green.png');
					game.load.image('orangeCar', 'assets/orange.png');
					game.load.image('redCar', 'assets/red.png');
					game.load.image('yellowCar', 'assets/yellow.png');
        },

        create: function ()
				{

        },

        update: function ()
				{
					  if (game.cache.isSoundDecoded('titleMusic'))
						{
                game.state.start('MainMenu');
						}
        }
    };
};
