---
title: Unit Testing with Vitest
description: Introduction to unit testing concepts and how to write unit tests in JavaScript using Vitest.
keywords: unit testing, Vitest, TDD, test-driven development, mocking, AAA pattern
material: Lecture Notes
generator: Typora
author: Brian Bird
---

**CS233JS Intermediate Programming: JavaScript**

<h1>Unit Testing with Vitest</h1>

<h2>Contents</h2>

[TOC]

## What Is Unit Testing?

A *unit test* is a small, automated script that checks whether a single "unit" of your code — usually one function or method — behaves correctly.

**The main point:** instead of manually opening a browser, filling out a form, clicking buttons, and checking to see if things worked, you write a JavaScript file that does the checking for you automatically. Run it once, and it tells you immediately whether your code is working correctly.

### Why Bother?

When you're working on a project with multiple functions that depend on each other, a small change in one can break something somewhere else. This is called a *regression* — something that used to work, and now doesn't. Unit tests make it easy to catch regressions.

Other benefits:

- **Speed.** Running `npm run test` takes seconds. Manually testing by clicking through a UI can take minutes per scenario.
- **Confidence.** When all tests pass, you know your logic works — even after refactoring.
- **Documentation.** A well-named test is a good description of what your code is supposed to do.
- **Design pressure.** Code that is hard to test is usually poorly structured. Writing tests pushes you toward cleaner, more modular code.

## What Should You Test?

A common beginner mistake is trying to test everything. That leads to brittle, time-consuming tests. Focus on what actually has logic to verify:

**Test these:**

- **Pure functions** — functions that take inputs and return an output without touching the browser or network (e.g., a function that formats or filters data).
- **Class methods with state** — methods that update object properties according to rules (e.g., game logic that tracks picks and matches).
- **Business rules** — any conditional logic: "if the player picks two cards with the same value, it's a match."

**Don't test these:**

- **DOM manipulation** — checking whether a `<div>` was updated with the right text is better verified manually or with a dedicated browser testing tool.
- **Visual appearance** — colors, layout, fonts. Not a unit test's job.
- **Browser events** — whether a click fires, whether a scroll happened.

One of the reasons it's a "best practice" to structure JavaScript into separate modules is so the logic layer can be tested independently from the UI layer.

## Test-Driven Development (TDD)

**Test-Driven Development (TDD)** flips the usual order: you write the test <u>before</u> you write the function it tests. This sounds counterintuitive, but it forces you to think clearly about what a function should do before you get start writing it.

TDD works in a repeating loop called **Red → Green → Refactor**:

1. **Red** — Write a test for a function that is just a *stub* (a header and empty body). Run the tests. The new test fails (it goes "red") because there is no code in the body of the function yet. This is correct — it proves the test is actually checking the function.
2. **Green** — Write just enough code to make that test pass (turn it "green"). Don't over-engineer it.
3. **Refactor** — Clean up the code now that you know it works. Improve variable names, remove duplication. The tests act as a <u>safety net</u>: if you break something while refactoring, a test immediately turns red and tells you.

You don't have to practice strict TDD in this class, but it's worth knowing the concept. At a minimum, write tests alongside your code — not as an afterthought at the end.

## What Is Vitest?

Vitest is a unit testing framework. It was built to work with **Vite** (the build tool your projects already use), which means it natively understands ES Modules (`import`/`export`) without any extra configuration. It runs your test files in Node.js — not in a browser — which makes it fast.

Alternative JavaScript testing frameworks include Jest (very popular, similar API to Vitest) and Mocha. If you've heard of Jest, Vitest will feel immediately familiar.

### How to Add Vitest to a Project

Vitest is installed as a dev dependency:

```bash
npm install --save-dev vitest
```

Then add a `test` script to your `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "vitest run"
}
```

The `run` flag tells Vitest to execute the tests once and exit, instead of watching for file changes continuously.

### Where Do Test Files Live?

By convention, test files go in a `tests/` folder at the root of your project. Vitest automatically finds any file ending in `.test.js`:

```
my-project/
├── src/
│   └── gameLogic.js
├── tests/
│   └── gameLogic.test.js
├── package.json
└── vite.config.js
```

## Anatomy of a Unit Test

Every unit test follows the same three-step structure, known as the **AAA pattern**:

1. **Arrange** — Set up everything needed: create objects, define variables, prepare any input data.
2. **Act** — Call the function or method you're testing. Usually one line.
3. **Assert** — Check that the result matches what you expected.

Here's a real example from the `Concentration2` game. The test verifies that the `GameLogic` class initializes with the correct default values:

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { GameLogic } from '../src/gameLogic.js';

