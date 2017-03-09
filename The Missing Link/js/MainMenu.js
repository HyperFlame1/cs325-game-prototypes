"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var collideSound = null;
	var playButton = null;
	var greenLink = null;
	var map = null;
	var wallLayer = null;
	var objectsLayer = null;
	var floorLayer = null;

    function startGame(pointer) {

        music.stop();
        game.state.start('Game');

    }

		function bounce(link, object)
		{
			collideSound.play();
			link.alpha = 1;
			link.body.acceleration.x = 100;
			game.add.tween(link).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true, 500, 0, false);
		}

    return {

        create: function () {

						this.game.physics.startSystem(Phaser.Physics.ARCADE);

            music = game.add.audio('titleMusic');
            music.play();

						collideSound = game.add.audio('collideSound');

            map = game.add.tilemap('castle');
						map.addTilesetImage('castleTiles');
						floorLayer = map.createLayer('Floors');
						objectsLayer = map.createLayer('Objects');
						wallLayer = map.createLayer('Walls');
						map.setCollisionBetween(9, 17, true, 'Walls');
						objectsLayer = map.createLayer('Objects');
						map.enableBody = true;
						game.physics.arcade.enable(map);

						greenLink = game.add.sprite(256, 355, 'greenLink');
						greenLink.anchor.setTo(0.5);
						greenLink.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkingRight', 1, 8), 12, true);
						greenLink.animations.play('walkRight');
						game.physics.arcade.enable(greenLink);
						greenLink.body.bounce.set(1);
						greenLink.body.velocity.x = 100;
						greenLink.body.setSize(20, 25, 11, 8);

						game.add.sprite(0, 0, 'title');

						playButton = game.add.button(256, 256, 'playButton', startGame, null, 'over', 'out', 'down');
						playButton.anchor.setTo(0.5);

						game.add.tween(greenLink).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true, 500, 0, false);
        },

        update: function () {
					greenLink.body.drag = 300;
					game.physics.arcade.collide(greenLink, wallLayer, bounce);
        }

    };
};
