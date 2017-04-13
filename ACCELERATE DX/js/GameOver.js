"use strict";

GameStates.makeGameOver = function (game, shared) {

  var highscore = null;
  var text = null;
  var gameOverScreen = null;
  var spacebar = null;

  return {

    create: function ()
    {
      highscore = shared.highscore;
      gameOverScreen = this.add.sprite(0, 0, 'gameOverScreen');
      spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      text = game.add.text(125, 450, 'Highscore: ' + highscore, { fontSize: '20px', fill: '#fff', boundsAlignH: "center"})
    },

    update: function()
    {
      if (spacebar.isDown)
      {
        game.state.start('MainMenu');
      }
    },

  };
};
