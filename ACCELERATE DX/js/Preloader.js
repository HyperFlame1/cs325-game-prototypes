"use strict";

GameStates.makePreloader = function( game ) {

	var ambulance = null;
	var background = null;

    return {

        preload: function ()
				{
					game.load.audio('titleMusic', 'assets/titleMusic.wav');
					game.load.audio('gameMusic', 'assets/gameMusic.wav');
					game.load.audio('siren', 'assets/siren.wav');
					game.load.audio('carHorn', 'assets/car_doppler.wav');
					game.load.audio('crash', 'assets/crash.wav');
					game.load.atlas('playButton', 'assets/playButton.png', 'assets/playButton.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
					game.load.image('road', 'assets/road.png');
					game.load.image('blueCar', 'assets/blue.png');
					game.load.image('greenCar', 'assets/green.png');
					game.load.image('orangeCar', 'assets/orange.png');
					game.load.image('redCar', 'assets/red.png');
					game.load.image('yellowCar', 'assets/yellow.png');
					game.load.image('gameOverScreen', 'assets/gameOverScreen.png');
					game.load.image('winScreen', 'assets/winScreen.png');
        },

        create: function ()
				{
					background = game.add.sprite(0, 0, 'loading');

					ambulance = game.add.sprite(-50, 400, 'ambulance');
					game.physics.arcade.enable(ambulance);
					ambulance.anchor.setTo(0.5);
					ambulance.angle = 90;
					ambulance.body.velocity.x = 400;
        },

        update: function ()
				{
					  if (game.cache.isSoundDecoded('titleMusic') && ambulance.body.x > 450)
						{
                game.state.start('MainMenu');
						}
        }
    };
};
