// Written by Brian Bird, 3/29/2026, using GitHub Copilot and based on code from Mari Good.
// Revised by Brian Bird 4/6/26 

import {gameLogic} from "./gameLogic.js";
import {ui, NUMBER_OF_CARDS} from "./ui.js";

/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.
*/

// -------------------- Main Flow --------------------
// These functions act as the "glue" between the game logic and the UI
// which are defined in sections below.

// Initializes the page after it's loaded. (Converted to an arrow function.)
const init = () => {
    ui.cacheCardElements();
    gameLogic.fillCards();
    gameLogic.shuffleCards();
    ui.updateScore(gameLogic.matches, gameLogic.tries);
    ui.enableAllCards(handleClick);
    ui.showAllBacks();
};

// This function is called when the user clicks on a card.
// It coordinates between the ui showing the card and game logic tracking the pick.
// Note: This should not be converted to an arrow function because it relies on this.id from the DOM event handler binding. 
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

// Checks the 2 cards that have been picked for matches. (Converted to an arrow function.)
const completeTurn = () => {
    const TOTAL_PAIRS = NUMBER_OF_CARDS / 2;
    // Converted to use destructuring.
    const { firstPick, secondPick } = gameLogic;
    gameLogic.tries++;
    
    if (gameLogic.isMatch()) {
        gameLogic.matches++;
        ui.removeCard(firstPick);
        ui.removeCard(secondPick);
    }
    else {
        ui.showCardBack(firstPick);
        ui.showCardBack(secondPick);
    }

    if (gameLogic.matches < TOTAL_PAIRS) {
        ui.enableAllCards(handleClick, true);
    }
    
    ui.updateScore(gameLogic.matches, gameLogic.tries);
    gameLogic.resetPicks();
};

window.onload = init;

