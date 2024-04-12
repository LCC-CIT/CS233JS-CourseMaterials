// Written by Brian Bird, 4/9/2024

// create a new game
let bunco = new Game();

window.onload = function () {
    // click event handlers
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("roll").addEventListener("click", rollDice);
    // initialize the game UI
    document.getElementById("start").disabled = false;
    document.getElementById("roll").disabled = true;
}

function startGame() {
    bunco.startNewGame();
    document.getElementById("start").disabled = true;
    document.getElementById("roll").disabled = false;
    bunco.addPlayer(document.getElementById("name1").value);
    bunco.addPlayer(document.getElementById("name2").value);
    bunco.startNewGame();
    console.log("Game started");
}

function rollDice() {
    const playerIndex = bunco.currentPlayerIndex;  // get the current player object
    const scores = bunco.rollDice();
    document.getElementById("die1").src = `images/die${bunco.dice[0].value}.png`;
    document.getElementById("die2").src = `images/die${bunco.dice[1].value}.png`;
    document.getElementById("die3").src = `images/die${bunco.dice[2].value}.png`;
    document.getElementById("round").innerText = bunco.round;

    if(playerIndex === 0) {
    document.getElementById("player1").style = "background-color: lightblue";
    document.getElementById("player2").style = "background-color: white";
    document.getElementById("rollScore1").innerText = scores.rollScore;
    document.getElementById("roundScore1").innerText = scores.roundScore;
    document.getElementById("totalScore1").innerText = scores.totalScore;
    document.getElementById("roundsWon1").innerText = scores.roundsWon;
    }
    else if (playerIndex === 1) {
        document.getElementById("player2").style = "background-color: lightblue";
        document.getElementById("player1").style = "background-color: white";
        document.getElementById("rollScore2").innerText = scores.rollScore;
        document.getElementById("roundScore2").innerText = scores.roundScore;
        document.getElementById("totalScore2").innerText = scores.totalScore;
        document.getElementById("roundsWon2").innerText = scores.roundsWon;
    }

}

/* ****************** */
/*  For testing only  */
/* ****************** */

// Test the game by automatically playing with two players.
// Call this function in the console to run through a complete game.
function testGame() {
    bunco.startNewGame();
    bunco.addPlayer("Player 1");
    bunco.addPlayer("Player 2");
    do {
        // A player takes a turn. The game will automatically switch to the next player
        const player = bunco.getCurrentPlayer();
        console.log(`Round ${bunco.round} Player ${player.name}'s turn`);
        const scores = bunco.rollDice();
        console.log(`Player ${player.name} rolled ${bunco.dice[0].value}, ${bunco.dice[1].value}, ${bunco.dice[2].value}, roll score: ${scores.rollScore}`)
        console.log(`player ${player.name}: round score: ${scores.roundScore}, total score: ${scores.totalScore}, rounds won: ${scores.roundsWon}`);
    } while (bunco.round > 0);
    console.log(`The winner is ${bunco.getGameWinner().name}`);

}