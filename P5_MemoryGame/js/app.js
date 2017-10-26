/*
 * Create a list that holds all of your cards
 */

HTMLcardListItem = '<li class="card"><i class="%data%"></i></li>';

// Game class represents all the related data for the game.
var Game = function() {
  this.cards = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-anchor',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-diamond',
    'fa fa-bomb',
    'fa fa-leaf',
    'fa fa-bomb',
    'fa fa-bolt',
    'fa fa-bicycle',
    'fa fa-paper-plane-o',
    'fa fa-cube',
  ];
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
Game.prototype.displayCards = function() {
  this.moves = 0;
  this.timer = 0;
  this.stars = 3;
  this.opens = [];
  this.timestamp = new Date().getTime();
  this.cards = shuffle(this.cards);
  $('.deck').empty();
  this.cards.forEach(function(card) {
    $('.deck').append(HTMLcardListItem.replace('%data%', card));
  });
  this.setupClickListener();
};

Game.prototype.displayMoves = function() {
  $('.moves').html(this.moves);
};

Game.prototype.displayStars = function() {
  $('.stars').empty();
  for (var i = 0; i < this.stars; i++) {
    $('.stars').append('<li><i class="fa fa-star"></i></li');
  }
  $('.stars-count').html(this.stars);
};

Game.prototype.displaySeconds = function() {
  var now = new Date().getTime();
  var duration = Math.round((now - this.timestamp) / 1000);
  $('.seconds').html(duration);
};

Game.prototype.displayTimer = function() {
  this.timer++;
  $('.timer').html(this.timer);
  var self = this;
  setTimeout(function() {
    self.displayTimer();
  }, 1000);
};

Game.prototype.toggleSuccessMessage = function(ok, slow) {
  if (ok) {
    if (slow) {
      $('.success').show("slow");
    } else {
      $('.success').show();
    }
    this.displayMoves();
    this.displayStars();
    this.displaySeconds();
  } else {
    if (slow) {
      $('.success').hide("slow");
    } else {
      $('.success').hide();
    }
  }
};

Game.prototype.toggleGameBoard = function(ok, slow) {
  if (ok) {
    if (slow) {
      $('header, section, .deck').show('slow');
    } else {
      $('header, section, .deck').show();
    }
  } else {
    if (slow) {
      $('header, section, .deck').hide('slow');
    } else {
      $('header, section, .deck').hide();
    }
  }
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
Game.prototype.setupClickListener = function() {
  var self = this;
  $('.card').click(function(evt) {
    self.move($(this));
    self.flipCard($(this));
    self.addToOpens($(this));
    self.checkMatch();
    if (self.isWin()) {
      self.toggleGameBoard(false, true);
      self.toggleSuccessMessage(true, false);
    }
  });
  $('.play').click(function(evt) {
    self.toggleSuccessMessage(false, false);
    self.displayCards();
    self.toggleGameBoard(true, true);
    self.displayMoves();
    self.displayStars();
  });
  $('.restart').click(function(evt) {
    self.displayCards();
    self.displayMoves();
    self.displayStars();
  });
};

Game.prototype.move = function(current) {
  if (!current.hasClass('match') && !current.hasClass('open')) {
    this.moves++;
  }
  this.displayMoves();
  // finished within 16 moves: 3 stars
  // finished within 32 moves: 2 stars
  // finished within 48 moves: 1 star
  if (this.moves === 17 || this.moves === 33 || this.moves == 49) {
    this.stars--;
    this.displayStars();
  }
  console.log('width', current.width());
};

Game.prototype.flipCard = function(current) {
  current.addClass('open').addClass('show');
};

Game.prototype.addToOpens = function(current) {
  // deal with double clicking on the same card
  if (this.opens.length > 0 && this.opens[this.opens.length-1].is(current)) {
    return;
  }

  if (!current.hasClass('match')) {
    this.opens.push(current);
  }
};

// display a jelly-like animation when two cards match or mismatch
Game.prototype.jelly = function(element, isMatch) {
  var width = element.width();
  var height = element.height();
  var milli = isMatch ? 100 : 50;
  element.animate({'width': width + 10, 'height': height - 10}, milli);
  element.animate({'width': width - 10, 'height': height + 10}, milli);
  element.animate({'width': width + 5, 'height': height - 5}, milli);
  element.animate({'width': width - 5, 'height': height + 5}, milli);
  element.animate({'width': width, 'height': height}, milli);
};

Game.prototype.checkMatch = function() {
  if (this.opens.length > 1) {
    var cardOne = this.opens[0];
    var cardTwo = this.opens[1];
    if (cardOne.children().attr('class') === cardTwo.children().attr('class')) {
      cardOne.removeClass('open').removeClass('show');
      cardTwo.removeClass('open').removeClass('show');
      cardOne.addClass('match');
      cardTwo.addClass('match');
      this.jelly(cardOne, true);
      this.jelly(cardTwo, true);
    } else {
      cardOne.addClass('mismatch');
      cardTwo.addClass('mismatch');
      this.jelly(cardOne, false);
      this.jelly(cardTwo, false);
      setTimeout(function() {
        console.log('timeout');
        cardOne.removeClass('open').removeClass('show').removeClass('mismatch');
        cardTwo.removeClass('open').removeClass('show').removeClass('mismatch');
      }, 500);
    }
    this.opens = [];
  }
};

Game.prototype.isWin = function() {
  return $('.match').length === $('.card').length;
};

function gameInit() {
  var game = new Game();
  game.displayCards();
  game.displayMoves();
  game.displayStars();
  game.displayTimer();
  game.toggleSuccessMessage(false, false);
}

gameInit();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
