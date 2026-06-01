// Written by Brian Bird, 3/29/2026, using GitHub Copilot and based on code from Mari Good.
// Revised by Brian Bird 4/6/26 

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document
// It only modifies visual elements and relies on gameLogic for data

// -------------------- Constants --------------------
const NUMBER_OF_CARDS = 20;
const IMAGE_PATH = 'Cards/';

// Note: All of the methods are better not converted to arrows. Most of them use this, 
// and arrow functions will not be bound to this from the calling context.

class Ui {
    cardElements = [];

    // Caches card elements by index for reuse.
    cacheCardElements() {
        this.cardElements = [];
        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            this.cardElements.push(document.getElementById(i));
        }
    }

    // Shows the back for all cards
    showAllBacks() {
        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            this.showCardBack(i);
        }
    }

    // Shows the back of one card based on its index.
    showCardBack(index) {
        let card = this.cardElements[index];
        // Converted to a template literal.
        card.style.backgroundImage = `url(${IMAGE_PATH}black_back.jpg)`;
    }

    // Shows the face of one card based on its index and card object.
            // Converted to use destructuring for the value and suit parameters.
    showCardFace(index, { value, suit }) {
        let card = this.cardElements[index];
        // Converted to a template literal.
        card.style.backgroundImage = `url(${IMAGE_PATH}card${value}${suit}.jpg)`;
    }

    // Disable one card based on its index.
    disableCard(index) {
        let card = this.cardElements[index];
        card.onclick = null;
        card.style.cursor = 'default';
    }

    // Disable all cards.
    disableAllCards() {
        let cards = this.cardElements;
        for (const card of cards) {
            card.onclick = null;
            card.style.cursor = 'default';
        }
    }

    // Assigns the clickHandler function to cards (all cards by default).
    enableAllCards(clickHandler, onlyRemaining = false) {
        let cards = this.cardElements;
        for (const card of cards) {
            if (!onlyRemaining || card.style.backgroundImage !== 'none') {
                card.onclick = clickHandler;
                card.style.cursor = 'pointer';
            }
        }
    }

    // Removes one card from the board by setting its background to none.
    removeCard(index) {
        let card = this.cardElements[index];
        card.style.backgroundImage = 'none';
    }

    // Shows the number of matches and tries in the status element.
    updateScore(matches, tries) {
        // Converted to a template literal.
        document.getElementById('status').innerHTML = `Matches: ${matches} Tries: ${tries}`;
    }
};

export { Ui, NUMBER_OF_CARDS };