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

// -------------------- Game State --------------------
const game = {
    images: Array(NUMBER_OF_CARDS).fill(null),
    firstPick: -1,
    secondPick: -1,
    matches: 0,
    tries: 0
};

// -------------------- Initialization --------------------
// Initializes the page after it's loaded.
function init() {
    fillImages();
    shuffleImages();
    showMatches();
    enableAllCards();
    showAllBacks();
}

// Fills the images array with 10 pairs of card filenames.
// Card filenames follow this pattern: cardvs.jpg where
// v is the first character of the value and
// s is the first character of the suit.
// Example: cardjh.jpg is the jack of hearts.
function fillImages() {
    const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    const suits = ['h', 's'];
    let imageIndex = 0;
    for (const value of values) {
        for (const suit of suits) {
            game.images[imageIndex] = 'card' + value + suit + '.jpg';
            imageIndex++;
        }
    }
}

// Shuffles the elements in the images array
function shuffleImages() {
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
        let rndIndex = Math.trunc(Math.random() * NUMBER_OF_CARDS);
        let temp = game.images[i];
        game.images[i] = game.images[rndIndex];
        game.images[rndIndex] = temp;
    }
}

// Shows the back for all cards
function showAllBacks() {
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
        showCardBack(i);
    }
}

// -------------------- Game Flow --------------------
// This function is called when the user clicks on a card.
// It causes the card face to be shown and if it's the second
// card clicked, checks for a match.
function handleClick() {
    let index = Number(this.id);
    showCardFace(index);
    disableCard(index);
    if (game.firstPick === -1) {
        game.firstPick = index;
    }
    else {
        game.secondPick = index;
        disableAllCards();
        setTimeout(checkCards, CHECK_DELAY_MS);
    }
}

// Checks the 2 cards that have been picked for matches.
function checkCards() {
    game.tries++;
    if (isMatch()) {
        game.matches++;
        removeCard(game.firstPick);
        removeCard(game.secondPick);
        if (game.matches < TOTAL_PAIRS) {
            enableAllRemainingCards();
        }
    }
    else {
        showCardBack(game.firstPick);
        showCardBack(game.secondPick);
        enableAllRemainingCards();
    }
    showMatches();
    resetPicks();
}

// -------------------- Helpers --------------------
// Returns the HTML element for one card index.
function getCardElement(index) {
    return document.getElementById(index);
}

// Shows the back of one card based on its index.
function showCardBack(index) {
    let card = getCardElement(index);
    card.style.backgroundImage = 'url(' + IMAGE_PATH + 'black_back.jpg)';
}

// Shows the face of one card based on its index.
function showCardFace(index) {
    let card = getCardElement(index);
    card.style.backgroundImage = 'url(' + IMAGE_PATH + game.images[index] + ')';
}

// Disable one card based on its index.
function disableCard(index) {
    let card = getCardElement(index);
    card.onclick = null;
    card.style.cursor = 'default';
}

// Disable all cards.
function disableAllCards() {
    let cards = document.getElementsByName('card');
    for (const card of cards) {
        card.onclick = null;
        card.style.cursor = 'default';
    }
}

// Assigns the handleClick function to all cards.
function enableAllCards() {
    let cards = document.getElementsByName('card');
    for (const card of cards) {
        card.onclick = handleClick;
        card.style.cursor = 'pointer';
    }
}

// Enables only cards that are still on the board.
function enableAllRemainingCards() {
    let cards = document.getElementsByName('card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].style.backgroundImage !== 'none') {
            cards[i].onclick = handleClick;
            cards[i].style.cursor = 'pointer';
        }
    }
}

function resetPicks() {
    game.firstPick = -1;
    game.secondPick = -1;
}

// Returns true when both picked cards have the same value.
function isMatch() {
    let value1 = game.images[game.firstPick].substr(CARD_VALUE_INDEX, CARD_VALUE_LENGTH);
    let value2 = game.images[game.secondPick].substr(CARD_VALUE_INDEX, CARD_VALUE_LENGTH);
    return value1 === value2;
}

// Removes one card from the board by setting its background to none.
function removeCard(index) {
    let card = getCardElement(index);
    card.style.backgroundImage = 'none';
}

// -------------------- UI --------------------
// Shows the number of matches and tries in the status element.
function showMatches() {
    document.getElementById('status').innerHTML = 'Matches: ' + game.matches + ' Tries: ' + game.tries;
}

window.onload = init;

