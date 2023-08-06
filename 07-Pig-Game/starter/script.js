'use strict';

// Selecting the highscore elements.
const scoreP0Element = document.querySelector('#score--0');
// An alternate, "faster" way to do it.
const scoreP1Element = document.getElementById('score--1');
// Selecting the current score elements.
const currScoreP0Element = document.getElementById('current--0');
const currScoreP1Element = document.getElementById('current--1');
// Selecting the dice element.
const diceElement = document.querySelector('.dice');
// Selecting the "new game" button
const btnNew = document.querySelector('.btn--new');
// Selecting the "roll" button
const btnRoll = document.querySelector('.btn--roll');
// Selecting the "hold" button
const btnHold = document.querySelector('.btn--hold');
// Selecting the players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Set initial conditions
scoreP0Element.textContent = 0;
scoreP1Element.textContent = 0;
diceElement.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// Initialization function
const initGame = function () {
	// Reseting current and hold scores for both players
	scoreP0Element.textContent = 0;
	scoreP1Element.textContent = 0;
	currScoreP0Element.textContent = 0;
	currScoreP1Element.textContent = 0;
	// Resetting the first player as the active player
	// Removing the active player class from the current player
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.remove('player--active');
	// Removing the player winner class from the current player
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.remove('player--winner');
	// Establishing player 0 as the active player
	activePlayer = 0;
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.add('player--active');
	// Reseting the state variable to true so that the buttons work again
	playing = true;
	// Reseting variables and dice state
	diceElement.classList.add('hidden');
	currentScore = 0;
	scores = [0, 0];
};

// Initialize game
initGame();

// Function to change player
const changePlayer = function () {
	// Reset current player score
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	// Switch to the next player
	activePlayer = activePlayer === 0 ? 1 : 0;
	// Change the focus to the new player. The toggle method will add the class if
	// it isn't present, but remove it if it exist.
	player0.classList.toggle('player--active');
	player1.classList.toggle('player--active');
	// Reset score variable so that the next player starts from 0
	currentScore = 0;
};

// Rolling-dice functionality
btnRoll.addEventListener('click', function () {
	if (playing) {
		// Generate a random number for the dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;
		// Display the dice that corresponds to that random number
		diceElement.classList.remove('hidden');
		diceElement.src = `dice-${dice}.png`;
		// Check for rolled 1:
		if (dice !== 1) {
			// Add score
			currentScore += dice;
			// Change so that the score is added to the current player
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			changePlayer();
		}
	}
});

// Holding score functionality
btnHold.addEventListener('click', function () {
	if (playing) {
		// Add current score to active players score
		scores[activePlayer] += currentScore;
		// Display current hold score and reset current player score to 0
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];
		document.getElementById(`current--${activePlayer}`).textContent = 0;

		// Check if score is >= 100
		if (scores[activePlayer] >= 100) {
			// If true, disable the buttons, hide the dice and finish the game
			playing = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
			diceElement.classList.add('hidden');
		} else {
			// If not, switch player
			changePlayer();
		}
	}
});

// Reset button functionality
btnNew.addEventListener('click', initGame);
