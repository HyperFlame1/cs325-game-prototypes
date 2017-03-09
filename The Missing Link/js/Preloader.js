"use strict";

GameStates.makePreloader = function( game ) {

	var spinAttack = null;
	var ready = false;

    return {

        preload: function () {

					game.load.audio('titleMusic', 'assets/titleMusic.mp3');
					game.load.audio('gameMusic', 'assets/darkworld.wav');
					game.load.audio('collideSound', 'assets/collide.wav');
					game.load.audio('swingSound', 'assets/swordSwing.wav');
					game.load.audio('hurtSound', 'assets/hurt.wav');
					game.load.audio('winSound', 'assets/win.wav');
					game.load.audio('clangSound', 'assets/clang.wav');
					game.load.atlas('playButton', 'assets/playButton.png', 'assets/playButton.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
					game.load.atlas('greenLink', 'assets/greenLink.png', 'assets/greenLink.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
					game.load.atlas('blueLink', 'assets/blueLink.png', 'assets/blueLink.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
					game.load.tilemap('castle', 'assets/hyrule_stage.json', null, Phaser.Tilemap.TILED_JSON);
					game.load.image('castleTiles', 'assets/hyrule_stage.png');
					game.load.image('title', 'assets/title.png');
					game.load.image('greenWins', 'assets/greenWins.png');
					game.load.image('blueWins', 'assets/blueWins.png');
        },

        create: function () {

					spinAttack = game.add.sprite(256, 256, 'spinAttack');
					spinAttack.anchor.setTo(0.5);
					spinAttack.animations.add('attack', Phaser.Animation.generateFrameNames('', 1, 29), 60, true);
					spinAttack.animations.play('attack');

        },

        update: function () {

            if (game.cache.isSoundDecoded('titleMusic') && ready == false && spinAttack.animations.currentAnim.loopCount >= 1)
            {
                ready = true;
                game.state.start('MainMenu');
            }

        }
    };
};
