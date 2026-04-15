import DiceSet from './DiceSet.js';
import Player from './Player.js';
// Written by Brian Bird, 4/10/2026 using Gemini 3.1 in Antigravity.

// This class represents the overall game state and logic. 
export default class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        
        this.diceSet = new DiceSet();
        
        this.isGameOver = false;

        // Initialize turn-specific state properties
        this.resetTurnState();
    }

    startNewGame(playerNames) {
        this.players = [];
        for (const name of playerNames) {
            this.players.push(new Player(name));
        }
        
        this.currentPlayerIndex = 0;
        this.isGameOver = false;
        this.resetTurnState();
    }

    resetTurnState() {
        this.rollsLeft = 3;
        this.diceSet.reset();
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    rollDice() {
        if (this.rollsLeft > 0) {
            this.diceSet.rollAll();
            this.rollsLeft--;
        }
    }

    // Helper methods to abstract end-of-turn game states away from the UI
    isTurnOver() {
        return this.rollsLeft === 0;
    }

    hasBusted() {
        // Instead of evaluating their currently selected score (which might be 0 just because they haven't clicked yet),
        // we check if their physical board has the POTENTIAL to score. If not, they've definitively busted.
        return this.isTurnOver() && !this.diceSet.canPotentiallyQualify();
    }

    endTurn() {
        // Save score for current player via its setter to respect encapsulation.
        const currentPlayer = this.getCurrentPlayer();
        currentPlayer.setScore(this.diceSet.getCurrentCargoScore());

        // Advance to next player or end game
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.isGameOver = true;
        } else {
            this.resetTurnState();
        }
    }

    getWinners() {
        if (!this.isGameOver) return [];
        
        let maxScore = -1;
        let winners = [];

        // Loop through all players to find the highest score. 
        // We push to an array instead of just saving one player because ties are possible
        // and we want to return all players who share the top score.
        for (const player of this.players) {
            if (player.score > maxScore) {
                maxScore = player.score;
                winners = [player];
            } else if (player.score === maxScore) {
                winners.push(player);
            }
        }
        return winners;
    }
}
