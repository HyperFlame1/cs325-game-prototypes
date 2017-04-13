"use strict";

GameStates.makeWin = function (game, shared) {

  var text = null;
  var winScreen = null;
  var spacebar = null;

  return {

    create: function ()
    {
      shared.highscore = 60000;
      winScreen = this.add.sprite(0, 0, 'winScreen');
      spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
