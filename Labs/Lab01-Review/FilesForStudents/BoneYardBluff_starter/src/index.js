/*  Overview
    BoneYard Bluff uses a shuffled boneyard of standard double-six dominos.
    One domino is face up on the left, and one is face down on the right.
    The player guesses whether the hidden domino total is higher or lower than
    the visible domino total. The right domino is revealed for 2 seconds.
    If the guess is correct, score increases, the revealed domino becomes the
    new left domino, and a fresh hidden domino is drawn. Reach a score of 10 to win.

    Written by Brian Bird, 3/29/2026, using GitHub Copilot
*/

// -------------------- Constants --------------------
const WIN_STREAK = 10;
const REVEAL_DELAY_MS = 2000;
const STARTING_LIVES = 5;

// PIP_LAYOUTS maps one half of a domino numerical value (properties 0-6) to the specific
// spots in a 3 x 3 grid where pips (dots) should be placed to represent that number.

// The values in the array represent pip locations in the grid:
//   1 2 3  (top row)
//   4 5 6  (middle row)
//   7 8 9  (bottom row)
const PIP_LAYOUTS = {
  0: [],
  1: [5],
  2: [3, 7],
  3: [3, 5, 7],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

// -------------------- Main Flow --------------------
/**
 * Initializes the game by setting up UI elements and event listeners,
 * and starts the first game.
 */
function init() {
  ui.cacheDominoElements();
  ui.bindGuessButtons(handleGuess);
  ui.bindResetButton(resetGame);

  resetGame();
}

/**
 * Resets the game state, dealing a new starting hand and resetting score and lives.
 * Calls UI methods to reflect the new starting state.
 */
function resetGame() {
  gameLogic.fillBoneyard();
  gameLogic.shuffleBoneyard();
  gameLogic.dealStartingDominos();
  gameLogic.lives = STARTING_LIVES;
  gameLogic.score = 0;
  gameLogic.isGameOver = false;
  gameLogic.isResolving = false;

  ui.showLeftDomino(gameLogic.currentDomino);
  ui.showRightDominoBack();
  ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length);
  ui.enableGuessButtons();
}

/**
 * Handles the player clicking "higher" or "lower".
 * Determines if the round can proceed, evaluates the player's guess,
 * reveals the hidden domino, and sets a timeout to complete the round.
 */
function handleGuess() {
  if (
    gameLogic.isResolving ||
    gameLogic.isGameOver ||
    gameLogic.nextDomino === null
  ) {
    return;
  }

  const guess = this.dataset.guess;
  gameLogic.isResolving = true;
  ui.disableGuessButtons();

  const isCorrect = gameLogic.evaluateGuess(guess);
  ui.showRightDominoFace(gameLogic.nextDomino);

  setTimeout(function () {
    completeRound(isCorrect);
  }, REVEAL_DELAY_MS);
}

/**
 * Completes the current round by applying the evaluated guess result.
 * Updates the score or lives accordingly, checks for win/loss conditions,
 * and resets the board to prepare for the next guess.
 * @param {boolean} isCorrect - The result of the guess.
 */
