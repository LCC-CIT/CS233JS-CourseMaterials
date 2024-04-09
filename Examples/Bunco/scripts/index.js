// Written by Brian Bird, 4/9/2024

// create a new game
let bunco = new Game();

/* **************** */
/* For testing only */
/* **************** */

// Test the game by automatically playing with two players
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
    } while (bunco.getRound() > 0);
    console.log(`The winner is ${bunco.getGameWinner().name}`);

}