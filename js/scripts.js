/*eslint-disable no-unused-vars*/
$(document).ready(function() {
  // write your scripts here

  let shuffle = () => {
    // create icons array and sort
    let icons = [
      {
        slug: 'plane',
        class: 'fal fa-plane'
      },
      {
        slug: 'car',
        class: 'fal fa-car'
      },
      {
        slug: 'bike',
        class: 'fal fa-bicycle'
      },
      {
        slug: 'jet',
        class: 'fal fa-fighter-jet'
      },
      {
        slug: 'rocket',
        class: 'fal fa-rocket'
      },
      {
        slug: 'ship',
        class: 'fal fa-ship'
      },
      {
        slug: 'taxi',
        class: 'fal fa-taxi'
      },
      {
        slug: 'train',
        class: 'fal fa-train'
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
            <i class="fal fa-question"></i>
          </div>
          <div class="back" data-match="${icons.slug}">
            <i class="${icons.class}"></i>
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

    $('.cards').removeClass('load');
    $('.cards').addClass('load');
  }

  // initial shuffle function called
  shuffle();

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

    // check for and hide stars
    if (moves > 15) {
      $('#stars .star:last-child').hide();
    }
    if (moves > 25) {
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
    $('.star').show();
  }

  // refresh all cards when button is clicked
  $('#refresh, #playAgain').click(function() {
    reset();
    shuffle();
  });
  $('#playAgain').click(function() {
    $('.congrats').removeClass('active');
  });


  // create empty array to store clicked active cards
  const clickedCards = [];

  // click card and toggle active
  $(document).on('click', '.game-card', function() {
    // get the name of card
    let clickedCard = $(this).find('.back').data('match');
    // push the clicked card's name to the array
    clickedCards.push(clickedCard);
    // add move
    countMoves();
    // remove any active classes from matched cards
    $('.game-card.matched').removeClass('active');
    // add class active to clicked card to reveal image
    $(this).addClass('active');
    // check cards to check for matches and reset array
    if (clickedCards.length === 2) {
      if (clickedCards[0] === clickedCards[1]) {
        $('html').addClass('wait');
        setTimeout(function() {
          $('.game-card.active').addClass('matched');
          $('html').removeClass('wait');
          if ($('.game-card.matched').length === $('.game-card').length) {
            let finalRating = $('.star:visible').length;
            for (let i = 0; i < finalRating; i++) {
              $('#totalRating').append(`<i class="fas fa-star"></i>`);
            }
            $('.congrats').addClass('active');
          }
        }, 1000);
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


});