function completeRound(isCorrect) {
  if (isCorrect) {
    gameLogic.score++;
    gameLogic.advanceRound();

    if (gameLogic.score >= WIN_STREAK) {
      gameLogic.isGameOver = true;
      ui.showLeftDomino(gameLogic.currentDomino);
      ui.showRightDominoBack();
      ui.updateStatus(
        gameLogic.score,
        gameLogic.lives,
        gameLogic.boneyard.length,
        "You win! Streak of 10.",
      );
      return;
    }

    if (gameLogic.nextDomino === null) {
      gameLogic.isGameOver = true;
      ui.showLeftDomino(gameLogic.currentDomino);
      ui.showRightDominoBack();
      ui.updateStatus(
        gameLogic.score,
        gameLogic.lives,
        gameLogic.boneyard.length,
        "No more dominos.",
      );
      return;
    }

    ui.showLeftDomino(gameLogic.currentDomino);
    ui.showRightDominoBack();
    ui.updateStatus(
      gameLogic.score,
      gameLogic.lives,
      gameLogic.boneyard.length,
      "Correct! Keep the streak going.",
    );
  } else {
    gameLogic.lives--;
    gameLogic.advanceRound();

    if (gameLogic.lives <= 0) {
      gameLogic.isGameOver = true;
      ui.showLeftDomino(gameLogic.currentDomino);
      ui.showRightDominoBack();
      ui.updateStatus(
        gameLogic.score,
        gameLogic.lives,
        gameLogic.boneyard.length,
        "No lives left. Game over.",
      );
      return;
    }

    if (gameLogic.nextDomino === null) {
      gameLogic.isGameOver = true;
      ui.showLeftDomino(gameLogic.currentDomino);
      ui.showRightDominoBack();
      ui.updateStatus(
        gameLogic.score,
        gameLogic.lives,
        gameLogic.boneyard.length,
        "No more dominos.",
      );
      return;
    }

    ui.showLeftDomino(gameLogic.currentDomino);
    ui.showRightDominoBack();
    ui.updateStatus(
      gameLogic.score,
      gameLogic.lives,
      gameLogic.boneyard.length,
      "Wrong guess. You lost a life.",
    );
  }

  gameLogic.isResolving = false;
  ui.enableGuessButtons();
}

window.onload = init;

