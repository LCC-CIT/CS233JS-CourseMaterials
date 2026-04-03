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

// PIP_LAYOUTS maps one half of a domino numerical value (array indicies 0-6) to the specific
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
  gameLogic.lives = STARTING_LIVES;
  gameLogic.score = 0;
  gameLogic.isGameOver = false;
  gameLogic.isResolving = false;

  ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
  ui.showRightDominoBack();
  ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length);
  ui.enableGuessButtons();
}

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
      ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
      ui.showRightDominoBack();
      ui.updateStatus(
        gameLogic.score,
        gameLogic.lives,
        gameLogic.boneyard.length,
        "No more dominos.",
      );
      return;
    }

    ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
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
      ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
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
      ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
      ui.showRightDominoBack();
      ui.updateStatus(
        gameLogic.score,
        gameLogic.lives,
        gameLogic.boneyard.length,
        "No more dominos.",
      );
      return;
    }

    ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
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
    // TODO: fill the boneyard with domino objects and reset game state.
  },

  shuffleBoneyard: function () {
    // TODO: shuffle the boneyard randomly.
  },

  dealStartingDominos: function () {
    // TODO: Choose the two starting dominos
  },

  getTotalPips: function (domino) {
    // TODO: Add up the total value of the domino
  },

  getDominoFilename: function (domino) {
    return "domino_" + domino.leftPips + "_" + domino.rightPips;
  },

  evaluateGuess: function (guess) {
    const currentTotal = this.getTotalPips(this.currentDomino);
    const nextTotal = this.getTotalPips(this.nextDomino);
    let isCorrect = false;
    // TODO: evaluate the guess and return whether it is correct.
    return {
      isCorrect: isCorrect,
      currentTotal: currentTotal,
      nextTotal: nextTotal,
    };
  },

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

  cacheDominoElements: function () {
    this.leftDominoElement = document.getElementById("left-domino");
    this.rightDominoElement = document.getElementById("right-domino");
    this.statusElement = document.getElementById("status");
    this.highButton = document.getElementById("high-btn");
    this.lowButton = document.getElementById("low-btn");
    this.resetButton = document.getElementById("reset-btn");
  },

  buildHalfHTML: function (pipCount) {
    let html = '<div class="domino-half">';
    for (let pos = 1; pos <= 9; pos++) {
      let hasPip = PIP_LAYOUTS[pipCount].includes(pos);
      html += '<span class="pip-cell' + (hasPip ? " pip" : "") + '"></span>';
    }
    html += "</div>";
    return html;
  },

  buildDominoFaceHTML: function (filename) {
    const parts = filename.split("_");
    const left = Number(parts[1]);
    const right = Number(parts[2]);

    return (
      '<div class="domino-face">' +
      this.buildHalfHTML(left) +
      '<div class="domino-divider"></div>' +
      this.buildHalfHTML(right) +
      "</div>"
    );
  },

  showLeftDomino: function (filename) {
    this.leftDominoElement.innerHTML = this.buildDominoFaceHTML(filename);
    this.leftDominoElement.classList.remove("back");
  },

  showRightDominoBack: function () {
    this.rightDominoElement.innerHTML = '<div class="domino-back"></div>';
    this.rightDominoElement.classList.add("back");
  },

  showRightDominoFace: function (filename) {
    this.rightDominoElement.innerHTML = this.buildDominoFaceHTML(filename);
    this.rightDominoElement.classList.remove("back");
  },

  bindGuessButtons: function (clickHandler) {
    this.highButton.dataset.guess = "high";
    this.lowButton.dataset.guess = "low";
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

  updateStatus: function (score, lives, remaining, message = "") {
    let text =
      "Score: " + score + " | Lives: " + lives + " | Remaining: " + remaining;
    if (message !== "") {
      text += " | " + message;
    }
    this.statusElement.textContent = text;
  },
};
