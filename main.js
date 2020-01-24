/**
 * XO Game - JS 
 * 
 * Author: AGASHE
 * version: 1.00
 * License: nothing it's Free & Open source
 */

let game = {
    status: '',
    player: 'O',
    computer: 'X',
}

let winConditions = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
];

let cols = document.getElementsByClassName('col');
let message = document.getElementById('message');
let restart = document.getElementById('restart');
let playerType = document.getElementById('player');

function init() {
    message.innerHTML = '';
    message.style.display = 'none';
    playerType.innerHTML = 'PLAYER: ' + game.player;
    Array.prototype.forEach.call(cols, col => {
        col.innerHTML = '';
    });
}

function restartGame() {
    game.status = '';
    message.innerHTML = '';
    message.style.display = 'none';
    playerType.innerHTML = 'PLAYER: ' + game.player;
    Array.prototype.forEach.call(cols, col => {
        col.classList.remove('col-select', 'win', 'lose');
        col.innerHTML = '';
    });
}

function computerTurn() {
    let emptyCols = [];
    let selectedCol = '';

    if (game.status != 'thinking') {
        return;
    }

    for (i = 0;i < cols.length;i++) {
        if (cols[i].innerHTML == '') {
            emptyCols.push(i);
        }
    }
    
    selectedCol = Math.floor(Math.random() * emptyCols.length);
    cols[emptyCols[selectedCol]].innerHTML = game.computer;
    cols[emptyCols[selectedCol]].classList.add('col-select');

    // Check game status
    checkWin();

    if (game.status == 'thinking') {
        // Stop thinking
        game.status = '';
    }
}

function checkWin() {
    let tieCount = 0;
    let playerCount = 0;
    let computerCount = 0;
    let winCondition = [];
    let whoWon = '';
    
    for (i = 0;i < winConditions.length;i++) {
        playerCount = 0;
        computerCount = 0;

        for (j = 0;j < winConditions[i].length;j++) {
            if (cols[winConditions[i][j]].innerHTML == game.player) {
                playerCount += 1;
            }

            if (cols[winConditions[i][j]].innerHTML == game.computer) {
                computerCount += 1;
            }
        }

        if (playerCount == 3) {
            game.status = 'win';
            whoWon = 'player';
            winCondition = i;
            break;
        }
    
        if (computerCount == 3) {
            game.status = 'lose';
            whoWon = 'computer';
            winCondition = i;
            break;
        }
    }

    if (whoWon == 'player') {
        for (i = 0;i < winConditions[winCondition].length;i++) {
            cols[winConditions[winCondition][i]].classList.remove('col-select');
            cols[winConditions[winCondition][i]].classList.add('win');
        }

        // Show message
        message.style.display = 'block';
        message.innerHTML = 'YOU WIN';
        message.classList.add('win');
    }
    else if (whoWon == 'computer') {
        for (i = 0;i < winConditions[winCondition].length;i++) {
            cols[winConditions[winCondition][i]].classList.remove('col-select');
            cols[winConditions[winCondition][i]].classList.add('lose');
        }

        // Show message
        message.style.display = 'block';
        message.innerHTML = 'YOU LOSE';
        message.classList.add('lose');
    }
    else {
        // Check tie
        for (i = 0;i < cols.length;i++) {
            if (cols[i].innerHTML != '') {
                tieCount += 1;
            }
        }

        if (tieCount == 9) {
            message.style.display = 'block';
            message.innerHTML = 'TIE';
            message.classList.add('tie');
        } else {
            // Computer thinking :)
            game.status = 'thinking';
            setTimeout(function(){  computerTurn(); }, 500);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    init();

    Array.prototype.forEach.call(cols, col => {
        // Hover effect
        col.addEventListener('mouseover', () => {
            if (col.innerHTML == '' && game.status == '') {
                col.classList.add('col-select');
            }
        });
        col.addEventListener('mouseout', () => {
            if (col.innerHTML == '' && game.status == '') {
                col.classList.remove('col-select');
            }
        });

        // Game handling
        col.addEventListener('click', () => {
            if (col.innerHTML == '' && game.status == '') {
                col.classList.add('col-select');
                col.innerHTML = game.player;

                // Check game status
                checkWin();
            }
        });
    });

    // Change player type
    playerType.addEventListener('click', () => {
        let computerOldType = game.computer;

        // Replace player cols
        for (i = 0;i < cols.length;i++) {
            if (cols[i].innerHTML == game.player) {
                cols[i].innerHTML = '-';
            }
        }

        if (game.player == 'O') {
            game.player = 'X';
            game.computer = 'O';
        } else {
            game.player = 'O';
            game.computer = 'X';
        }

        // Replace computer cols
        for (i = 0;i < cols.length;i++) {
            if (cols[i].innerHTML == computerOldType) {
                cols[i].innerHTML = game.computer;
            }

            if (cols[i].innerHTML == '-') {
                cols[i].innerHTML = game.player;
            }
        }

        // Update the button
        playerType.innerHTML = 'PLAYER: ' + game.player;

        // Restart
        restartGame();
    });

    // Restart
    restart.addEventListener('click', () => {
        restartGame();
    });
}); 