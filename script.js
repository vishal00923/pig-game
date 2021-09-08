'use strict';

/* Selecting All Elements */
const player0Ele = document.querySelector('.player-0');
const player1Ele = document.querySelector('.player-1');
const score0Ele = document.getElementById('score-0');
const score1Ele = document.getElementById('score-1');
const current0Ele = document.getElementById('current-0');
const current1Ele = document.getElementById('current-1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

/* Global variables */
let scores, currentScore, activePlayer, playing;

/* Initializer Function */
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Ele.textContent = 0;
    score1Ele.textContent = 0;
    current0Ele.textContent = 0;
    current1Ele.textContent = 0;

    diceElement.classList.add('hidden');
    player0Ele.classList.remove('player-winner');
    player1Ele.classList.remove('player-winner');
    player0Ele.classList.add('player-active');
    player1Ele.classList.remove('player-active');
};

init();

/* Switching Players */
const switchPlayer = function () {
    document.getElementById(`current-${activePlayer}`).textContent = document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Ele.classList.toggle('player-active');
    player1Ele.classList.toggle('player-active');
};

/* Rolling Dice Functionality */
btnRoll.addEventListener('click', function () {
    if (playing) {
        // generating a Random Number
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `img/dice-${dice}.png`;

        // Check for rolled 1: if true switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

/* Hold button functionality */
btnHold.addEventListener('click', function () {
    if (playing) {
        // Adding current Score to Active Player
        scores[activePlayer] += currentScore;

        // Displaying the Score Globally
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's Score is >= 100
        if (scores[activePlayer] >= 100) {
            // Active player is the Winner
            playing = false;
            diceElement.classList.add('hidden');

            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
        } else {
            // Switch Player
            switchPlayer();
        }
    }
});

/* New Game button functionality */
btnNew.addEventListener('click', init);
