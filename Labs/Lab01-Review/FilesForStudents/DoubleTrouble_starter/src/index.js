/*  Overview
    Double Trouble is a domino-clearing game with 15 dominos.
    Players can click one "Double" domino (both halves equal, e.g. [4|4]) to
    remove it instantly, OR click two standard dominos whose total pip count
    adds up to 12. Non-matching pairs are shown for 2 seconds then flipped back.
    The game ends when all 15 dominos are cleared from the board.
*/

// -------------------- Constants --------------------
const NUMBER_OF_DOMINOS = 15;

// Pip positions (1–9) active for each face value in a 3×3 grid:
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
// These functions act as the "glue" between the game logic and the UI
// which are defined in sections below.

/**
 * Initializes the page after it's loaded.
 * Sets up the DOM elements, generates and shuffles the dominos, updates the score, and enables interaction.
 * @returns {void}
 */
function init() {
  ui.cacheDominoElements();
  gameLogic.fillDominoes();
  gameLogic.shuffleDominoes();
  ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
  ui.enableAllDominoes(handleClick);
  ui.showAllBacks();
}

/**
 * Event handler for when the user clicks on a domino.
 * Coordinates between the ui showing the domino and game logic tracking the pick.
 * @returns {void}
 */
function handleClick() {
  const CHECK_DELAY_MS = 4000;
  const index = Number(this.id); // index represents the domino location in the dominoes array and on the page.
  const isFirstPick = gameLogic.firstPick === -1;

  gameLogic.pickDomino(index);

  if (gameLogic.dominoes[index].isDouble && isFirstPick) {
    // Doubles are shown then removed after the delay and count as one turn.
    ui.showDominoFace(index, gameLogic.dominoes[index]);
    ui.disableAllDominoes();
    ui.updateScore(
      gameLogic.cleared,
      gameLogic.turns,
      gameLogic.dominoes[index].totalPips,
    );

    setTimeout(() => {
      gameLogic.turns++;
      gameLogic.cleared++;
      ui.removeDomino(index);
      ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
      gameLogic.resetPicks();

      if (gameLogic.cleared === NUMBER_OF_DOMINOS) {
        ui.showWin(gameLogic.turns);
      } else {
        ui.enableAllDominoes(handleClick, true);
      }
    }, CHECK_DELAY_MS);
  } else {
    // Non-double: show the face and disable the tile.
    ui.showDominoFace(index, gameLogic.dominoes[index]);
    ui.disableDomino(index);

    let sum = gameLogic.dominoes[gameLogic.firstPick].totalPips;
    if (gameLogic.secondPick !== -1) {
      sum += gameLogic.dominoes[gameLogic.secondPick].totalPips;
    }
    ui.updateScore(gameLogic.cleared, gameLogic.turns, sum);

    if (gameLogic.secondPick !== -1) {
      // Second pick set — wait, then check for a sum-to-12 match.
      ui.disableAllDominoes();
      setTimeout(completeTurn, CHECK_DELAY_MS);
    } else {
      // First pick — highlight it and wait for any second pick.
      ui.highlightDomino(index);
    }
  }
}

/**
 * Checks the 2 non-double dominos that have been picked for a sum-to-12 match.
 * Prepares the game state and board for the next turn.
 * @returns {void}
 */
function completeTurn() {
  gameLogic.turns++;

  if (gameLogic.isMatch()) {
    gameLogic.cleared += 2;
    ui.removeDomino(gameLogic.firstPick);
    ui.removeDomino(gameLogic.secondPick);
  } else {
    ui.showDominoBack(gameLogic.firstPick);
    ui.showDominoBack(gameLogic.secondPick);
  }

  ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
  gameLogic.resetPicks();

  if (gameLogic.cleared === NUMBER_OF_DOMINOS) {
    ui.showWin(gameLogic.turns);
  } else {
    ui.enableAllDominoes(handleClick, true);
  }
}

window.onload = init;

// -------------------- Core Logic --------------------
// The gameLogic object handles the rules and state of the game.
// It does not interact with the HTML document or CSS styles.

/**
 * Domino object constructor used in gameLogic object.
 * @param {number} left - The pip value for the left half of the domino.
 * @param {number} right - The pip value for the right half of the domino.
 * @returns {void}
 */
function Domino(left, right) {
  this.left = left;
  this.right = right;
  this.isDouble = left === right;
  this.totalPips = left + right;
}

