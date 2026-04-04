/*  Overview
    Domino Drop presents a grid of face-down dominos and one visible target domino.
    Click a face-down domino to reveal it. If its total pips are strictly greater
    than the target total, it is removed. After more than half of the dominos
    have been cleared, each successful removal also reduces the target total by 1.
    (If the target is 9, the new target becomes 8.) Otherwise,
    the domino flips back down. The first time a specific too-low domino is clicked,
    no life is lost. Clicking that same too-low domino again loses a life.

    Written by Brian Bird, 3/29/2026, using GitHub Copilot, revised by Brian Bird 4/3/26
*/

// -------------------- Constants --------------------
const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 5;
const HALF_CLEARED_COUNT = NUMBER_OF_DOMINOS / 2;

// -------------------- Main Flow --------------------
/**
 * Initializes the game by setting up the DOM elements, generating and shuffling dominos,
 * rendering the UI, and enabling interactions.
 * @returns {void}
 */
function init() {
    ui.cacheDominoElements();  // Get references to domino elements, store in ui object
    gameLogic.fillDominos();   // Fill the dominos array with domino objects
    gameLogic.shuffleGridDominos();   // Randomly shuffle the dominos array
    ui.showAllBacks();   // Hide the dominos by setting each domino div to an opaque style
    ui.updateTarget(gameLogic.dominos[gameLogic.currentTargetIndex]);  // Show the target domino
    ui.updateStatus(gameLogic.lives, gameLogic.removedCount);  // Show the game stats
    ui.enableAllDominos(handleClick);  // Make all dominos clickable
}

/**
 * Event handler for when a user clicks on a grid domino.
 * Reveals the selected domino and schedules the logic check after a short delay.
 * @returns {void}
 */
function handleClick() {
    const CHECK_DELAY_MS = 1500;
    const index = Number(this.id);

    gameLogic.pickDomino(index);
    ui.showGridDominoFace(index, gameLogic.dominos[index]);
    ui.disableDomino(index);
    ui.disableAllDominos();
    setTimeout(resolvePick, CHECK_DELAY_MS);
}

/**
 * Checks the player's picked domino against the target domino, applying game rules
 * for reducing the target, losing lives, and updating the UI accordingly.
 * @returns {void}
 */
function resolvePick() {
    const pickIndex = gameLogic.currentPick;

    if (pickIndex === -1) {
        return;
    }

    if (gameLogic.isHigherThanTarget()) {
        const didReduceTarget = gameLogic.acceptPick();
        ui.removeDomino(pickIndex);
        ui.updateTarget(gameLogic.dominos[gameLogic.currentTargetIndex]);
        if (didReduceTarget) {
            ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Great! Target reduced by 1.');
        }
        else {
            ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Great! Domino removed.');
        }
    }
    else {
        const lostLife = gameLogic.rejectPick();
        ui.showDominoBack(pickIndex);

        if (lostLife) {
            ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Too low again. Life lost.');
        }
        else {
            ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Too low. First warning, no life lost.');
        }
    }

    const hasWon = gameLogic.hasClearedBoard();
    const hasLost = gameLogic.isOutOfLives();

    if (hasWon) {
        ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'You win! Board cleared.');
        ui.disableAllDominos();
    }
    else if (hasLost) {
        ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Game over. No lives left.');
        ui.disableAllDominos();
    }
    else {
        ui.enableAllDominos(handleClick, true);
    }

    gameLogic.resetPick();
}

window.onload = init;

// -------------------- Core Logic --------------------
/**
 * Constructor for creating a domino object.
 * @param {number} leftPips - The number of pip dots on the left.
 * @param {number} rightPips - The number of pip dots on the right.
 * @returns {void}
 */
function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;
}

const gameLogic = {
    dominos: [],   // array that will hold all the dominos in the grid
    currentTargetIndex: NUMBER_OF_DOMINOS,   // The target domino is always at this index.
    currentPick: -1,  // Index of the domino picked, -1 when none picked.
    removedCount: 0,  // Number of dominos removed (wins)
    lives: STARTING_LIVES,  
    failedPickHistory: {},

    /**
     * Initializes the dominos array with a set of dominos and one target domino.
     * @returns {void}
     */
    fillDominos: function () {
        // TODO: fill the dominos array with domino objects and 
        // put the target domino at the currentTargetIndex.
    },

    /**
     * Randomly scrambles the order of the dominos in the array.
     * @returns {void}
     */
    shuffleGridDominos: function () {
        // TODO: shuffle the array of dominos randomly.
    },

    /**
     * Records the user's currently selected domino by index.
     * @param {number} index - The index of the selected domino in the array.
     * @returns {void}
     */
    pickDomino: function (index) {
        // TODO: record the player's pick by setting currentPick.
    },

    /**
     * Calculates the total sum of pips for a given domino.
     * @param {Object} domino - The domino object.
     * @returns {number} The sum of its left and right pips.
     */
    getTotalPips: function (domino) {
        return domino.leftPips + domino.rightPips;
    },

    /**
     * Determines whether the currently picked domino's value is higher
     * than the target domino's value.
     * @returns {boolean} True if the picked domino is higher than target, false otherwise.
     */
    isHigherThanTarget: function () {
        // TODO: return true when the picked domino total is greater than the target total.
    },

    /**
     * Processes a valid choice, tracks progression, and occasionally reduces the ongoing target.
     * @returns {boolean} True if the target was reduced, false if it remained the same.
     */
    acceptPick: function () {
        this.removedCount++;

        if (this.removedCount > HALF_CLEARED_COUNT) {
            const targetTotal = this.getTotalPips(this.dominos[this.currentTargetIndex]);
            const reducedTargetTotal = Math.max(0, targetTotal - 1);
            const reducedLeft = Math.min(6, reducedTargetTotal);
            const reducedRight = reducedTargetTotal - reducedLeft;

            this.dominos[this.currentTargetIndex] = new Domino(reducedLeft, reducedRight);
            return true;
        }

        return false;
    },

    /**
     * Processes an invalid choice, managing the warning state of each incorrect pick,
     * and deducting consecutive error penalties (lives).
     * @returns {boolean} True if the player lost a life from this mistake, false otherwise.
     */
    rejectPick: function () {
        const pickIndex = this.currentPick;
        const hasFailedBefore = this.failedPickHistory[pickIndex] === true;

        if (hasFailedBefore) {
            this.lives--;
            return true;
        }

        this.failedPickHistory[pickIndex] = true;
        return false;
    },

    /**
     * Checks if all necessary game dominos have been successfully cleared.
     * @returns {boolean} True if board is cleared, false otherwise.
     */
    hasClearedBoard: function () {
        return this.removedCount === NUMBER_OF_DOMINOS;
    },

    /**
     * Checks if the player has lost all their available lives.
     * @returns {boolean} True if out of lives, false otherwise.
     */
    isOutOfLives: function () {
        return this.lives <= 0;
    },

    /**
     * Resets the player's tracked pick for the upcoming turn round.
     * @returns {void}
     */
    resetPick: function () {
        // TODO: reset currentPick to -1 for the next turn.
    }
};

