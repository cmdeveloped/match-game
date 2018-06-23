$(document).ready(function() {
  // write your scripts here

  let shuffle = () => {
    // empty cards to reset
    $('.cards').empty();
    // create icons array and sort
    let icons = ['fal fa-plane', 'fal fa-car', 'fal fa-bicycle', 'fal fa-fighter-jet', 'fal fa-rocket', 'fal fa-ship', 'fal fa-plane', 'fal fa-car', 'fal fa-bicycle', 'fal fa-fighter-jet', 'fal fa-rocket', 'fal fa-ship'];
    icons.sort(function() {
      return 0.5 - Math.random();
    });

    // card template set up
    function gameCard(icon) {
      const cardHTML = `
      <div class="game-card">
        <div class="inner">
          <div class="front">
            <i class="fal fa-question-circle"></i>
          </div>
          <div class="back">
            <i class="${icon}"></i>
          </div>
        </div>
      </div>
      `;

      return cardHTML;
    }

    // loop through icons and create card for each
    for ( let icon of icons ) {
      $('.cards').append(gameCard(icon));
    }

    $('.cards').removeClass('load');
    $('.cards').addClass('load');
  }
  // initial shuffle function called
  shuffle();

  // refresh all cards when button is clicked
  $('#refresh').click(function() {
    shuffle();
  });

  // click card and toggle active
  let count = 0;
  const clickedCards = [];
  $(document).on('click', '.game-card', function() {
    let clickedCard = $(this).find('.back i').attr('class');
    $(this).addClass('active');
    clickedCards.push(clickedCard);
    count++;
    if (count === 2) {
      count = 0;
    }
    console.log(clickedCards);
  });
});
