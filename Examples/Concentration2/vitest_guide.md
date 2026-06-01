# A Guide to Vitest Unit Tests

This guide is for anyone already familiar with another unit testing framework like Jest (another populare JS unit test framework). Vitest shares an almost identical API to Jest, but because it is built on Vite, it inherently understands ES Modules.

This guide uses the `Concentration2` game project for it's examples.

---

## 1. The Anatomy of a Vitest Test Suite

If you look at `tests/gameLogic.test.js`, you'll notice it looks similar to a Jest test suite. However, there is one difference: **Explicit Imports**.

In Jest, functions like `describe`, `it`, and `expect` are injected into the global scope. Vitest, by default, requires you to explicitly import them. This aligns with modern ES Module standards and improves IDE autocompletion.

```javascript
// 1. Explicitly import testing utilities from 'vitest'
import { describe, it, expect, beforeEach } from 'vitest';

// 2. Import the ES modules you want to test
import { GameLogic } from '../src/gameLogic.js';
import { NUMBER_OF_CARDS } from '../src/ui.js';

// 3. Define the Test Suite using describe()
describe('GameLogic', () => {
    let logic;

    // 4. Setup and Teardown
    beforeEach(() => {
        logic = new GameLogic();
    });
    
    // ... tests go here
});
```

### Key Differences from Jest:
* **ESM by default:** Vitest reads your Vite configuration (if you have one) and natively understands `import`/`export`. You don't need `babel-jest` or `ts-jest` plugins.
* **Top-level await:** Fully supported out of the box.
* **Performance:** Vitest utilizes worker threads and Vite's dev server logic to only rerun tests affected by your latest file changes.

---

## 2. Anatomy of a Vitest Unit Test

Inside the `describe` block, we define our individual tests using `it` or `test`. 

Let's look at one of the tests from the `Concentration2` game that verifies the player's card selections:

```javascript
    /**
     * Verifies that the `pickCard` method accurately tracks 
     * the player's first and second card selections.
     */
    it('should record picks correctly', () => {
        // Arrange (Handled partly by beforeEach initializing `logic`)
        
        // Act: Pick the first card (Index 5)
        logic.pickCard(5);
        
        // Assert: Verify state updated correctly
        expect(logic.firstPick).toBe(5);
        expect(logic.secondPick).toBe(-1);

        // Act: Pick the second card (Index 12)
        logic.pickCard(12);
        
        // Assert: Verify state reflects both picks
        expect(logic.firstPick).toBe(5);
        expect(logic.secondPick).toBe(12);
    });
```

### The Assertion API (`expect`)
Vitest's `expect` API implements the same matchers you know and love:
* `expect(value).toBe()` for strict equality (`===`).
* `expect(value).toEqual()` for deep object/array equality.
* `expect(value).toBeDefined()`, `.toBeTruthy()`, `.toHaveLength()`, etc.

If you ever need to create Spies or Mocks, you use `vi.fn()` or `vi.spyOn()`, which act exactly like `jest.fn()` and `jest.spyOn()`.

---

## 3. Running Vitest

Vitest is executed via the command line. In our `package.json`, we mapped it to the standard test script:

```json
"scripts": {
  "test": "vitest run"
}
```

* Running `npm run test` will execute the tests once (the `run` flag overrides Vitest's default watch mode).
* Running `npx vitest` directly will start Vitest in **Watch Mode**. It will brilliantly monitor your files and instantaneously re-run only the specific tests affected by any code changes you make.



*This document was drafted by Gemini 3.1 Pro and revised by Brian Bird in spring 2026.*