// -------------------- UI --------------------
const ui = {
    dominoElements: [],
    targetElement: null,
    statusElement: null,

    /**
     * Finds and stores references to key UI elements like dominos, target element, and status.
     * @returns {void}
     */
    cacheDominoElements: function () {
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
            this.dominoElements.push(document.getElementById(i));
        }

        this.targetElement = document.getElementById('target-domino');
        this.statusElement = document.getElementById('status');
    },

    /**
     * Formats the domino object into a string visualization.
     * @param {Object} domino - The domino object.
     * @returns {string} The text format showing both side pips, separated by |.
     */
    formatDominoText: function (domino) {
        return domino.leftPips + ' | ' + domino.rightPips;
    },

    /**
     * Iterates over dominoElements and shows their back faces.
     * @returns {void}
     */
    showAllBacks: function () {
        // TODO: iterate over dominoElements and show the back for each domino.
    },

    /**
     * Restores a specific domino to show its backside (face down).
     * @param {number} index - The dominos array index indicating the element to process.
     * @returns {void}
     */
    showDominoBack: function (index) {
        // TODO: show the back of the domino at the given index by
        // removing the "removed" style and adding the "back" style.
    },

    /**
     * Unveils the face (pips) of a specific domino block.
     * @param {number} index - The dominos array index mapping to its element.
     * @param {Object} dominoObj - The relevant domino's data holding pips.
     * @returns {void}
     */
    showGridDominoFace: function (index, dominoObj) {
        // TODO: show the face of the domino at the given index by
        // putting the values in the div element and removing the "back" and "removed" styles.
    },

    /**
     * Refreshes the display text of the master target domino.
     * @param {Object} dominoObj - The current target domino object containing the pips.
     * @returns {void}
     */
    updateTarget: function (dominoObj) {
        this.targetElement.textContent = this.formatDominoText(dominoObj);
    },

    /**
     * Restricts interactivity and click behavior on a particular domino UI component.
     * @param {number} index - The specific array index mapping to the domino element.
     * @returns {void}
     */
    disableDomino: function (index) {
        // TODO: disable the domino at the given index by removing
        // it's click event handler and setting the cursor style to "default".
    },

    /**
     * Iterates through domino elements, globally locking their interactions (clicks).
     * @returns {void}
     */
    disableAllDominos: function () {
        // TODO: iterate over dominoElements and disable each domino.
    },

    /**
     * Reactivates clicking and interactions for various DOM domino elements based on their status.
     * @param {Function} clickHandler - The function event attached onto onclick callbacks.
     * @param {boolean} onlyRemaining - If false, all elements activate; otherwise only non-removed elements are re-enabled. Defaults to false.
     * @returns {void}
     */
    enableAllDominos: function (clickHandler, onlyRemaining = false) {
        for (const domino of this.dominoElements) {
            const isRemoved = domino.classList.contains('removed');
            if (!onlyRemaining || !isRemoved) {
                domino.onclick = clickHandler;
                domino.style.cursor = 'pointer';
            }
        }
    },

    /**
     * Hides and disables a correctly selected grid domino element completely.
     * @param {number} index - The element's index corresponding to its placement on the board.
     * @returns {void}
     */
    removeDomino: function (index) {
        // TODO: remove the domino at the given index from the board by setting the 
        // div element's style to "removed".
    },

    /**
     * Renders UI diagnostic indicators about lives tracking, completed levels, and alert messaging to players.
     * @param {number} lives - Current amount of active lives remaining.
     * @param {number} removedCount - Count tracking the dominos already correctly destroyed/cleared.
     * @param {string} message - An optional message logging info (e.g. user win). Defaults to empty string.
     * @returns {void}
     */
    updateStatus: function (lives, removedCount, message = '') {
        // TODO: show lives, removed count, and optional message in the status element.
    }
};