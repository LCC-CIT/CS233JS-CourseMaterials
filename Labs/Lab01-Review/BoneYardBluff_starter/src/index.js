/*  Overview
    BoneYard Bluff uses a shuffled boneyard of standard double-six dominos.
    One domino is face up on the left, and one is face down on the right.
    The player guesses whether the hidden domino total is higher or lower than
    the visible domino total. The right domino is revealed for 2 seconds.
    If the guess is correct, score increases, the revealed domino becomes the
    new left domino, and a fresh hidden domino is drawn. Reach a score of 10 to win.
*/

// -------------------- Constants --------------------
const WIN_STREAK = 10;
const REVEAL_DELAY_MS = 2000;
const STARTING_LIVES = 5;

// -------------------- Main Flow --------------------
function init() {
    ui.cacheDominoElements();
    ui.bindGuessButtons(handleGuess);
    ui.bindResetButton(resetGame);

    resetGame();
}

function resetGame() {
    gameLogic.fillBoneyard();
    gameLogic.shuffleBoneyard();
    gameLogic.dealStartingDominos();

    ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
    ui.showRightDominoBack();
    ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length);
    ui.enableGuessButtons();
}

function handleGuess() {
    if (gameLogic.isResolving || gameLogic.isGameOver || gameLogic.nextDomino === null) {
        return;
    }

    const guess = this.dataset.guess;
    gameLogic.isResolving = true;
    ui.disableGuessButtons();

    const result = gameLogic.evaluateGuess(guess);
    ui.showRightDominoFace(gameLogic.getDominoFilename(gameLogic.nextDomino));

    setTimeout(function () {
        completeRound(result);
    }, REVEAL_DELAY_MS);
}

function completeRound(result) {
    if (result.isCorrect) {
        gameLogic.score++;
        gameLogic.advanceRound();

        if (gameLogic.score >= WIN_STREAK) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'You win! Streak of 10.');
            return;
        }

        if (gameLogic.nextDomino === null) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.');
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Correct! Keep the streak going.');
    }
    else {
        gameLogic.lives--;
        gameLogic.advanceRound();

        if (gameLogic.lives <= 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No lives left. Game over.');
            return;
        }

        if (gameLogic.nextDomino === null) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.');
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Wrong guess. You lost a life.');
    }

    gameLogic.isResolving = false;
    ui.enableGuessButtons();
}

window.onload = init;

// -------------------- Core Logic --------------------
// Domino object constructor used in gameLogic object
function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;
}

const gameLogic = {
    boneyard: [],
    currentDomino: null,
    nextDomino: null,
    score: 0,
    lives: STARTING_LIVES,
    isResolving: false,
    isGameOver: false,

    fillBoneyard: function () {
        this.boneyard = [];

        for (let left = 0; left <= 6; left++) {
            for (let right = left; right <= 6; right++) {
                this.boneyard.push(new Domino(left, right));
            }
        }

        this.currentDomino = null;
        this.nextDomino = null;
        this.score = 0;
        this.lives = STARTING_LIVES;
        this.isResolving = false;
        this.isGameOver = false;
    },

    shuffleBoneyard: function () {
        for (let i = this.boneyard.length - 1; i > 0; i--) {
            const randomIndex = Math.trunc(Math.random() * (i + 1));
            const temp = this.boneyard[i];
            this.boneyard[i] = this.boneyard[randomIndex];
            this.boneyard[randomIndex] = temp;
        }
    },

    dealStartingDominos: function () {
        this.currentDomino = this.boneyard.pop();
        this.nextDomino = this.boneyard.pop();
    },

    getTotalPips: function (domino) {
        return domino.leftPips + domino.rightPips;
    },

    getDominoFilename: function (domino) {
        return 'domino_' + domino.leftPips + '_' + domino.rightPips;
    },

    evaluateGuess: function (guess) {
        const currentTotal = this.getTotalPips(this.currentDomino);
        const nextTotal = this.getTotalPips(this.nextDomino);

        let isCorrect = false;

        if (guess === 'high') {
            isCorrect = nextTotal >= currentTotal;
        }
        else if (guess === 'low') {
            isCorrect = nextTotal <= currentTotal;
        }

        return {
            isCorrect: isCorrect,
            currentTotal: currentTotal,
            nextTotal: nextTotal
        };
    },

    advanceRound: function () {
        this.currentDomino = this.nextDomino;
        this.nextDomino = this.boneyard.length > 0 ? this.boneyard.pop() : null;
    }
};

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document
// It only modifies visual elements and relies on gameLogic for data.
const ui = {
    leftDominoElement: null,
    rightDominoElement: null,
    statusElement: null,
    highButton: null,
    lowButton: null,
    resetButton: null,

    cacheDominoElements: function () {
        this.leftDominoElement = document.getElementById('left-domino');
        this.rightDominoElement = document.getElementById('right-domino');
        this.statusElement = document.getElementById('status');
        this.highButton = document.getElementById('high-btn');
        this.lowButton = document.getElementById('low-btn');
        this.resetButton = document.getElementById('reset-btn');
    },

    renderFilenameAsText: function (filename) {
        const parts = filename.split('_');
        return parts[1] + ' | ' + parts[2];
    },

    showLeftDomino: function (filename) {
        this.leftDominoElement.textContent = this.renderFilenameAsText(filename);
        this.leftDominoElement.classList.remove('back');
    },

    showRightDominoBack: function () {
        this.rightDominoElement.textContent = '';
        this.rightDominoElement.classList.add('back');
    },

    showRightDominoFace: function (filename) {
        this.rightDominoElement.textContent = this.renderFilenameAsText(filename);
        this.rightDominoElement.classList.remove('back');
    },

    bindGuessButtons: function (clickHandler) {
        this.highButton.dataset.guess = 'high';
        this.lowButton.dataset.guess = 'low';
        this.highButton.onclick = clickHandler;
        this.lowButton.onclick = clickHandler;
    },

    bindResetButton: function (clickHandler) {
        this.resetButton.onclick = clickHandler;
    },

    disableGuessButtons: function () {
        this.highButton.disabled = true;
        this.lowButton.disabled = true;
    },

    enableGuessButtons: function () {
        this.highButton.disabled = false;
        this.lowButton.disabled = false;
    },

    updateStatus: function (score, lives, remaining, message = '') {
        let text = 'Score: ' + score + ' | Lives: ' + lives + ' | Remaining: ' + remaining;
        if (message !== '') {
            text += ' | ' + message;
        }
        this.statusElement.textContent = text;
    }
};
