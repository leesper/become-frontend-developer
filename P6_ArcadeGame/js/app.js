// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // x sticked to 0, y is a random number between 1~3, the "stone" rows
    this.x = 0;
    this.y = 1 + Math.floor(Math.random() * 3);
    // a value between 0.0~1.0 represents the speed
    this.speed = Math.random();
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

Enemy.prototype.height = function() {
  return Resources.get(this.sprite).height;
};

Enemy.prototype.width = function() {
  return Resources.get(this.sprite).width;
};

Enemy.prototype.checkCollisions = function(player) {
  var deltaY = Math.abs(this.y - player.y);
  var deltaX = Math.abs(this.x - player.x);
  if (deltaY < this.height() && deltaX < this.width()) {
    console.log('bug collision');
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.reset();
};

Player.prototype.update = function() {
  if (this.x >= canvas.width) {
    this.x = canvas.width - this.width();
  }

  if (this.x <= 0) {
    this.x = 0;
  }

  if (this.y >= canvas.height) {
    this.y = canvas.height - this.height();
  }

  if (this.y <= 0) {
    this.y = 0;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case 'left':
      this.x -= this.width();
      break;
    case 'up':
      this.y -= this.height();
      break;
    case 'right':
      this.x += this.width();
      break;
    case 'down':
      this.y += this.height();
      break;
  }
};

Player.prototype.height = function() {
  return Resources.get(this.sprite).height;
};

Player.prototype.width = function() {
  return Resources.get(this.sprite).width;
};

Player.prototype.reset = function() {
  this.x = canvas.width / 2;
  this.y = canvas.height - 40;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 10; i++) {
  allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
var player = new Player();

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
