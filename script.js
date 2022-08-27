const gameBoard = (() => { 
    let gameArray = [];
    let renderBoard = () => {
        let field = document.getElementsByClassName("field");
        for (let i = 0; i < field.length; i++) {
            field[i].textContent = gameBoard.gameArray[i];
        };
    }
    let button = document.querySelector('#reset');
    const reset = () => {
        gameBoard.gameArray = [];
        currentPlayer = player1;
        renderBoard();
    };
    button.addEventListener('click', reset, false);
    return {gameArray, renderBoard, reset};
})();

const gamePlay = (() => { 
    const clickEvents = () => {
        let field = document.getElementsByClassName("field");
        let getIndex = function () {
            let index = this.getAttribute("data-index");
            if (gameBoard.gameArray[index] == undefined) {
                gameBoard.gameArray[index] = currentPlayer.symbol;
                gameBoard.renderBoard();
                checkWin();
                togglePlayer();
            }
        };
        for (let i = 0; i < field.length; i++) {
            field[i].addEventListener('click', getIndex, false);
        }
    }
    return {clickEvents};
})();

let clickEvents = gamePlay.clickEvents();

const Player = (name, symbol, win) => {
    return {name, symbol, win};
};

const player1 = Player('Player 1', 'x', false)
const player2 = Player('Player 2', 'o', false)

let currentPlayer = player1;

const togglePlayer = function(currentplayer) {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    }
    else {
        currentPlayer = player1;
    }
};

const checkWin = function() {
    let counter = 0;
    const combos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ];
    for (let i=0; i<combos.length; i++) {
        for (let j=0; j<3; j++) {
            if (gameBoard.gameArray[combos[i][j]] == currentPlayer.symbol) {
                counter++;
            }
            if (counter == 3) {
                currentPlayer.win = true;
            }
        }
    }
    if (currentPlayer.win == true) {
        alert(currentPlayer.name);
    }
};