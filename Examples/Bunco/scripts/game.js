// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

// Bunco game class
class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.round = 1;
        this.dice = [];
        this.dice.push(new Die());
        this.dice.push(new Die());
        this.dice.push(new Die());
    }

    // Add a player to the game. Pass in the palyer's name as a string
    addPlayer(name) {
        this.players.push(new Player(name));
    }

    getRound() {

        return this.round;
    }

    nextRound() {
        this.round++;
        // If the round is over 6, the game is over
        if (this.round > 6) {
            this.round = 0;  // this means the game is over
            // the round will be reset to 1 in getGameWinner
        }
        // add round score to the total score
        for (const player of this.players) {
            player.totalScore += player.roundScore;
        }

        // reset all the round scores
        for (const player of this.players) {
            player.roundScore = 0;
        }
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    // The current player rolls the dice
    rollDice() {
        let player = this.getCurrentPlayer();
        player.roll(this.dice);
        let rollScore = player.calculateScore(this.dice, this.round);
        // copy all the scores to be returned at the end of this method
        const scores = {
            rollScore,
            roundScore: player.roundScore,
            totalScore: player.totalScore,
            roundsWon: player.roundsWon
        };

        // If the player's round score is 21 or more, the round is over
        if (player.roundScore >= 21) {
            player.roundsWon++;
            this.nextRound();
        }
        // if the player scored 0, their turn is over
        if (rollScore === 0) {
            this.currentPlayerIndex++;
            if (this.currentPlayerIndex >= this.players.length) {
                this.currentPlayerIndex = 0;
            }
        }
        // rturn an object containing all the scores
        return scores
    }

    // Determine the winner
    getGameWinner() {
        let winner = this.players[0];
        // check for ties
        // fist, find the mody rounds won by any player
        let maxRoundsWon = Math.max(...this.players.map(p => p.roundsWon));
        // Get an array of players who have won the most rounds
        let roundWinners = this.players.filter(p => p.roundsWon === maxRoundsWon); if (roundWinners.length === 1) {
            winner = roundWinners[0];
        }
        else {
            // if there is a tie, the winner is the player with the highest total score
            for (let i = 0; i < roundWinners.length; i++) {
                if (roundWinners[i].totalScore > winner.totalScore) {
                    winner = roundWinners[i];
                }
            }
        }
        return winner;
    }

    startNewGame() {
        this.round = 1;
        this.currentPlayerIndex = 0;
        for (const player of this.players) {
            player.totalScore = 0;
            player.roundScore = 0;
            player.roundsWon = 0;
        }
    }
}