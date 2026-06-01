# Concentration2

This is an updated version of the classic Concentration memory game, refactored to use modern JavaScript tooling including **Vite** for the build system and **Vitest** for unit testing. 

## Overview
The goal of the game is to clear all 20 cards from the board by finding matching pairs. When two cards are flipped face up, they will remain on the board if they match, or be flipped back down if they do not match.

This project demonstrates:
- **ES Modules (ESM)**: Splitting code logically across multiple files using `import` and `export`.
- **Separation of Concerns**: `gameLogic.js` handles the rules of the game (pure logic), while `ui.js` handles rendering and DOM manipulation.
- **Vite Setup**: Using a modern dev server and build tool.
- **Vitest**: Running fast, reliable unit tests on the pure logic.

## Project Structure
```
Concentration2/
├── index.html           # Main HTML file (loads src/index.js as an ES module)
├── styles.css           # Global CSS styles
├── images/              # Directory containing the card images
├── src/                 
│   ├── index.js         # The main entry point linking UI and Logic
│   ├── gameLogic.js     # Contains the GameLogic class
│   └── ui.js            # Contains the Ui class
├── tests/               
│   └── gameLogic.test.js # Vitest test suite for game logic
├── package.json         # NPM configuration, dependencies, and scripts
└── vite.config.js       # (Optional) Vite config
```

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Open your terminal in the `Concentration2` folder.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Game Locally
Because this project uses ES modules, you cannot simply double-click `index.html` in your file explorer. It must be served via a local web server to avoid CORS errors.
Vite handles this for you:
```bash
npm run dev
```
Open the `http://localhost:5173` link provided in the terminal to play the game!

## Unit Testing

We use **Vitest** to automatically test the pure logic of our game without needing to click around in the browser. 
We specifically test the `GameLogic` class because it does not interact with the HTML Document Object Model (DOM), meaning it is fast and reliable to test.

### Running the Tests
To run the test suite, execute:
```bash
npm run test
```

### What We Test
If you look inside `tests/gameLogic.test.js`, you'll see tests validating that:
- The game initializes with the correct default values.
- Exactly 20 cards (10 pairs) are correctly generated.
- The deck shuffling properly rearranges the cards.
- The `pickCard()` function tracks the player's first and second picks.
- The `isMatch()` function accurately identifies whether two chosen cards are a match.

By separating our core game rules from our visual UI, we ensure the game is rock-solid under the hood!