const gameLogic = {
  dominoes: [],
  firstPick: -1, // index of the first domino picked, -1 if none yet
  secondPick: -1, // index of the second domino picked, -1 if none yet
  cleared: 0, // number of dominos cleared so far
  turns: 0, // number of turns taken so far

  /**
   * Fills the dominoes array with a fixed curated set of 15 dominos:
   * 3 doubles (removed instantly) + 6 non-double pairs that each sum to 12.
   * @returns {void}
   */
  fillDominoes: function () {
    // TODO: fill the dominoes array with a fixed curated set of 15 dominos.
  },

  /**
   * Shuffles the elements in the dominoes array.
   * @returns {void}
   */
  shuffleDominoes: function () {
    // TODO: shuffle the dominoes array randomly.
  },

  /**
   * Records a player's domino pick.
   * @param {number} index - The index position of the picked domino.
   * @returns {void}
   */
  pickDomino: function (index) {
    // TODO: record the player's pick by setting firstPick and secondPick.
  },

  /**
   * Resets the picks for the next turn.
   * @returns {void}
   */
  resetPicks: function () {
    // TODO: reset firstPick and secondPick to -1 for the next turn.
  },

  /**
   * Returns true when the two picked non-double dominos sum to exactly 12 pips.
   * @returns {boolean} True if the two picked dominos sum to 12, false otherwise.
   */
  isMatch: function () {
    // TODO: return true if the two picked non-double dominos sum to 12, false otherwise.
  },
};

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document.
// It only modifies visual elements and relies on gameLogic for data.

const ui = {
  dominoElements: [],

  /**
   * Caches domino elements by index for reuse.
   * @returns {void}
   */
  cacheDominoElements: function () {
    this.dominoElements = [];
    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      this.dominoElements.push(document.getElementById(i));
    }
  },

  /**
   * Shows the back for all dominos.
   * @returns {void}
   */
  showAllBacks: function () {
    // TODO: iterate over dominoElements and show the back for each domino.
  },

  /**
   * Shows the back of one domino based on its index.
   * @param {number} index - The index of the domino element.
   * @returns {void}
   */
  showDominoBack: function (index) {
    // TODO: show the back of the domino at the given index.
  },

  /**
   * Shows the face of one domino based on its index and domino object.
   * @param {number} index - The index of the domino element.
   * @param {Object} domino - The domino object containing pip data.
   * @returns {void}
   */
  showDominoFace: function (index, domino) {
    // TODO: show the face of the domino at the given index.
  },

  /**
   * Builds the inner HTML for one domino half using a 3×3 pip grid.
   * Positions 1–9 map left-to-right, top-to-bottom; active positions get the .pip class.
   * @param {number} pipCount - The number of pips to display for the half.
   * @returns {string} The constructed HTML string representing the half.
   */
  buildHalfHTML: function (pipCount) {
    let html = '<div class="domino-half">';
    for (let pos = 1; pos <= 9; pos++) {
      const hasPip = PIP_LAYOUTS[pipCount].includes(pos);
      html += '<span class="pip-cell' + (hasPip ? " pip" : "") + '"></span>';
    }
    html += "</div>";
    return html;
  },

  /**
   * Adds the amber selection highlight to the first-picked domino.
   * @param {number} index - The index of the domino element to highlight.
   * @returns {void}
   */
  highlightDomino: function (index) {
    this.dominoElements[index].classList.add("selected");
  },

  /**
   * Disables one domino based on its index preventing further clicks.
   * @param {number} index - The index of the domino element.
   * @returns {void}
   */
  disableDomino: function (index) {
    // TODO: disable the domino at the given index.
  },

  /**
   * Disables all dominos preventing interaction during delays.
   * @returns {void}
   */
  disableAllDominoes: function () {
    // TODO: iterate over dominoElements and disable each domino.
  },

  /**
   * Assigns the clickHandler function to dominos.
   * @param {Function} clickHandler - The click event callback function.
   * @param {boolean} [onlyRemaining=false] - Whether to only target dominoes without the 'removed' class.
   * @returns {void}
   */
  enableAllDominoes: function (clickHandler, onlyRemaining = false) {
    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      const element = this.dominoElements[i];
      if (!onlyRemaining || !element.classList.contains("removed")) {
        element.onclick = clickHandler;
        element.style.cursor = "pointer";
      }
    }
  },

  /**
   * Removes one domino from the board by hiding it while keeping its grid space.
   * @param {number} index - The index of the domino element to remove.
   * @returns {void}
   */
  removeDomino: function (index) {
    // TODO: remove the domino at the given index from the board.
  },

  /**
   * Updates the score display on the screen.
   * @param {number} cleared - The current count of cleared dominoes.
   * @param {number} turns - The number of turns elapsed.
   * @param {number} [sum=0] - The total pip sum for currently picked tiles.
   * @returns {void}
   */
  updateScore: function (cleared, turns, sum = 0) {
    // TODO: show cleared, turns, and sum in the status element.
  },

  /**
   * Replaces the score display with a win message.
   * @param {number} turns - Total taken turns to display in the win message.
   * @returns {void}
   */
  showWin: function (turns) {
    document.getElementById("status").innerHTML =
      "You cleared the board in " +
      turns +
      " turn" +
      (turns === 1 ? "" : "s") +
      "!";
  },
};
