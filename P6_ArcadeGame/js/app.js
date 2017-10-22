// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // x sticked to 0, y is a random number between 1~3, the "stone" rows
    this.x = 0;
    this.y = (1 + Math.floor(Math.random() * 3)) * 74;
    // a value between 0.0~1.0 represents the speed
    this.speed = 50 + Math.random() * 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 1 * this.speed * dt;
    // if enemy goes out of canvas set it back
    if (this.x >= canvas.width) {
      this.x = 0;
    }
    this.checkCollisions(player);
};

Enemy.prototype.checkCollisions = function(player) {
  if (isCollide(this.x, this.y, player.x, player.y)) {
    player.score = 0;
    player.reset();
  }
};

function isCollide(aX, aY, bX, bY) {
  var deltaY = Math.abs(aY - bY);
  var deltaX = Math.abs(aX - bX);
  if (deltaY < 50 && deltaX < 50) {
    return true;
  }
  return false;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.score = 0;
  this.x = (505 - 101) / 2;
  this.y = 5 * 75;
};

Player.prototype.update = function() {
  if (this.x >= 404) {
    this.x = 404;
  }

  if (this.x <= 0) {
    this.x = 0;
  }

  if (this.y >= 375) {
    this.y = 375;
  }

  // reaches the water
  if (this.y <= 40) {
    console.log('reaches water');
    this.score += 10;
    this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.clearRect(0, 0, 505, 40);
  ctx.font = '20pt Impact';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'blue';
  ctx.fillText('SCORE: ' + this.score, 505 / 2, 40);
};

Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case 'left':
      this.x -= 101;
      break;
    case 'up':
      this.y -= 83;
      break;
    case 'right':
      this.x += 101;
      break;
    case 'down':
      this.y += 83;
      break;
  }
  console.log(this);
};

Player.prototype.reset = function() {
  this.x = (505 - 101) / 2;
  this.y = 5 * 75;
  initDiamonds();
  initEnemies();
  console.log(this);
};

// Diamonds for bonus scores
var Diamond = function(color) {
  this.sprite = 'images/char-boy.png';
  switch (color) {
    case 'blue':
      this.sprite = 'images/Gem Blue.png';
      this.score = 15;
      break;
    case 'green':
      this.sprite = 'images/Gem Green.png';
      this.score = 10;
      break;
    case 'orange':
      this.sprite = 'images/Gem Orange.png';
      this.score = 5;
      break;
  }
  this.x = Math.floor(Math.random() * 5) * 101;
  this.y = (1 + Math.floor(Math.random() * 3)) * 74;
  this.ok = true;
};

Diamond.prototype.update = function() {
  this.checkCollisions(player);
};

Diamond.prototype.checkCollisions = function(player) {
  if (this.ok && isCollide(this.x, this.y, player.x, player.y)) {
    player.score += this.score;
    this.ok = false;
  }
};

Diamond.prototype.render = function() {
  console.log(this);
  if (this.ok) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
function initEnemies() {
  allEnemies = [];
  for (var i = 0; i < 6; i++) {
    allEnemies.push(new Enemy());
  }
}
initEnemies();

// Place the player object in a variable called player
var player = new Player();

// Place all diamond objects in an array called allDiamonds
var allDiamonds = [];
function initDiamonds() {
  allDiamonds = [];
  var colors = ['orange', 'blue', 'green', 'green', 'orange'];
  colors.forEach(function(color) {
    allDiamonds.push(new Diamond(color));
  });
}
initDiamonds();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
