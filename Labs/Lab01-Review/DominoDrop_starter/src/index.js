/*  Overview
    Domino Drop presents a grid of face-down dominos and one visible target domino.
    Click a face-down domino to reveal it. If its total pips are strictly greater
    than the target total, it is removed. After more than half of the dominos
    have been cleared, each successful removal also reduces the target total by 1.
    (If the target is 9, the new target becomes 8.) Otherwise,
    the domino flips back down. The first time a specific too-low domino is clicked,
    no life is lost. Clicking that same too-low domino again loses a life.

    Written by Brian Bird, 3/29/2026, using GitHub Copilot
*/

// -------------------- Constants --------------------
const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 5;
const HALF_CLEARED_COUNT = NUMBER_OF_DOMINOS / 2;

// -------------------- Main Flow --------------------
function init() {
    ui.cacheDominoElements();
    gameLogic.fillDominos();
    gameLogic.shuffleGridDominos();
    ui.showAllBacks();
    ui.updateTarget(gameLogic.dominos[gameLogic.currentTargetIndex]);
    ui.updateStatus(gameLogic.lives, gameLogic.removedCount);
    ui.enableAllDominos(handleClick);
}

function handleClick() {
    const CHECK_DELAY_MS = 1500;
    const index = Number(this.id);

    gameLogic.pickDomino(index);
    ui.showGridDominoFace(index, gameLogic.dominos[index]);
    ui.disableDomino(index);
    ui.disableAllDominos();

    setTimeout(resolvePick, CHECK_DELAY_MS);
}

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
function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;
}

const gameLogic = {
    dominos: [],
    currentTargetIndex: NUMBER_OF_DOMINOS,
    currentPick: -1,
    removedCount: 0,
    lives: STARTING_LIVES,
    failedPickHistory: {},

    fillDominos: function () {
        // TODO: fill the dominos array with random domino objects and a starting target.
    },

    shuffleGridDominos: function () {
        // TODO: shuffle the grid dominos array randomly.
    },

    pickDomino: function (index) {
        // TODO: record the player's pick by setting currentPick.
    },

    getTotalPips: function (domino) {
        return domino.leftPips + domino.rightPips;
    },

    isHigherThanTarget: function () {
        // TODO: return true when the picked domino total is greater than the target total.
    },

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

    hasClearedBoard: function () {
        return this.removedCount === NUMBER_OF_DOMINOS;
    },

    isOutOfLives: function () {
        return this.lives <= 0;
    },

    resetPick: function () {
        // TODO: reset currentPick to -1 for the next turn.
    }
};

// -------------------- UI --------------------
const ui = {
    dominoElements: [],
    targetElement: null,
    statusElement: null,

    cacheDominoElements: function () {
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
            this.dominoElements.push(document.getElementById(i));
        }

        this.targetElement = document.getElementById('target-domino');
        this.statusElement = document.getElementById('status');
    },

    formatDominoText: function (domino) {
        return domino.leftPips + ' | ' + domino.rightPips;
    },

    showAllBacks: function () {
        // TODO: iterate over dominoElements and show the back for each domino.
    },

    showDominoBack: function (index) {
        // TODO: show the back of the domino at the given index.
    },

    showGridDominoFace: function (index, dominoObj) {
        // TODO: show the face of the domino at the given index.
    },

    updateTarget: function (dominoObj) {
        this.targetElement.textContent = this.formatDominoText(dominoObj);
    },

    disableDomino: function (index) {
        // TODO: disable the domino at the given index.
    },

    disableAllDominos: function () {
        // TODO: iterate over dominoElements and disable each domino.
    },

    enableAllDominos: function (clickHandler, onlyRemaining = false) {
        for (const domino of this.dominoElements) {
            const isRemoved = domino.classList.contains('removed');
            if (!onlyRemaining || !isRemoved) {
                domino.onclick = clickHandler;
                domino.style.cursor = 'pointer';
            }
        }
    },

    removeDomino: function (index) {
        // TODO: remove the domino at the given index from the board.
    },

    updateStatus: function (lives, removedCount, message = '') {
        // TODO: show lives, removed count, and optional message in the status element.
    }
};