// -------------------- Core Logic --------------------
// Domino object constructor used in gameLogic object
/**
 * Creates a new Domino object.
 * @param {number} leftPips - The number of pips on the left half of the domino.
 * @param {number} rightPips - The number of pips on the right half of the domino.
 * @returns {void}
 */
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

  /**
   * Fills the boneyard array with all standard dominos.
   * There are 6 X 6 dominos in a standard set.
   * Has no parameters and returns noting.
   */
  fillBoneyard: function () {
    // TODO: fill the boneyard array with domino objects and reset game state.
  },

  /**
   * Shuffles the dominoes in the boneyard randomly.
   * Has no parameters and eturns nothing.
   */
  shuffleBoneyard: function () {
    // TODO: shuffle the boneyard randomly.
  },

  /**
   * Deals the first two dominos out of the boneyard: one visible, one hidden.
   * Has no parameters and eturns nothing.
   */
  dealStartingDominos: function () {
    // TODO: Choose the two starting dominos, put them in currentDomino and nextDomino.
  },

  /**
   * Calculates the total sum of pips on a domino.
   * @param {Object} domino - The domino object to sum up.
   * @returns {number} The total number of pips (value of domino).
   */
  getTotalPips: function (domino) {
    // TODO: Add up the total value of the domino
  },

  /**
   * Compares the next domino's total pips against the current domino's total pips
   * to determine if the player's guess ("high" or "low") was correct.
   * @param {string} guess - The player's guess, either "high" or "low".
   * @returns {boolean} Whether the guess was correct.
   */
  evaluateGuess: function (guess) {
    const currentTotal = this.getTotalPips(this.currentDomino);
    const nextTotal = this.getTotalPips(this.nextDomino);
    let isCorrect = false;
    // TODO: evaluate the guess and return whether it is correct.
    return isCorrect;
  },

  /**
   * Shifts the hidden domino into the visible spot, and draws a new hidden domino
   * if there are any remaining in the boneyard.
   * Returns nothing
   */
  advanceRound: function () {
    // TODO: advance to the next round by shifting dominos and drawing a new hidden domino.
  },
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

  /**
   * Caches references to DOM elements used frequently in the UI,
   * assigning them to properties of the ui object to improve performance.
   * @returns {void}
   */
  cacheDominoElements: function () {
    this.leftDominoElement = document.getElementById("left-domino");
    this.rightDominoElement = document.getElementById("right-domino");
    this.statusElement = document.getElementById("status");
    this.highButton = document.getElementById("high-btn");
    this.lowButton = document.getElementById("low-btn");
    this.resetButton = document.getElementById("reset-btn");
  },

  /**
   * Builds the HTML for one half of a domino, generating the grid cells.
   * Based on the pipCount, it adds a "pip" class to the correct cell positions.
   * @param {number} pipCount - Total number of pips required (usually 0 to 6).
   * @returns {string} The raw HTML string representing half of a domino.
   */
  buildHalfHTML: function (pipCount) {
    let html = '<div class="domino-half">';
    for (let pos = 1; pos <= 9; pos++) {
      let hasPip = PIP_LAYOUTS[pipCount].includes(pos);
      html += '<span class="pip-cell' + (hasPip ? " pip" : "") + '"></span>';
    }
    html += "</div>";
    return html;
  },

  /**
   * Builds the complete HTML layout structure of a face-up domino.
   * It takes a domino object to generate the pip counts for both halves,
   * and inserts a divider line between them.
   * @param {Object} domino - The domino object to visually render.
   * @returns {string} The full HTML string representing a rendered domino.
   */
  buildDominoFaceHTML: function (domino) {
    const left = domino.leftPips;
    const right = domino.rightPips;

    return (
      '<div class="domino-face">' +
      this.buildHalfHTML(left) +
      '<div class="domino-divider"></div>' +
      this.buildHalfHTML(right) +
      "</div>"
    );
  },

  /**
   * Shows a domino face up in the left domino element slot.
   * @param {Object} domino - The domino object to reveal.
   * @returns {void}
   */
  showLeftDomino: function (domino) {
    this.leftDominoElement.innerHTML = this.buildDominoFaceHTML(domino);
    this.leftDominoElement.classList.remove("back");
  },

  /**
   * Displays the right-side domino face down (its back cover).
   * @returns {void}
   */
  showRightDominoBack: function () {
    this.rightDominoElement.innerHTML = '<div class="domino-back"></div>';
    this.rightDominoElement.classList.add("back");
  },

  /**
   * Dispays the right-side domino face up, revealing its actual pips.
   * @param {Object} domino - The domino object to reveal.
   * @returns {void}
   */
  showRightDominoFace: function (domino) {
    this.rightDominoElement.innerHTML = this.buildDominoFaceHTML(domino);
    this.rightDominoElement.classList.remove("back");
  },

  /**
   * Binds the passed click handler function to the high and low guess buttons.
   * @param {Function} clickHandler - Function to be executed when the buttons are clicked.
   * @returns {void}
   */
  bindGuessButtons: function (clickHandler) {
    this.highButton.dataset.guess = "high";
    this.lowButton.dataset.guess = "low";
    this.highButton.onclick = clickHandler;
    this.lowButton.onclick = clickHandler;
  },

  /**
   * Binds the passed click handler function to the reset button.
   * @param {Function} clickHandler - Function to be executed when the reset button is clicked.
   * @returns {void}
   */
  bindResetButton: function (clickHandler) {
    this.resetButton.onclick = clickHandler;
  },

  /**
   * Disables the interaction of high/low buttons during round resolution.
   * @returns {void}
   */
  disableGuessButtons: function () {
    this.highButton.disabled = true;
    this.lowButton.disabled = true;
  },

  /**
   * Enables the interaction of high/low guess buttons.
   * @returns {void}
   */
  enableGuessButtons: function () {
    this.highButton.disabled = false;
    this.lowButton.disabled = false;
  },

  /**
   * Updates the visual game status including score, lives, and boneyard count.
   * @param {number} score - Present game score.
   * @param {number} lives - Present total of the user's remaining lives.
   * @param {number} remaining - Number of dominoes still remaining in the boneyard.
   * @param {string} [message=""] - Message text detailing round status or game outcome.
   * @returns {void}
   */
  updateStatus: function (score, lives, remaining, message = "") {
    let text =
      "Score: " + score + " | Lives: " + lives + " | Remaining: " + remaining;
    if (message !== "") {
      text += " | " + message;
    }
    this.statusElement.textContent = text;
  },
};
