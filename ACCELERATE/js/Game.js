"use strict";

GameStates.makeGame = function( game, shared ) {

  var music = null;
  var road = null;
  var ambulance = null;
  var speed = null;
  var position = null;
  var distance = null;
  var distanceText = null;
  var tween = null;
  var laneswapping = false

  var cars = null;
  var blueCar = null;
  var redCar = null;
  var greenCar = null;
  var orangeCar = null;
  var yellowCar = null;

  var timer = null;
  var timerEvent = null;

  var up = null;
  var left = null;
  var right = null;
  var down = null;

    function restartGame()
    {
      music.stop();
      laneswapping = false;
      game.state.start('Game');
    }

    function carsCollide(car1, car2)
    {
      car1.body.velocity.y = 0;
      car2.body.velocity.y = 0;
    }

    function loseCollide(ambulance, car)
    {
      restartGame();
      laneswapping = false;
    }

    function laneswapDone()
    {
      laneswapping = false;
      ambulance.angle = 0;
    }

    function spawncar()
    {
      var randomColor = Math.floor(Math.random() * (5 - 1)) + 1;
      var randomLane = 50 + 100 * (Math.floor(Math.random() * 4));
      var randomSpeed = -50 - Math.floor(Math.random() * 200);
      if (randomColor == 1 && !blueCar.alive)
      {
        blueCar.reset(randomLane, -50);
        blueCar.body.velocity.y = randomSpeed;
      }
      if (randomColor == 2 && !redCar.alive)
      {
        redCar.reset(randomLane, -50);
        redCar.body.velocity.y = randomSpeed;
      }
      if (randomColor == 3 && !greenCar.alive)
      {
        greenCar.reset(randomLane, -50);
        greenCar.body.velocity.y = randomSpeed;
      }
      if (randomColor == 4 && !orangeCar.alive)
      {
        orangeCar.reset(randomLane, -50);
        orangeCar.body.velocity.y = randomSpeed;
      }
      if (randomColor == 5 && !yellowCar.alive)
      {
        yellowCar.reset(randomLane, -50);
        yellowCar.body.velocity.y = randomSpeed;
      }
    }

    return {

        create: function () {

          game.physics.startSystem(Phaser.Physics.ARCADE);

          music = game.add.audio('gameMusic');
          music.loopFull(0.8);

          road = game.add.tileSprite(0, 0, 400, 800, 'road');

					ambulance = game.add.sprite(50, 750, 'ambulance');
					ambulance.anchor.setTo(0.5);
					game.physics.arcade.enable(ambulance);
          ambulance.enableBody = true;

          blueCar = game.add.sprite(-100, -100, 'blueCar');
          blueCar.anchor.setTo(0.5);
          game.physics.arcade.enable(blueCar);
          blueCar.enableBody = true;

          redCar = game.add.sprite(-100, -100, 'redCar');
          redCar.anchor.setTo(0.5);
          game.physics.arcade.enable(redCar);
          redCar.enableBody = true;

          greenCar = game.add.sprite(-100, -100, 'greenCar');
          greenCar.anchor.setTo(0.5);
          game.physics.arcade.enable(greenCar);
          greenCar.enableBody = true;

          orangeCar = game.add.sprite(-100, -100, 'orangeCar');
          orangeCar.anchor.setTo(0.5);
          game.physics.arcade.enable(orangeCar);
          orangeCar.enableBody = true;

          yellowCar = game.add.sprite(-100, -100, 'yellowCar');
          yellowCar.anchor.setTo(0.5);
          game.physics.arcade.enable(yellowCar);
          yellowCar.enableBody = true;

          speed = 5;
          position = 50;
          distance = 60000;

          distanceText = game.add.text(50, 40, "Distance: \n 80000", {
            font: "14px Courier",
            fill: "#ff0",
            align: "left"
          });
          distanceText.anchor.setTo(0.5);

          timer = game.time.create();
          timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
          timer.start();

          game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT]);
          up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
          left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
          down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
          right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        },

        update: function () {
          game.physics.arcade.collide(blueCar, redCar, carsCollide);
          game.physics.arcade.collide(blueCar, greenCar, carsCollide);
          game.physics.arcade.collide(blueCar, orangeCar, carsCollide);
          game.physics.arcade.collide(blueCar, yellowCar, carsCollide);
          game.physics.arcade.collide(redCar, greenCar, carsCollide);
          game.physics.arcade.collide(redCar, orangeCar, carsCollide);
          game.physics.arcade.collide(redCar, yellowCar, carsCollide);
          game.physics.arcade.collide(greenCar, orangeCar, carsCollide);
          game.physics.arcade.collide(greenCar, yellowCar, carsCollide);
          game.physics.arcade.collide(orangeCar, yellowCar, carsCollide);

          game.physics.arcade.collide(ambulance, blueCar, loseCollide);
          game.physics.arcade.collide(ambulance, redCar, loseCollide);
          game.physics.arcade.collide(ambulance, greenCar, loseCollide);
          game.physics.arcade.collide(ambulance, orangeCar, loseCollide);
          game.physics.arcade.collide(ambulance, yellowCar, loseCollide);


          if (up.isDown && !down.isDown && speed <= 12)
          {
            speed += 0.05;
          }
          if (down.isDown && !up.isDown && speed >= 0)
          {
            speed -= 0.15;
          }
          if (speed >= 0)
          {
            speed -= 0.01;
          }
          if (!laneswapping)
          {
            if (right.isDown && position != 350)
            {
              laneswapping = true;
              tween = game.add.tween(ambulance).to({ x: position+100 }, 150, Phaser.Easing.Cubic.Out, true);
              ambulance.angle = 5;
              position += 100;
            }
            if (left.isDown && position != 50)
            {
              laneswapping = true;
              tween = game.add.tween(ambulance).to({ x: position-100 }, 150, Phaser.Easing.Cubic.Out, true);
              ambulance.angle = -5;
              position -= 100;
            }
          }
          if(laneswapping)
          {
            tween.onComplete.add(laneswapDone, this);
          }

          var randomNumber = Math.floor(Math.random() * 100);
          if (randomNumber > 95)
          {
            spawncar();
          }

          if (blueCar.alive && blueCar.body.y > 850)
          {
            blueCar.kill();
          }

          if (redCar.alive && redCar.body.y > 850)
          {
            redCar.kill();
          }

          if (greenCar.alive && greenCar.body.y > 850)
          {
            greenCar.kill();
          }

          if (yellowCar.alive && yellowCar.body.y > 850)
          {
            yellowCar.kill();
          }

          if (orangeCar.alive && orangeCar.body.y > 850)
          {
            orangeCar.kill();
          }

          if (distance <= 0)
          {
            restartGame();
          }

          blueCar.y += speed;
          redCar.y += speed;
          greenCar.y += speed;
          yellowCar.y += speed;
          orangeCar.y += speed;
          road.tilePosition.y += speed;
          distance -= speed;

          distanceText.setText("Distance: \n" + Math.floor(distance));
        },

        render: function () {
          if (timer.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 10, 14, "#fff");
          }
          else {
            game.debug.text("Game over", 10, 14, "#fff");
          }
        },

        endTimer: function() {
          restartGame();
          timer.stop()
        },

        formatTime: function(s) {
          var minutes = "0" + Math.floor(s / 60);
          var seconds = "0" + (s - minutes * 60);
          return minutes.substr(-2) + ":" + seconds.substr(-2);
        }
    };
};
