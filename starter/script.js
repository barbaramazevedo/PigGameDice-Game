'use strict';

// Selecting elements for initial
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Creating initial elements
let scores, currentScore, activePlayer, playing;

// Initialization
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

// Iniciar o jogo
init();

//  Função Switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //vai alternar entre o player0 e player1
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Hold function
btnHold.addEventListener('click', function () {
  if (playing) {
    // Adiciona a pontuação atual à pontuação total do jogador ativo
    scores[activePlayer] += currentScore;
    //   Atualiza a interface do usuário com a nova pontuação
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finaliza o jogo
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //Switch to the next player
    } else {
      switchPlayer();
    }
  }
});

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;

    // Check for rolled number 1 on dice
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      //Switch to next player if the dice === 1
    } else {
      switchPlayer();
    }
  }
});

// Restore the game
btnNew.addEventListener('click', init);
