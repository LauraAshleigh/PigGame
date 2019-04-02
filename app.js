/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls 2 dice as many times as they wish. Each result gets added to their ROUND score
- BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their TOTAL score. After that, it's the next player's turn
- If a player rolls a double 6, they lose their TOTAL score
- The first player to reach 100 points (or other desired final score) on TOTAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM1, diceDOM2, gamePlaying, winningScore, input;

diceDOM1 = document.getElementById('dice-one');
diceDOM2 = document.getElementById('dice-two');

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying)
        {
            // 1. Random number
            var dice1 = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;

            // 2. Display the result
            diceDOM1.style.display = 'block';
            diceDOM2.style.display = 'block';
            diceDOM1.src = 'dice-' + dice1 + '.png';
            diceDOM2.src = 'dice-' + dice2 + '.png';

            // 3. Update the round score IF the rolled number was not 1 + lose entire score if double 6 is rolled
            if(dice1 === 6 && dice2 === 6)
                {
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    nextPlayer();
                }
            
            else if(dice1 !== 1 && dice2 !== 1)
                {
                    // Add score
                    roundScore += dice1 + dice2;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
            else
                {
                    // Next player
                    nextPlayer();
                }            
        }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying)
        {
            // 1. Add current score to global score
            scores[activePlayer] += roundScore;

            // 2. Update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            input = document.querySelector('.winning-score').value;
            
            // Undefined, 0, null or "" are COERCED to false
            // Anything else is COERCED to true
            if(input)
                {
                    winningScore = input;   
                }
            else
                {
                    winningScore = 100;
                    document.querySelector('.winning-score').value = '100';
                }

            // Check if player won the game
            if(scores[activePlayer] >= winningScore)
                {
                    // activePlayer wins game
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    diceDOM1.style.display = 'none';
                    diceDOM2.style.display= 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
                    gamePlaying =false;
                }
            else
                {
                    // Next player
                    nextPlayer();
                }
        }
});

function nextPlayer()
{
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Set current score to 0 when a 1 is rolled
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Change background, bold font and red dot to show new player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide dice when new player starts their turn
    diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame()
{
    scores=[0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;    
    diceDOM1.style.display= 'none';
    diceDOM2.style.display= 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';  
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}