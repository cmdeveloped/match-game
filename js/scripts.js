$(document).ready(function() {
  // write your scripts here

  let shuffle = () => {
    // empty cards to reset
    $('.cards').empty();
    // create icons array and sort
    let icons = ['fab fa-accessible-icon', 'far fa-car', 'far fa-bicycle', 'far fa-fighter-jet', 'far fa-rocket', 'far fa-ship', 'fab fa-accessible-icon', 'far fa-car', 'far fa-bicycle', 'far fa-fighter-jet', 'far fa-rocket', 'far fa-ship'];
    icons.sort(function() {
      return 0.5 - Math.random();
    });

    // card template set up
    function gameCard(icon) {
      const cardHTML = `
      <div class="game-card">
        <div class="inner">
          <div class="front">
            <i class="far fa-question-circle"></i>
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
  $(document).on('click', '.game-card', function() {
    $(this).addClass('active');
  });
});
