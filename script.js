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
        const message = document.querySelector('#message');
        message.textContent = '';
        gameBoard.gameArray = [];
        player1 = Player('Player 1', 'x', false);
        player2 = Player('Player 2', 'o', false);
        togglePlayer();
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

let player1 = Player('Player 1', 'x', false);
let player2 = Player('Player 2', 'o', false);

let currentPlayer = player1;

const togglePlayer = function(currentplayer) {
    const p1div = document.querySelector('#player1');
    const p2div = document.querySelector('#player2');
    if (currentPlayer == player1) {
        currentPlayer = player2;
        p1div.classList.remove('active');
        p2div.classList.add('active');
    }
    else {
        currentPlayer = player1;
        p2div.classList.remove('active');
        p1div.classList.add('active');
    }
    if (gameBoard.gameArray === []) {
        currentPlayer = player1;
        p2div.classList.remove('active');
        p1div.classList.add('active');
    }
};

let checkWin = () => {
    const message = document.querySelector('#message');
    let counter = 0;
    let drawCount = 0;
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
            if (counter === 3) {
                currentPlayer.win = true;
                break;
            }
            
        }
        counter = 0;
    }
    if (currentPlayer.win === true) {
        message.textContent = `${currentPlayer.name} wins!`
        for (let i = 0; i < 9; i++) {
            if (gameBoard.gameArray[i] == undefined) {
                gameBoard.gameArray[i] = '';
            }
        };
    }
    for (let i = 0; i < 9; i++) {
        if (gameBoard.gameArray[i] != undefined) {
            drawCount++
        };
        if (drawCount == 9 && currentPlayer.win == false) {
            message.textContent = 'It\'s a draw!'
        }
    };
};