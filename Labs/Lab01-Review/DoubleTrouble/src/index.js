/*  Overview
    Double Trouble is a domino-clearing game with 15 dominos.
    Players can click one "Double" domino (both halves equal, e.g. [4|4]) to
    remove it instantly, OR click two standard dominos whose total pip count
    adds up to 12. Non-matching pairs are shown for 2 seconds then flipped back.
    The game ends when all 15 dominos are cleared from the board.
*/

// -------------------- Constants --------------------
const NUMBER_OF_DOMINOES = 15;

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
    6: [1, 3, 4, 6, 7, 9]
};

// -------------------- Main Flow --------------------
// These functions act as the "glue" between the game logic and the UI
// which are defined in sections below.

// Initializes the page after it's loaded.
function init() {
    ui.cacheDominoElements();
    gameLogic.fillDominoes();
    gameLogic.shuffleDominoes();
    ui.updateScore(gameLogic.cleared, gameLogic.turns);
    ui.enableAllDominoes(handleClick);
    ui.showAllBacks();
}

// This function is called when the user clicks on a domino.
// It coordinates between the ui showing the domino and game logic tracking the pick.
function handleClick() {
    const CHECK_DELAY_MS = 2000;
    let index = Number(this.id);  // index represents the domino location in the dominoes array and on the page.

    gameLogic.pickDomino(index);

    if (gameLogic.dominoes[index].isDouble) {
        // Doubles are removed instantly and count as one turn.
        gameLogic.turns++;
        gameLogic.cleared++;
        ui.removeDomino(index);
        ui.updateScore(gameLogic.cleared, gameLogic.turns);
        gameLogic.resetPicks();

        if (gameLogic.cleared === NUMBER_OF_DOMINOES) {
            ui.showWin(gameLogic.turns);
        } else {
            ui.enableAllDominoes(handleClick, true);
        }
    } else {
        // Non-double: show the face and disable the tile.
        ui.showDominoFace(index, gameLogic.dominoes[index]);
        ui.disableDomino(index);

        if (gameLogic.secondPick !== -1) {
            // Second pick set — wait, then check for a sum-to-12 match.
            ui.disableAllDominoes();
            setTimeout(completeTurn, CHECK_DELAY_MS);
        } else {
            // First pick — highlight it and lock out doubles until this pair resolves.
            ui.highlightDomino(index);
            ui.disableDoubleDominoes();
        }
    }
}

// Checks the 2 non-double dominos that have been picked for a sum-to-12 match.
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

    ui.updateScore(gameLogic.cleared, gameLogic.turns);
    gameLogic.resetPicks();

    if (gameLogic.cleared === NUMBER_OF_DOMINOES) {
        ui.showWin(gameLogic.turns);
    } else {
        ui.enableAllDominoes(handleClick, true);
    }
}

window.onload = init;

// -------------------- Core Logic --------------------
// The gameLogic object handles the rules and state of the game.
// It does not interact with the HTML document or CSS styles.

// Domino object constructor used in gameLogic object.
function Domino(left, right) {
    this.left = left;
    this.right = right;
    this.isDouble = (left === right);
    this.totalPips = left + right;
}

const gameLogic = {
    dominoes: [],
    firstPick: -1,   // index of the first domino picked, -1 if none yet
    secondPick: -1,  // index of the second domino picked, -1 if none yet
    cleared: 0,      // number of dominos cleared so far
    turns: 0,        // number of turns taken so far

    // Fills the dominoes array with a fixed curated set of 15 dominos:
    //   3 doubles (removed instantly) + 6 non-double pairs that each sum to 12.
    fillDominoes: function() {
        this.dominoes = [
            // Doubles — each removed with a single click
            new Domino(2, 2),   //  4 pips
            new Domino(4, 4),   //  8 pips
            new Domino(6, 6),   // 12 pips

            // Pair 1:  1 pip  +  11 pips  = 12
            new Domino(0, 1),
            new Domino(5, 6),

            // Pair 2:  2 pips  +  10 pips  = 12
            new Domino(0, 2),
            new Domino(4, 6),

            // Pair 3:  3 pips  +  9 pips  = 12
            new Domino(0, 3),
            new Domino(3, 6),

            // Pair 4:  4 pips  +  8 pips  = 12
            new Domino(0, 4),
            new Domino(3, 5),

            // Pair 5:  5 pips  +  7 pips  = 12
            new Domino(1, 4),
            new Domino(2, 5),

            // Pair 6:  6 pips  +  6 pips  = 12
            new Domino(2, 4),
            new Domino(1, 5)
        ];
    },

    // Shuffles the elements in the dominoes array.
    shuffleDominoes: function() {
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            let rndIndex = Math.trunc(Math.random() * NUMBER_OF_DOMINOES);
            let temp = this.dominoes[i];
            this.dominoes[i] = this.dominoes[rndIndex];
            this.dominoes[rndIndex] = temp;
        }
    },

    // Records a player's domino pick.
    pickDomino: function(index) {
        if (this.firstPick === -1) {
            this.firstPick = index;
        } else {
            this.secondPick = index;
        }
    },

    // Resets the picks for the next turn.
    resetPicks: function() {
        this.firstPick = -1;
        this.secondPick = -1;
    },

    // Returns true when the two picked non-double dominos sum to exactly 12 pips.
    isMatch: function() {
        let d1 = this.dominoes[this.firstPick];
        let d2 = this.dominoes[this.secondPick];
        return d1.totalPips + d2.totalPips === 12;
    }
};

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document.
// It only modifies visual elements and relies on gameLogic for data.

