/*  Overview
    Domino Drop presents a grid of face-down dominos and one visible target domino.
    Click a face-down domino to reveal it. If its total pips are strictly greater
    than the target total, it is removed and becomes the new target. Otherwise,
    the domino flips back down and the player loses a life.
*/

// -------------------- Constants --------------------
const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 3;

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
    const CHECK_DELAY_MS = 900;
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
        gameLogic.acceptPick();
        ui.removeDomino(pickIndex);
        ui.updateTarget(gameLogic.dominos[gameLogic.currentTargetIndex]);
        ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Great! New target set.');
    }
    else {
        gameLogic.rejectPick();
        ui.showDominoBack(pickIndex);
        ui.updateStatus(gameLogic.lives, gameLogic.removedCount, 'Too low. Life lost.');
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

    fillDominos: function () {
        this.dominos = [];

        for (let i = 0; i <= NUMBER_OF_DOMINOS; i++) {
            const left = Math.trunc(Math.random() * 7);
            const right = Math.trunc(Math.random() * 7);
            this.dominos.push(new Domino(left, right));
        }

        this.currentTargetIndex = NUMBER_OF_DOMINOS;
        this.currentPick = -1;
        this.removedCount = 0;
        this.lives = STARTING_LIVES;
    },

    shuffleGridDominos: function () {
        for (let i = NUMBER_OF_DOMINOS - 1; i > 0; i--) {
            const randomIndex = Math.trunc(Math.random() * (i + 1));
            const temp = this.dominos[i];
            this.dominos[i] = this.dominos[randomIndex];
            this.dominos[randomIndex] = temp;
        }
    },

    pickDomino: function (index) {
        this.currentPick = index;
    },

    getTotalPips: function (domino) {
        return domino.leftPips + domino.rightPips;
    },

    isHigherThanTarget: function () {
        const pickedDomino = this.dominos[this.currentPick];
        const targetDomino = this.dominos[this.currentTargetIndex];

        return this.getTotalPips(pickedDomino) > this.getTotalPips(targetDomino);
    },

    acceptPick: function () {
        this.removedCount++;
        this.currentTargetIndex = this.currentPick;
    },

    rejectPick: function () {
        this.lives--;
    },

    hasClearedBoard: function () {
        return this.removedCount === NUMBER_OF_DOMINOS;
    },

    isOutOfLives: function () {
        return this.lives <= 0;
    },

    resetPick: function () {
        this.currentPick = -1;
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
        for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
            this.showDominoBack(i);
        }
    },

    showDominoBack: function (index) {
        const domino = this.dominoElements[index];
        domino.textContent = '';
        domino.classList.remove('removed');
        domino.classList.add('back');
    },

    showGridDominoFace: function (index, dominoObj) {
        const domino = this.dominoElements[index];
        domino.textContent = this.formatDominoText(dominoObj);
        domino.classList.remove('back');
        domino.classList.remove('removed');
    },

    updateTarget: function (dominoObj) {
        this.targetElement.textContent = this.formatDominoText(dominoObj);
    },

    disableDomino: function (index) {
        const domino = this.dominoElements[index];
        domino.onclick = null;
        domino.style.cursor = 'default';
    },

    disableAllDominos: function () {
        for (const domino of this.dominoElements) {
            domino.onclick = null;
            domino.style.cursor = 'default';
        }
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
        const domino = this.dominoElements[index];
        domino.textContent = '';
        domino.classList.remove('back');
        domino.classList.add('removed');
        domino.onclick = null;
        domino.style.cursor = 'default';
    },

    updateStatus: function (lives, removedCount, message = '') {
        let text = 'Lives: ' + lives + ' Removed: ' + removedCount + '/' + NUMBER_OF_DOMINOS;
        if (message !== '') {
            text += ' | ' + message;
        }

        this.statusElement.innerHTML = text;
    }
};
