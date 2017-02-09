BasicGame.GameOver = function (game) {
  this.gameOverScreen = null;
  this.spacebar = null;
  this.music = null;
};

BasicGame.GameOver.prototype = {
  create: function () {
    this.music = this.add.audio('gameOver');
    this.gameOverScreen = this.add.sprite(0, 0, 'gameOverScreen');
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  update: function() {
    if (this.spacebar.isDown)
    {
      this.music.stop();
      this.state.start('Game');
    }
  },
};
