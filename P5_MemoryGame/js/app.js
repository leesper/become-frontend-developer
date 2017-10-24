/*
 * Create a list that holds all of your cards
 */
 var cards = [
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

HTMLcardListItem = '<li class="card"><i class="%data%"></i></li>';

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards() {
   // clear all previous cards
   cards = shuffle(cards);
   $('.deck').empty();
   cards.forEach(function(card) {
     $('.deck').append(HTMLcardListItem.replace('%data%', card));
   });
   counter = 0;
   opens = [];
   $('.moves').html(counter);
   for (var i = $('.stars').children().length; i < 3; i++) {
     $('.stars').append('<li><i class="fa fa-star"></i></li');
   }
   $('.success').hide();
   setupClickListener();
 }
 displayCards();

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
 var counter = 0;
 function setupClickListener() {
   $('.card').click(function(evt) {
     console.log('clicked', evt)
     dealWithStarsAndCounter($(this));
     displaySymbol($(this));
     addToOpens($(this));
     if (opens.length >= 2) {
       checkMatch();
     }
     if ($('.match').length === $('.card').length) {
       displayMessage();
     }
   });
   $('.play').click(function(evt) {
     console.log('clicked', evt)
     $('header, section, .deck').show('slow');
     displayCards();
   });
   $('.restart').click(function(evt) {
     displayCards();
   });
 }

function displaySymbol(current) {
  current.addClass('open').addClass('show');
}

var opens = [];
function addToOpens(current) {
  if (opens.length > 0 && opens[opens.length-1].is(current)) {
    return;
  }

  if (!current.hasClass('match')) {
    opens.push(current);
  }
  console.log(opens);
}

function checkMatch() {
  var cardOne = opens[0];
  cardOne.removeClass('open').removeClass('show');
  var cardTwo = opens[1];
  cardTwo.removeClass('open').removeClass('show');
  if (cardOne.children().attr('class') === cardTwo.children().attr('class')) {
    cardOne.addClass('match');
    cardTwo.addClass('match');
  }
  opens = [];
}

function dealWithStarsAndCounter(current) {
  if (!current.hasClass('match') && !current.hasClass('open')) {
    counter++;
  }
  $('.moves').html(counter);
  if (counter === 10 || counter === 20) {
    $('.stars li:last').remove();
  }
}

function displayMessage() {
  console.log('YOU WIN!');
  $('header, section, .deck').hide('slow');
  $('.success').show();
  $('.stars-count').html($('.stars').children().length);
}