const ui = {
    dominoElements: [],

    // Caches domino elements by index for reuse.
    cacheDominoElements: function() {
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            this.dominoElements.push(document.getElementById(i));
        }
    },

    // Shows the back for all dominos.
    showAllBacks: function() {
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            this.showDominoBack(i);
        }
    },

    // Shows the back of one domino based on its index.
    showDominoBack: function(index) {
        let el = this.dominoElements[index];
        el.innerHTML = '<div class="domino-back"></div>';
        el.classList.remove('selected');
    },

    // Shows the face of one domino based on its index and domino object.
    showDominoFace: function(index, domino) {
        let el = this.dominoElements[index];
        el.innerHTML = '<div class="domino-face">'
            + this.buildHalfHTML(domino.left)
            + '<div class="domino-divider"></div>'
            + this.buildHalfHTML(domino.right)
            + '</div>';
    },

    // Builds the inner HTML for one domino half using a 3×3 pip grid.
    // Positions 1–9 map left-to-right, top-to-bottom; active positions get the .pip class.
    buildHalfHTML: function(pipCount) {
        let html = '<div class="domino-half">';
        for (let pos = 1; pos <= 9; pos++) {
            let hasPip = PIP_LAYOUTS[pipCount].includes(pos);
            html += '<span class="pip-cell' + (hasPip ? ' pip' : '') + '"></span>';
        }
        html += '</div>';
        return html;
    },

    // Adds the amber selection highlight to the first-picked domino.
    highlightDomino: function(index) {
        this.dominoElements[index].classList.add('selected');
    },

    // Disables one domino based on its index.
    disableDomino: function(index) {
        let el = this.dominoElements[index];
        el.onclick = null;
        el.style.cursor = 'default';
    },

    // Disables all dominos.
    disableAllDominoes: function() {
        for (const el of this.dominoElements) {
            el.onclick = null;
            el.style.cursor = 'default';
        }
    },

    // Disables all Double dominos that are still on the board.
    // Called after a first non-double pick so doubles cannot be mixed into a pair.
    disableDoubleDominoes: function() {
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            if (gameLogic.dominoes[i].isDouble && !this.dominoElements[i].classList.contains('removed')) {
                this.disableDomino(i);
            }
        }
    },

    // Assigns the clickHandler function to dominos (all dominos by default,
    // or only those still on the board when onlyRemaining is true).
    enableAllDominoes: function(clickHandler, onlyRemaining = false) {
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            let el = this.dominoElements[i];
            if (!onlyRemaining || !el.classList.contains('removed')) {
                el.onclick = clickHandler;
                el.style.cursor = 'pointer';
            }
        }
    },

    // Removes one domino from the board by hiding it while keeping its grid space.
    removeDomino: function(index) {
        let el = this.dominoElements[index];
        el.innerHTML = '';
        el.classList.remove('selected');
        el.classList.add('removed');
        el.onclick = null;
        el.style.cursor = 'default';
    },

    // Updates the score display.
    updateScore: function(cleared, turns) {
        document.getElementById('status').innerHTML =
            'Cleared: ' + cleared + ' &nbsp; Turns: ' + turns;
    },

    // Replaces the score display with a win message.
    showWin: function(turns) {
        document.getElementById('status').innerHTML =
            'You cleared the board in ' + turns + ' turn' + (turns === 1 ? '' : 's') + '!';
    }
};
