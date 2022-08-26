const gameBoard = (() => { 
    let gameArray = [];
    let renderBoard = () => {
        let field = document.getElementsByClassName("field");
        for (let i = 0; i < field.length; i++) {
            field[i].textContent = gameBoard.gameArray[i];
        };
    }
    const reset = function() {
        gameArray = [];
        renderBoard();
    };
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

const Player = (name, symbol) => {
    return {name, symbol};
};

const player1 = Player('Player 1', 'x')
const player2 = Player('Player 2', 'o')

let currentPlayer = player1;

const togglePlayer = function(currentplayer) {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    }
    else {
        currentPlayer = player1;
    }
};

const checkWin = function(gameBoard) {

};