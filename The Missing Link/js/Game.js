"use strict";

GameStates.makeGame = function( game, shared ) {

  var music = null;
  var collideSound = null;
  var swingSound = null;
  var hurtSound = null;
  var winSound = null;
  var clangSound = null;
  var greenLink = null;
  var blueLink = null;
  var map = null;
  var floorLayer = null;
  var objectsLayer = null;
  var wallLayer = null;

  var greenFaceUp = false;
  var greenFaceRight = false;
  var greenFaceDown = false
  var greenFaceLeft = false;
  var greenSwinging = false;
  var greenWalkingUp = false;
  var greenWalkingRight = false;
  var greenWalkingDown = false;
  var greenWalkingLeft = false;
  var greenStanding = false;
  var greenVisible = null;

  var blueFaceUp = false;
  var blueFaceRight = false;
  var blueFaceDown = false;
  var blueFaceLeft = false;
  var blueSwinging = false;
  var blueWalkingUp = false;
  var blueWalkingRight = false;
  var blueWalkingDown = false;
  var blueWalkingLeft = false;
  var blueStanding = false;
  var blueVisible = null;

  var winner = false;

  var w = null;
  var a = null;
  var s = null;
  var d = null;
  var f = null;
  var up = null;
  var left = null;
  var right = null;
  var down = null;
  var l = null;
  var spacebar = null;

    function greenCollide(greenLink, object)
    {
      collideSound.play();
      greenVisible.stop();
      greenLink.alpha = 1;
      greenVisible = game.add.tween(greenLink).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 250, 0, false);
    }

    function blueCollide(blueLink, object)
    {
      collideSound.play();
      blueVisible.stop();
      blueLink.alpha = 1;
      blueVisible = game.add.tween(blueLink).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 250, 0, false);
    }

    function linksCollide(greenLink, blueLink)
    {
      collideSound.play();
      greenVisible.stop();
      blueVisible.stop();
      greenLink.alpha = 1;
      blueLink.alpha = 1;
      greenVisible = game.add.tween(greenLink).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
      blueVisible = game.add.tween(blueLink).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    function greenSwing()
    {
      greenLink.body.velocity.x = 0;
      greenLink.body.velocity.y = 0;
      if (greenFaceUp)
      {
        greenLink.animations.play('swingUp');
        greenLink.body.setSize(34, 18, 0, 0);
      }
      if (greenFaceRight)
      {
        greenLink.animations.play('swingRight');
        greenLink.body.setSize(12, 33, 28, 8);
      }
      if (greenFaceDown)
      {
        greenLink.animations.play('swingDown');
        greenLink.body.setSize(32, 16, 8, 24);
      }
      if (greenFaceLeft)
      {
        greenLink.animations.play('swingLeft');
        greenLink.body.setSize(15, 32, 0, 5);
      }
      swingSound.play();
      greenSwinging = true;
      greenVisible.stop();
      greenLink.alpha = 1;
      greenVisible = game.add.tween(greenLink).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 250, 0, false);
    }

    function greenSwingComplete()
    {
      greenSwinging = false;
      greenLink.body.velocity.x = 0;
      greenLink.body.velocity.y = 0;
      greenLink.body.setSize(20, 25, 11, 8);
      if (greenFaceUp && !w.isDown)
      {
        greenLink.animations.play('standUp');
      }
      if (greenFaceUp && w.isDown)
      {
        greenLink.animations.play('walkUp');
      }
      if (greenFaceRight && !d.isDown)
      {
        greenLink.animations.play('standRight');
      }
      if (greenFaceRight && d.isDown)
      {
        greenLink.animations.play('walkRight');
      }
      if (greenFaceDown && !s.isDown)
      {
        greenLink.animations.play('standDown');
      }
      if (greenFaceDown && s.isDown)
      {
        greenLink.animations.play('walkDown');
      }
      if (greenFaceLeft && !a.isDown)
      {
        greenLink.animations.play('standLeft');
      }
      if (greenFaceLeft && a.isDown)
      {
        greenLink.animations.play('walkLeft');
      }
    }

    function blueSwing()
    {
      blueLink.body.velocity.x = 0;
      blueLink.body.velocity.y = 0;
      if (blueFaceUp)
      {
        blueLink.animations.play('swingUp');
        blueLink.body.setSize(34, 18, 0, 0);
      }
      if (blueFaceRight)
      {
        blueLink.animations.play('swingRight');
        blueLink.body.setSize(12, 33, 27, 8);
      }
      if (blueFaceDown)
      {
        blueLink.animations.play('swingDown');
        blueLink.body.setSize(32, 16, 8, 24);
      }
      if (blueFaceLeft)
      {
        blueLink.animations.play('swingLeft');
        blueLink.body.setSize(15, 32, 0, 5);
      }
      swingSound.play();
      blueSwinging = true;
      blueVisible.stop();
      blueLink.alpha = 1;
      blueVisible = game.add.tween(blueLink).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 250, 0, false);
    }

    function blueSwingComplete()
    {
      blueSwinging = false;
      blueLink.body.velocity.x = 0;
      blueLink.body.velocity.y = 0;
      blueLink.body.setSize(20, 25, 11, 8);
      if (blueFaceUp && !up.isDown)
      {
        blueLink.animations.play('standUp');
      }
      if (blueFaceUp && up.isDown)
      {
        blueLink.animations.play('walkUp');
      }
      if (blueFaceRight && !right.isDown)
      {
        blueLink.animations.play('standRight');
      }
      if (blueFaceRight && right.isDown)
      {
        blueLink.animations.play('walkRight');
      }
      if (blueFaceDown && !down.isDown)
      {
        blueLink.animations.play('standDown');
      }
      if (blueFaceDown && down.isDown)
      {
        blueLink.animations.play('walkDown');
      }
      if (blueFaceLeft && !left.isDown)
      {
        blueLink.animations.play('standLeft');
      }
      if (blueFaceLeft && left.isDown)
      {
        blueLink.animations.play('walkLeft');
      }
    }

    function greenWins(greenLink, blueLink)
    {
      greenVisible.stop();
      blueVisible.stop();
      greenLink.alpha = 1;
      blueLink.alpha = 1;
      winSound.play();
      hurtSound.play();
      blueLink.animations.play('dead');
      game.add.sprite(0, 0, 'greenWins');
      winner = true;
    }

    function blueWins(blueLink, greenLink)
    {
      greenVisible.stop();
      blueVisible.stop();
      greenLink.alpha = 1;
      blueLink.alpha = 1;
      winSound.play();
      hurtSound.play();
      greenLink.animations.play('dead');
      game.add.sprite(0, 0, 'blueWins');
      winner = true;
    }

    function swordClang(greenLink, blueLink)
    {
      clangSound.play();
      if (greenFaceUp)
      {
        greenLink.body.velocity.y = 150;
        blueLink.body.velocity.y = -150;
      }
      if (greenFaceRight)
      {
        greenLink.body.velocity.x = -150;
        blueLink.body.velocity.x = 150;
      }
      if (greenFaceDown)
      {
        greenLink.body.velocity.y = -150;
        blueLink.body.velocity.y = 150;
      }
      if (greenFaceLeft)
      {
        greenLink.body.velocity.x = 150;
        blueLink.body.velocity.x = -150;
      }
    }

    function restartGame()
    {
      music.stop();
      greenLink.kill();
      blueLink.kill();
      winner = false;
      game.state.start('Game');
    }

    return {

        create: function () {

          game.physics.startSystem(Phaser.Physics.ARCADE);

          music = game.add.audio('gameMusic');
          music.loopFull(0.8);

          collideSound = game.add.audio('collideSound');
          swingSound = game.add.audio('swingSound');
          hurtSound = game.add.audio('hurtSound');
          winSound = game.add.audio('winSound');
          clangSound = game.add.audio('clangSound');

          map = game.add.tilemap('castle');
          map.addTilesetImage('castleTiles');
          floorLayer = map.createLayer('Floors');
          objectsLayer = map.createLayer('Objects');
          wallLayer = map.createLayer('Walls');
          map.setCollisionBetween(9, 17, true, 'Walls');
          map.setCollisionBetween(26, 27, true, 'Objects');
          map.enableBody = true;
          game.physics.arcade.enable(map);

          greenLink = game.add.sprite(80, 435, 'greenLink');
          greenLink.anchor.setTo(0.5);
          greenLink.animations.add('standRight', ['walkingRight3'], 1, false);
          greenLink.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkingRight', 1, 8), 12, true);
          greenLink.animations.add('standDown', ['walkingDown4'], 1, false);
          greenLink.animations.add('walkDown', Phaser.Animation.generateFrameNames('walkingDown', 1, 12), 12, true);
          greenLink.animations.add('standLeft', ['walkingLeft3'], 1, false);
          greenLink.animations.add('walkLeft', Phaser.Animation.generateFrameNames('walkingLeft', 1, 8), 12, true);
          greenLink.animations.add('standUp', ['walkingUp4'], 1, false);
          greenLink.animations.add('walkUp', Phaser.Animation.generateFrameNames('walkingUp', 1, 12), 12, true);
          greenLink.animations.add('swingRight', Phaser.Animation.generateFrameNames('swingRight', 1, 5), 30, false);
          greenLink.animations.add('swingDown', Phaser.Animation.generateFrameNames('swingDown', 1, 5), 30, false);
          greenLink.animations.add('swingLeft', Phaser.Animation.generateFrameNames('swingLeft', 1, 5), 30, false);
          greenLink.animations.add('swingUp', Phaser.Animation.generateFrameNames('swingUp', 1, 5), 30, false);
          greenLink.animations.add('dead', ['dead'], 1, false);
          greenLink.animations.play('standRight');
          greenFaceRight = true;
          game.physics.arcade.enable(greenLink);
          greenLink.body.bounce.set(1);
          greenLink.body.setSize(20, 25, 11, 8);
          greenLink.body.maxVelocity.x = 150;
          greenLink.body.maxVelocity.y = 150;

          blueLink = game.add.sprite(435, 80, 'blueLink');
          blueLink.anchor.setTo(0.5);
          blueLink.animations.add('standRight', ['walkingRight3'], 1, false);
          blueLink.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkingRight', 1, 8), 12, true);
          blueLink.animations.add('standDown', ['walkingDown4'], 1, false);
          blueLink.animations.add('walkDown', Phaser.Animation.generateFrameNames('walkingDown', 1, 12), 12, true);
          blueLink.animations.add('standLeft', ['walkingLeft3'], 1, false);
          blueLink.animations.add('walkLeft', Phaser.Animation.generateFrameNames('walkingLeft', 1, 8), 12, true);
          blueLink.animations.add('standUp', ['walkingUp4'], 1, false);
          blueLink.animations.add('walkUp', Phaser.Animation.generateFrameNames('walkingUp', 1, 12), 12, true);
          blueLink.animations.add('swingRight', Phaser.Animation.generateFrameNames('swingRight', 1, 5), 30, false);
          blueLink.animations.add('swingDown', Phaser.Animation.generateFrameNames('swingDown', 1, 5), 30, false);
          blueLink.animations.add('swingLeft', Phaser.Animation.generateFrameNames('swingLeft', 1, 5), 30, false);
          blueLink.animations.add('swingUp', Phaser.Animation.generateFrameNames('swingUp', 1, 5), 30, false);
          blueLink.animations.add('dead', ['dead'], 1, false);
          blueLink.animations.play('standLeft');
          blueFaceLeft = true;
          game.physics.arcade.enable(blueLink);
          blueLink.body.bounce.set(1);
          blueLink.body.setSize(20, 25, 11, 8);
          blueLink.body.maxVelocity.x = 150;
          blueLink.body.maxVelocity.y = 150;

          greenVisible = game.add.tween(greenLink).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 1000, 0, false);
          blueVisible = game.add.tween(blueLink).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 1000, 0, false);

          game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.SPACEBAR]);
          w = game.input.keyboard.addKey(Phaser.Keyboard.W);
          a = game.input.keyboard.addKey(Phaser.Keyboard.A);
          s = game.input.keyboard.addKey(Phaser.Keyboard.S);
          d = game.input.keyboard.addKey(Phaser.Keyboard.D);
          f = game.input.keyboard.addKey(Phaser.Keyboard.F);
          up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
          left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
          down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
          right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
          l = game.input.keyboard.addKey(Phaser.Keyboard.L);
          spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },

        update: function () {
          	game.physics.arcade.collide(greenLink, wallLayer, greenCollide);
            game.physics.arcade.collide(greenLink, objectsLayer, greenCollide);
            game.physics.arcade.collide(blueLink, wallLayer, blueCollide);
            game.physics.arcade.collide(blueLink, objectsLayer, blueCollide);

            if(w.isDown && !greenSwinging && !winner)
            {
              greenLink.body.velocity.y = -100;
              greenFaceUp = true;
              greenFaceLeft = false;
              greenFaceDown = false;
              greenFaceRight = false;
              if (!greenWalkingUp && !greenSwinging && !a.isDown && !d.isDown)
              {
                greenLink.animations.play('walkUp');
                greenStanding = false;
                greenWalkingUp = true;
                greenWalkingLeft = false;
                greenWalkingRight = false;
                greenWalkingDown = false;
              }
            }
            if(a.isDown && !greenSwinging && !winner)
            {
              greenLink.body.velocity.x = -100;
              greenFaceUp = false;
              greenFaceLeft = true;
              greenFaceDown = false;
              greenFaceRight = false;
              if (!greenWalkingLeft && !greenSwinging)
              {
                greenLink.animations.play('walkLeft');
                greenStanding = false;
                greenWalkingUp = false;
                greenWalkingLeft = true;
                greenWalkingRight = false;
                greenWalkingDown = false;
              }
            }
            if(s.isDown && !greenSwinging && !winner)
            {
              greenLink.body.velocity.y = 100;
              greenFaceUp = false;
              greenFaceLeft = false;
              greenFaceDown = true;
              greenFaceRight = false;
              if (!greenWalkingDown && !greenSwinging && !a.isDown && !d.isDown)
              {
                greenLink.animations.play('walkDown');
                greenStanding = false;
                greenWalkingUp = false;
                greenWalkingLeft = false;
                greenWalkingRight = false;
                greenWalkingDown = true;
              }
            }
            if(d.isDown && !greenSwinging && !winner)
            {
              greenLink.body.velocity.x = 100;
              greenFaceUp = false;
              greenFaceLeft = false;
              greenFaceDown = false;
              greenFaceRight = true;
              if (!greenWalkingRight && !greenSwinging)
              {
                greenLink.animations.play('walkRight');
                greenStanding = false;
                greenWalkingUp = false;
                greenWalkingLeft = false;
                greenWalkingRight = true;
                greenWalkingDown = false;
              }
            }

            if(((!w.isDown && !s.isDown) || (w.isDown && s.isDown)) && !greenSwinging)
            {
              greenLink.body.velocity.y = 0;
              greenWalkingUp = false;
              greenWalkingDown = false;
            }
            if(((!a.isDown && !d.isDown) || (a.isDown && d.isDown)) && !greenSwinging)
            {
              greenLink.body.velocity.x = 0;
              greenWalkingRight = false;
              greenWalkingLeft = false;
            }

            if(greenLink.body.velocity.x == 0 && greenLink.body.velocity.y == 0)
            {
              if (greenFaceUp && !greenSwinging && !greenStanding && !winner)
              {
                greenLink.animations.play('standUp');
                greenStanding = true;
              }
              else if (greenFaceRight && !greenSwinging && !greenStanding && !winner)
              {
                greenLink.animations.play('standRight');
                greenStanding = true;
              }
              else if (greenFaceDown && !greenSwinging && !greenStanding && !winner)
              {
                greenLink.animations.play('standDown');
                greenStanding = true;
              }
              else if (greenFaceLeft && !greenSwinging && !greenStanding && !winner)
              {
                greenLink.animations.play('standLeft');
                greenStanding = true;
              }
            }

            if(f.isDown && !greenSwinging && !winner && greenLink.alpha < 0.80)
            {
              greenSwing();
              greenLink.animations.currentAnim.onComplete.add(greenSwingComplete, this);
            }





            if(up.isDown && !blueSwinging && !winner)
            {
              blueLink.body.velocity.y = -100;
              blueFaceUp = true;
              blueFaceLeft = false;
              blueFaceDown = false;
              blueFaceRight = false;
              if (!blueWalkingUp && !blueSwinging && !left.isDown && !right.isDown)
              {
                blueLink.animations.play('walkUp');
                blueStanding = false;
                blueWalkingUp = true;
                blueWalkingLeft = false;
                blueWalkingRight = false;
                blueWalkingDown = false;
              }
            }
            if(left.isDown && !blueSwinging && !winner)
            {
              blueLink.body.velocity.x = -100;
              blueFaceUp = false;
              blueFaceLeft = true;
              blueFaceDown = false;
              blueFaceRight = false;
              if (!blueWalkingLeft && !blueSwinging)
              {
                blueLink.animations.play('walkLeft');
                blueStanding = false;
                blueWalkingUp = false;
                blueWalkingLeft = true;
                blueWalkingRight = false;
                blueWalkingDown = false;
              }
            }
            if(down.isDown && !blueSwinging && !winner)
            {
              blueLink.body.velocity.y = 100;
              blueFaceUp = false;
              blueFaceLeft = false;
              blueFaceDown = true;
              blueFaceRight = false;
              if (!blueWalkingDown && !blueSwinging && !left.isDown && !right.isDown)
              {
                blueLink.animations.play('walkDown');
                blueStanding = false;
                blueWalkingUp = false;
                blueWalkingLeft = false;
                blueWalkingRight = false;
                blueWalkingDown = true;
              }
            }
            if(right.isDown && !blueSwinging && !winner)
            {
              blueLink.body.velocity.x = 100;
              blueFaceUp = false;
              blueFaceLeft = false;
              blueFaceDown = false;
              blueFaceRight = true;
              if (!blueWalkingRight && !blueSwinging)
              {
                blueLink.animations.play('walkRight');
                blueStanding = false;
                blueWalkingUp = false;
                blueWalkingLeft = false;
                blueWalkingRight = true;
                blueWalkingDown = false;
              }
            }

            if(((!up.isDown && !down.isDown) || (up.isDown && down.isDown)) && !blueSwinging)
            {
              blueLink.body.velocity.y = 0;
              blueWalkingUp = false;
              blueWalkingDown = false;
            }
            if(((!left.isDown && !right.isDown) || (left.isDown && right.isDown)) && !blueSwinging)
            {
              blueLink.body.velocity.x = 0;
              blueWalkingRight = false;
              blueWalkingLeft = false;
            }

            if(blueLink.body.velocity.x == 0 && blueLink.body.velocity.y == 0)
            {
              if (blueFaceUp && !blueSwinging && !blueStanding && !winner)
              {
                blueLink.animations.play('standUp');
                blueStanding = true;
              }
              else if (blueFaceRight && !blueSwinging && !blueStanding && !winner)
              {
                blueLink.animations.play('standRight');
                blueStanding = true;
              }
              else if (blueFaceDown && !blueSwinging && !blueStanding && !winner)
              {
                blueLink.animations.play('standDown');
                blueStanding = true;
              }
              else if (blueFaceLeft && !blueSwinging && !blueStanding && !winner)
              {
                blueLink.animations.play('standLeft');
                blueStanding = true;
              }
            }

            if(l.isDown && !blueSwinging && !winner && blueLink.alpha < 0.80)
            {
              blueSwing();
              blueLink.animations.currentAnim.onComplete.add(blueSwingComplete, this);
            }

            if(greenSwinging == false && blueSwinging == false)
            {
              game.physics.arcade.collide(greenLink, blueLink, linksCollide);
            }
            else if (greenSwinging == true && blueSwinging == false && !winner)
            {
              game.physics.arcade.collide(greenLink, blueLink, greenWins);
            }
            else if (blueSwinging == true && greenSwinging == false && !winner)
            {
              game.physics.arcade.collide(blueLink, greenLink, blueWins);
            }
            else
            {
              game.physics.arcade.collide(greenLink, blueLink, swordClang);
            }

            if (spacebar.isDown)
            {
              restartGame();
            }
        }
    };
};