describe('GameLogic', () => {
    let logic;

    beforeEach(() => {
        logic = new GameLogic();  // Arrange: fresh instance before each test
    });

    it('should initialize with default values', () => {
        // Act: (the constructor already ran in beforeEach)

        // Assert: check each starting property
        expect(logic.cards).toEqual([]);
        expect(logic.firstPick).toBe(-1);
        expect(logic.secondPick).toBe(-1);
        expect(logic.matches).toBe(0);
        expect(logic.tries).toBe(0);
    });
});
```

Notice the imports at the top. Unlike some older frameworks, Vitest requires you to explicitly import the tools you use (`describe`, `it`, `expect`, etc.). This is consistent with ES Module standards.

- **describe:** The `describe` block logically groups related tests together into a single suite so they can share common setup code.
- **beforeEach:** The `beforeEach` block runs its setup code right before each test executes, ensuring that each test starts from a clean, identical state.
- **It:** The `it` block defines a single, specific unit test that executes a unit of your code and uses assertions (`expect`) to verify that it behaves exactly as intended.

## Introduction to Mocking

So far the examples test pure logic in isolation. But real applications do things like read from `localStorage`, call a web API, or trigger callbacks in other modules. If your tests actually reach out to the internet or write to browser storage, they become slow, unreliable, and potentially destructive to real data.

**Mocking** solves this by replacing real external dependencies with fakes during a test. The two kinds you'll encounter:

- **Spy** — watches a dependency without changing what it does; records whether it was called and with what arguments.
- **Mock / Stub** — replaces a dependency entirely with a fake that returns whatever you tell it to, so the real code never runs.

In Vitest, both are created with `vi.fn()`.

### Example: Mocking `localStorage`

The `BookModel` class in the BookList app saves data to `localStorage`. The browser provides `localStorage`, but Node.js (where Vitest runs) does not. The test file replaces it with a fake:

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookModel } from '../src/model.js';

describe('BookModel', () => {
    let model;

    beforeEach(() => {
        // Arrange: create a plain object to act as fake storage
        const store = {};

        // Replace the browser's global localStorage with a mock
        global.localStorage = {
            getItem:    vi.fn(key => store[key] || null),
            setItem:    vi.fn((key, value) => { store[key] = value.toString(); }),
            removeItem: vi.fn(key => { delete store[key]; })
        };

        model = new BookModel();
    });

    it('should add a book with default status and rating', () => {
        // Act
        model.addBook({ title: 'Dune', author: 'Frank Herbert' });

        // Assert: book was added to the list
        expect(model.books.length).toBe(1);
        expect(model.books[0].title).toBe('Dune');
    });
});
```

By swapping out `localStorage` before each test, the `BookModel` code runs exactly as it would in a browser — it just talks to a fast, predictable fake instead of the real thing. No browser required, no data corrupted.

You'll go deeper into mocking in a future course. 

## How to Run the Tests

From your project's root folder in the terminal:

```bash
npm run test
```

Vitest scans for all files ending in `.test.js`, runs them, and prints a report like this:

```
 ✓ tests/gameLogic.test.js (6)
   ✓ should initialize with default values
   ✓ should fill cards with exactly 20 cards
   ✓ should shuffle cards
   ✓ should record picks correctly
   ✓ should reset picks
   ✓ should identify a match

 Test Files  1 passed (1)
      Tests  6 passed (6)
```

If a test fails, Vitest tells you exactly which assertion failed and what values it actually got vs. what it expected.

You can also run Vitest in **watch mode**, which re-runs affected tests every time you save a file — useful while actively developing:

```bash
npx vitest
```

## Vitest Core Functions Reference

See the companion document for a quick-reference guide to the Vitest functions used in this course:

**[Vitest Core Functions](CS233JS-LN-W10-D1B-VitestCoreFunctions.html)**

## Example Code

The full test suite for the Concentration2 game is in:  
`Examples/Concentration2/tests/gameLogic.test.js`

The BookList mocking example is in:  
`Examples/BookList/tests/model.test.js`

## References

- [Vitest Official Documentation](https://vitest.dev/guide/) — The authoritative guide; good for looking up matchers and configuration options.
- [Vitest Mocking API](https://vitest.dev/guide/mocking.html) — How `vi.fn()` and `vi.spyOn()` work.
- [Test-Driven Development (Wikipedia)](https://en.wikipedia.org/wiki/Test-driven_development) — Background on TDD.
- [Unit Testing Explained in 100 Seconds (YouTube)](https://www.youtube.com/watch?v=Jv2uxzhPFl4) — A quick beginner-friendly video overview.



*This document is based on lecture notes by Brian Bird for CS 295N, ASP.NET Web Development 1, and revised by Brian Bird using Claude Sonet 4.6 spring 2026.*

---

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/) CS233JS Lecture Notes by [Brian Bird](https://profbird.dev), 2026, are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
