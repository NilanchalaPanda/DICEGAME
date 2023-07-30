'use strict';

// Selecting Elements : 
// let finalscore1 = document.querySelector('#score--0');
// let finalscore2 = document.querySelector('#score--1');
let currentScorePlayer1 = document.querySelector('#current--0');
let currentScorePlayer2 = document.querySelector('#current--1');
let diceEl = document.querySelector('.dice');
const reset = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// Starting Conditions : 
// finalscore1.textContent = 0;
// finalscore2.textContent = 0;
currentScorePlayer2 = 0;
diceEl.classList.add('hidden');


//INITIAL STATES : 
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
}

const gameReset = function () {
    diceEl.classList.add('hidden');
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    currentScore = 0;
    // activePlayer = 0;
}

// Rolling DICE functionality :
rollDice.addEventListener('click',
    function () {
        if (playing) {
            //1) Generate a RONDOM dice and gets is corresponding value.
            let randomDiceRoll = Math.trunc(Math.random() * 6 + 1);

            //2) Display DICE roll.
            // console.log(randomDiceRoll);
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${randomDiceRoll}.png`;

            //3) If EQUAL TO 1: Switch Player and make finalScore to zero.
            if (randomDiceRoll !== 1) {
                //Add the dice to current score.
                currentScore += randomDiceRoll;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                // console.log(document.getElementById(`current--${activePlayer}`).textContent);
            }
            else {
                //Switch the Player.
                switchPlayer();
            }
        }
    });


// HOLD FUNCTONLITY : 
hold.addEventListener('click',
    function () {
        if (playing) {
            //1) Add current score to active plaer's score : 
            scores[activePlayer] += currentScore;
            //score[1] = score[1] + currentScore;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            // console.log(scores[0] + '   ' + scores[1]);


            // 2) Check if the Player has scored 100+ points, if yes he/she is the winner: 
            if (scores[activePlayer] >= 100) {
                //Finish the game : 
                diceEl.classList.add('hidden');
                playing = false;
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            }
            else {
                // Switch to the next Player :
                switchPlayer();
            }
        }
    });


// NEW GAME FUNCTIONALITY : 
reset.addEventListener('click',
    function () {
        player1.classList.remove('player--winner');
        player2.classList.remove('player--winner');
        player1.classList.add('player--active');
        player2.classList.remove('player--active');
        gameReset();
        activePlayer = 0;
        scores = [0, 0];
        console.log(scores[0] + '   ' + scores[1]);
        playing = true;
    });
