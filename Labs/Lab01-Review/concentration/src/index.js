/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.
*/

// -------------------- Constants --------------------
const IMAGE_PATH = 'Cards/';
const NUMBER_OF_CARDS = 20;
const CHECK_DELAY_MS = 2000;
const CARD_VALUE_INDEX = 4;
const CARD_VALUE_LENGTH = 1;
const TOTAL_PAIRS = NUMBER_OF_CARDS / 2;

// -------------------- Core Logic --------------------
// The gameLogic object handles the rules and state of the game
// It does not interact with the HTML document or CSS styles
const gameLogic = {
    images: Array(NUMBER_OF_CARDS).fill(null),
    firstPick: -1,
    secondPick: -1,
    matches: 0,
    tries: 0,

    // Fills the images array with 10 pairs of card filenames.
    fillImages: function() {
        const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        const suits = ['h', 's'];
        let imageIndex = 0;
        for (const value of values) {
            for (const suit of suits) {
                this.images[imageIndex] = 'card' + value + suit + '.jpg';
                imageIndex++;
            }
        }
    },

    // Shuffles the elements in the images array
    shuffleImages: function() {
        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            let rndIndex = Math.trunc(Math.random() * NUMBER_OF_CARDS);
            let temp = this.images[i];
            this.images[i] = this.images[rndIndex];
            this.images[rndIndex] = temp;
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
        let value1 = this.images[this.firstPick].substr(CARD_VALUE_INDEX, CARD_VALUE_LENGTH);
        let value2 = this.images[this.secondPick].substr(CARD_VALUE_INDEX, CARD_VALUE_LENGTH);
        return value1 === value2;
    }
};

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document
// It strictly modifies visual elements and relies on gameLogic for data
const ui = {
    // Shows the back for all cards
    showAllBacks: function() {
        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            this.showCardBack(i);
        }
    },

    // Returns the HTML element for one card index.
    getCardElement: function(index) {
        return document.getElementById(index);
    },

    // Shows the back of one card based on its index.
    showCardBack: function(index) {
        let card = this.getCardElement(index);
        card.style.backgroundImage = 'url(' + IMAGE_PATH + 'black_back.jpg)';
    },

    // Shows the face of one card based on its index and image path.
    showCardFace: function(index, imageName) {
        let card = this.getCardElement(index);
        card.style.backgroundImage = 'url(' + IMAGE_PATH + imageName + ')';
    },

    // Disable one card based on its index.
    disableCard: function(index) {
        let card = this.getCardElement(index);
        card.onclick = null;
        card.style.cursor = 'default';
    },

    // Disable all cards.
    disableAllCards: function() {
        let cards = document.getElementsByName('card');
        for (const card of cards) {
            card.onclick = null;
            card.style.cursor = 'default';
        }
    },

    // Assigns the clickHandler function to all cards.
    enableAllCards: function(clickHandler) {
        let cards = document.getElementsByName('card');
        for (const card of cards) {
            card.onclick = clickHandler;
            card.style.cursor = 'pointer';
        }
    },

    // Enables only cards that are still on the board.
    enableAllRemainingCards: function(clickHandler) {
        let cards = document.getElementsByName('card');
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].style.backgroundImage !== 'none') {
                cards[i].onclick = clickHandler;
                cards[i].style.cursor = 'pointer';
            }
        }
    },

    // Removes one card from the board by setting its background to none.
    removeCard: function(index) {
        let card = this.getCardElement(index);
        card.style.backgroundImage = 'none';
    },

    // Shows the number of matches and tries in the status element.
    updateScore: function(matches, tries) {
        document.getElementById('status').innerHTML = 'Matches: ' + matches + ' Tries: ' + tries;
    }
};

// -------------------- Main Flow --------------------
// These functions act as the "glue" between the game logic and the UI

// Initializes the page after it's loaded.
function init() {
    gameLogic.fillImages();
    gameLogic.shuffleImages();
    ui.updateScore(gameLogic.matches, gameLogic.tries);
    ui.enableAllCards(handleClick);
    ui.showAllBacks();
}

// This function is called when the user clicks on a card.
// It coordinates between the ui showing the card and logic tracking the pick.
function handleClick() {
    let index = Number(this.id);
    
    // Track the pick in our logic
    gameLogic.pickCard(index);
    
    // Update the UI
    ui.showCardFace(index, gameLogic.images[index]);
    ui.disableCard(index);
    
    // Check if we need to resolve a match
    if (gameLogic.secondPick !== -1) {
        ui.disableAllCards();
        setTimeout(resolveTurn, CHECK_DELAY_MS);
    }
}

// Checks the 2 cards that have been picked for matches.
function resolveTurn() {
    gameLogic.tries++;
    
    if (gameLogic.isMatch()) {
        gameLogic.matches++;
        ui.removeCard(gameLogic.firstPick);
        ui.removeCard(gameLogic.secondPick);
        if (gameLogic.matches < TOTAL_PAIRS) {
            ui.enableAllRemainingCards(handleClick);
        }
    }
    else {
        ui.showCardBack(gameLogic.firstPick);
        ui.showCardBack(gameLogic.secondPick);
        ui.enableAllRemainingCards(handleClick);
    }
    
    ui.updateScore(gameLogic.matches, gameLogic.tries);
    gameLogic.resetPicks();
}

window.onload = init;

