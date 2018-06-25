/*eslint-disable no-unused-vars*/
$(document).ready(function() {
  // write your scripts here

  let shuffle = () => {
    // create icons array and sort
    let icons = [
      {
        slug: 'plane',
        path: './img/plane.svg'
      },
      {
        slug: 'car',
        path: './img/car.svg'
      },
      {
        slug: 'bike',
        path: './img/bicycle.svg'
      },
      {
        slug: 'jet',
        path: './img/fighter-jet.svg'
      },
      {
        slug: 'rocket',
        path: './img/rocket.svg'
      },
      {
        slug: 'ship',
        path: './img/ship.svg'
      },
      {
        slug: 'taxi',
        path: './img/taxi.svg'
      },
      {
        slug: 'train',
        path: './img/train.svg'
      }
    ];
    // create empty array for duplicating icons
    let pairs = [];
    for (let icon of icons) {
      pairs.push(icon);
      pairs.push(icon);
    }
    // sort pairs into random order
    pairs.sort(function() {
      return 0.5 - Math.random();
    });

    // card template set up
    function gameCard(icons) {
      const cardHTML = `
      <div class="game-card">
        <div class="inner">
          <div class="front">
            <img src="./img/question.svg" alt="" />
          </div>
          <div class="back" data-match="${icons.slug}">
            <img src="${icons.path}" alt="" />
          </div>
        </div>
      </div>
      `;

      return cardHTML;
    }

    // loop through icons and create card for each
    for ( let card of pairs ) {
      $('.cards').append(gameCard(card));
    }

    // initial card shuffle animation
    $('.cards').removeClass('load');
    $('.cards').addClass('load');
  }

  // timer function here
  let seconds = 0;
  let minutes = 0;
  let tick = () => {
    seconds++;
    if (seconds > 9) {
      if (seconds % 60 === 0) {
        minutes++;
        seconds = 0;
        $('#minutes').text(minutes);
        $('#seconds').text('0' + seconds);
      } else {
        $('#seconds').text(seconds);
      }
    } else {
      $('#seconds').text('0' + seconds);
    }
  }

  // keep track of moves
  let count = 0;
  let moves = 0;
  let countMoves = () => {
    count++;
    if (count % 2 === 0) {
      moves++;
      // increment moves
      $('#moves, #totalMoves').text(moves);
    }

    // check for rating and hide stars
    if (moves > 12) {
      $('#stars .star:last-child').hide();
    }
    if (moves > 18) {
      $('#stars .star:nth-child(2)').hide();
    }
  }

  // define reset function
  let reset = () => {
    // empty cards to reset
    $('.cards').empty();
    // reset moves count
    count = 0;
    moves = 0;
    $('#moves').text(moves);
    // reset timer
    seconds = 0;
    minutes = 0;
    $('#seconds').text('0' + seconds);
    $('#minutes').text(minutes);
    // reset stars
    $('.star').show();
  }

  // declare globals for timer
  let start = false;
  let setTimer;
  // start timing function
  let startTick = () => {
    if (start === false) {
      // set tick function in motion
      // start start to true once timer has started
      start = true;
      setTimer = setInterval(function() {
        tick();
      }, 1000);
    }
  }

  // refresh all cards when button is clicked
  $('#refresh, #playAgain').click(function() {
    $('#totalRating').empty();
    $('.timer').removeClass('active');
    reset();
    shuffle();

    // if you press refresh it stops the timer
    start = false;
    clearInterval(setTimer);
  });
  // play again button removes modal
  $('#playAgain').click(function() {
    $('.congrats').removeClass('active');
  });


  // create empty array to store clicked active cards
  const clickedCards = [];

  // click card and toggle active
  $(document).on('click', '.game-card:not(.active)', function() {
    // get the name of card
    // push the clicked card's name to the array
    let clickedCard = $(this).find('.back').data('match');
    clickedCards.push(clickedCard);
    // add move
    countMoves();
    // remove any active classes from matched cards
    // add class active to clicked card to reveal image
    $('.game-card.matched').removeClass('active');
    $(this).addClass('active');

    // on game card click, start timer
    startTick();
    // check cards to check for matches and reset array
    if (clickedCards.length === 2) {
      // it's a match
      if (clickedCards[0] === clickedCards[1]) {
        // class wait stops any interuptions as it checks
        $('html').addClass('wait');
        setTimeout(function() {
          $('.game-card.active').addClass('matched');
          $('html').removeClass('wait');
          // if the game has ended conditional
          if ($('.game-card.matched').length === $('.game-card').length) {
            // stop timer when all matches are found
            clearInterval(setTimer);
            // empty from previous game
            $('#totalRating, #totalTime').empty();
            $('#totalTime').text($('#timer').text());
            // get rating from current game
            // set rating for game
            let finalRating = $('.star:visible').length;
            for (let i = 0; i < finalRating; i++) {
              $('#totalRating').append(`<i class="fas fa-star"></i>`);
            }
            // final rating for modal
            switch (finalRating) {
              case 1:
                $('#congratsHeading').text('Womp Womp...');
                break;
              case 2:
                $('#congratsHeading').text('Not Bad!');
                break;
              case 3:
                $('#congratsHeading').text('Congratulations!');
                break;
            }
            // show the modal
            $('.congrats').addClass('active');
          }
        }, 1000);
        // it's not a match
      } else {
        $('html').addClass('wait');
        setTimeout(function() {
          $('.game-card.active').removeClass('active');
          $('html').removeClass('wait');
        }, 1000);
      }
      // set array to empty
      clickedCards.length = 0;
    }
  });

  // initial shuffle function called
  shuffle();
});
