/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.

    Written by Brian Bird, 3/29/2026, using GitHub Copilot and based on code from Mari Good.
*/

// -------------------- Constants --------------------
const NUMBER_OF_CARDS = 20;

// -------------------- Main Flow --------------------
// These functions act as the "glue" between the game logic and the UI
// which are defined in sections below.

// Initializes the page after it's loaded.
function init() {
    ui.cacheCardElements();
    gameLogic.fillCards();
    gameLogic.shuffleCards();
    ui.updateScore(gameLogic.matches, gameLogic.tries);
    ui.enableAllCards(handleClick);
    ui.showAllBacks();
}

// This function is called when the user clicks on a card.
// It coordinates between the ui showing the card and game logic tracking the pick.
function handleClick() {
    const CHECK_DELAY_MS = 2000;
    let index = Number(this.id);  // index represets the card location in the cards array and on the page.
    
    // Track the pick in our logic
    gameLogic.pickCard(index);
    
    // Update the UI
    ui.showCardFace(index, gameLogic.cards[index]);
    ui.disableCard(index);
    
    // Check if we need to check for a match and complete the turn
    if (gameLogic.secondPick !== -1) {
        ui.disableAllCards();
        setTimeout(completeTurn, CHECK_DELAY_MS);
    }
}

// Checks the 2 cards that have been picked for matches.
function completeTurn() {
    const TOTAL_PAIRS = NUMBER_OF_CARDS / 2;
    gameLogic.tries++;
    
    if (gameLogic.isMatch()) {
        gameLogic.matches++;
        ui.removeCard(gameLogic.firstPick);
        ui.removeCard(gameLogic.secondPick);
    }
    else {
        ui.showCardBack(gameLogic.firstPick);
        ui.showCardBack(gameLogic.secondPick);
    }

    if (gameLogic.matches < TOTAL_PAIRS) {
        ui.enableAllCards(handleClick, true);
    }
    
    ui.updateScore(gameLogic.matches, gameLogic.tries);
    gameLogic.resetPicks();
}

window.onload = init;

// -------------------- Core Logic --------------------
// The gameLogic object handles the rules and state of the game
// It does not interact with the HTML document or CSS styles

// Card object constructor used in gameLogic object
function Card(value, suit) {
    this.value = value;
    this.suit = suit;
}

const gameLogic = {
    cards: [],
    firstPick: -1,  // index of the first card picked, -1 if no card has been picked yet
    secondPick: -1, // index of the second card picked, -1 if no card has been picked yet
    matches: 0,     // number of matches found so far
    tries: 0,       // number of tries so far

    // Fills the cards array with 10 pairs of card objects.
    fillCards: function() {
        // TODO: fill the cards array with 10 pairs of card objects.  
    },

    // Shuffles the elements in the cards array.
    shuffleCards: function() {
        // TODO: shuffle the cards array randomly.
    },

    // Records a player's card pick
    pickCard: function(index) {
        // TODO: record the player's pick by setting firstPick and secondPick.
    },

    // Resets the picks for the next turn
    resetPicks: function() {
        // TODO: reset firstPick and secondPick to -1 for the next turn.
    },

    // Returns true when both picked cards have the same value.
    isMatch: function() {
        // TOD: return true if the cards at firstPick and secondPick have the same value, false otherwise.
    }
};

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document
// It only modifies visual elements and relies on gameLogic for data
const IMAGE_PATH = 'Cards/';

const ui = {
    cardElements: [],

    // Caches card elements by index for reuse.
    cacheCardElements: function() {
        this.cardElements = [];
        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            this.cardElements.push(document.getElementById(i));
        }
    },

    // Shows the back for all cards
    showAllBacks: function() {
        // TODO: iterate over cardElements and set each background to the back image.
    },

    // Shows the back of one card based on its index.
    showCardBack: function(index) {
        // TODO: set the background of the card at the given index to the back image.
    },

    // Shows the face of one card based on its index and card object.
    showCardFace: function(index, cardObj) {
        // TODO: set the background of the card at the given index to the face image.
    },

    // Disable one card based on its index.
    disableCard: function(index) {
        // TODO: disable the card at the given index.
    },

    // Disable all cards.
    disableAllCards: function() {
       // TODO: iterate over cardElements and disable each card.
    },

    // Assigns the clickHandler function to cards (all cards by default).
    enableAllCards: function(clickHandler, onlyRemaining = false) {
        let cards = this.cardElements;
        for (const card of cards) {
            if (!onlyRemaining || card.style.backgroundImage !== 'none') {
                card.onclick = clickHandler;
                card.style.cursor = 'pointer';
            }
        }
    },

    // Removes one card from the board by setting its background to none.
    removeCard: function(index) {
        // TODO: set the background of the card at the given index to none to remove it from the board.
    },

    // Shows the number of matches and tries in the status element.
    updateScore: function(matches, tries) {
    }
};


