// Written by Brian Bird, 3/29/2026, using GitHub Copilot and based on code from Mari Good.
// Revised by Brian Bird 4/6/26 

import { NUMBER_OF_CARDS } from "./ui.js";

// -------------------- Core Logic --------------------
// The gameLogic object handles the rules and state of the game
// It does not interact with the HTML document or CSS styles

// Card object constructor used in gameLogic object
function Card(value, suit) {
    this.value = value;
    this.suit = suit;
}

// Note: The methods in gameLogic should not be converted to arrows. Most of them use this, 
// and arrow functions will not be bound to this from the calling context.

export const gameLogic = {
    cards: [],
    firstPick: -1,  // index of the first card picked, -1 if no card has been picked yet
    secondPick: -1, // index of the second card picked, -1 if no card has been picked yet
    matches: 0,     // number of matches found so far
    tries: 0,       // number of tries so far

    // Fills the cards array with 10 pairs of card objects.
    fillCards: function() {
        const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        const suits = ['h', 's'];

        this.cards = [];
        for (const value of values) {
            for (const suit of suits) {
                this.cards.push(new Card(value, suit));
            }
        }
    },

    // Shuffles the elements in the cards array.
    shuffleCards: function() {
        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            let rndIndex = Math.trunc(Math.random() * NUMBER_OF_CARDS);
            let temp = this.cards[i];
            this.cards[i] = this.cards[rndIndex];
            this.cards[rndIndex] = temp;
        }
    },

    // Records a player's card pick
    pickCard: function(index) {
        if (this.firstPick === -1) {
            this.firstPick = index;
        } else {
            this.secondPick = index;
        }
    },

    // Resets the picks for the next turn
    resetPicks: function() {
        this.firstPick = -1;
        this.secondPick = -1;
    },

    // Returns true when both picked cards have the same value.
    isMatch: function() {
        // Converted to use destructuring.
        let { value: value1 } = this.cards[this.firstPick];
        let { value: value2 } = this.cards[this.secondPick];
        return value1 === value2;
    }
};