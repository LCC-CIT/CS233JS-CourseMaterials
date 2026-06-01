---
title: Vitest Core Functions Reference
description: Quick reference for the Vitest functions and matchers used in CS233JS unit tests.
keywords: Vitest, describe, it, test, expect, beforeEach, afterEach, vi, matchers
material: Reference
generator: Typora
author: Brian Bird
---

**CS233JS Intermediate Programming: JavaScript**

<h1>Vitest Core Functions Reference</h1>

← Back to [Unit Testing with Vitest](CS233JS-LN-W10-D1-Vitest.html)

<h2>Contents</h2>

[TOC]

## Importing Vitest Functions

Unlike some older frameworks, Vitest requires you to explicitly import every function you use. Add this at the top of each test file (include only what you need):

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
```

---

## `describe()` — Grouping Tests

`describe()` creates a named block that groups related tests together. It keeps your test output organized and makes it clear what component or behavior is being tested.

**Syntax:**
```javascript
describe('name of the thing being tested', () => {
    // it() blocks go here
});
```

**Example:**
```javascript
describe('GameLogic', () => {
    it('should initialize with default values', () => { /* ... */ });
    it('should fill cards with exactly 20 cards',  () => { /* ... */ });
});
```

In the test output, all tests inside a `describe` block are shown indented under its name, making failures easy to locate.

You can nest `describe` blocks inside each other to create sub-groups for complex classes with many methods.

---

## `it()` / `test()` — Defining a Test

`it()` and `test()` are identical — use whichever reads more naturally. Each call defines one individual test case. The first argument is a description; the second is an arrow function containing your test code.

**Syntax:**
```javascript
it('should do something specific', () => {
    // Arrange, Act, Assert
});
```

**Convention:** Start descriptions with "should" to form a readable sentence — it makes the test report easy to scan:

```
✓ should initialize with default values
✓ should fill cards with exactly 20 cards
✓ should record picks correctly
```

**Example:**
```javascript
it('should record picks correctly', () => {
    logic.pickCard(5);
    expect(logic.firstPick).toBe(5);
    expect(logic.secondPick).toBe(-1);
});
```

---

## `expect()` — Asserting Results

`expect()` is how you check that your code produced the right result. You pass it the actual value, then chain a **matcher** to describe what you expect.

**Syntax:**
```javascript
expect(actualValue).matcher(expectedValue);
```

### Common Matchers

| Matcher | What it checks |
|---|---|
| `.toBe(value)` | Strict equality (`===`). Use for primitives: numbers, strings, booleans. |
| `.toEqual(value)` | Deep equality. Use for objects and arrays — checks that contents match, not that they're the same reference in memory. |
| `.not.toBe(value)` | Negates any matcher. The actual value must *not* equal the expected value. |
| `.toBeDefined()` | The value is not `undefined`. |
| `.toBeNull()` | The value is exactly `null`. |
| `.toBeTruthy()` | The value is truthy (anything other than `false`, `0`, `""`, `null`, `undefined`, `NaN`). |
| `.toBeFalsy()` | The value is falsy. |
| `.toHaveLength(n)` | An array or string has exactly `n` elements/characters. |
| `.toContain(item)` | An array includes `item`, or a string includes a substring. |
| `.toHaveBeenCalled()` | A mock function was called at least once. |
| `.toHaveBeenCalledTimes(n)` | A mock function was called exactly `n` times. |
| `.toHaveBeenCalledWith(arg1, arg2)` | A mock function was called with specific arguments. |

### Examples

```javascript
// Primitives — use toBe
expect(logic.firstPick).toBe(5);
expect(logic.matches).toBe(0);

// Objects/arrays — use toEqual
expect(logic.cards).toEqual([]);

// Negation
expect(logic.cards).not.toEqual(originalOrder);

// Length
expect(logic.cards.length).toBe(20);

// Mock/spy assertions
expect(global.localStorage.setItem).toHaveBeenCalledTimes(1);
```

---

## `beforeEach()` / `afterEach()` — Setup and Teardown

These functions run automatically before or after every `it()` block inside the same `describe`. They prevent one test from accidentally affecting the next by resetting shared state.

### `beforeEach()`

Runs *before* each test. Use it to create fresh objects or reset mocks so each test starts from a clean slate.

```javascript
describe('GameLogic', () => {
    let logic;

    beforeEach(() => {
        logic = new GameLogic();  // fresh instance for every test
    });

    it('should initialize with default values', () => {
        expect(logic.firstPick).toBe(-1);
    });

    it('should record picks correctly', () => {
        logic.pickCard(5);
        expect(logic.firstPick).toBe(5);
        // This test doesn't affect the previous one because
        // beforeEach gave it a brand-new logic object
    });
});
```

### `afterEach()`

Runs *after* each test. Use it for cleanup tasks — clearing timers, restoring mocked globals, etc. Less commonly needed than `beforeEach`.

```javascript
afterEach(() => {
    vi.restoreAllMocks();  // restore any mocked functions to their originals
});
```

---

## `vi` — Mocking Utility

`vi` is Vitest's built-in tool for creating fake (mock) functions and spying on real ones. The two most common uses are:

### `vi.fn()` — Create a Mock Function

`vi.fn()` creates a fake function that:
- Does nothing by default (returns `undefined`)
- Records every time it's called, and with what arguments

```javascript
const fakeFn = vi.fn();
fakeFn('hello');
expect(fakeFn).toHaveBeenCalledWith('hello');
```

You can also give it a fake implementation:

```javascript
const fakeGetItem = vi.fn(key => 'stored-value');
```

### `vi.spyOn()` — Watch a Real Function

`vi.spyOn()` wraps an existing function so you can track its calls while still running the original code (unless you override it).

```javascript
vi.spyOn(console, 'error');
// ... call code that might trigger console.error ...
expect(console.error).toHaveBeenCalled();
```

### Replacing a Global with a Mock

A common pattern is replacing a browser global that Node.js doesn't provide. For example, replacing `localStorage` in a BookList model test:

```javascript
beforeEach(() => {
    const store = {};
    global.localStorage = {
        getItem:    vi.fn(key => store[key] || null),
        setItem:    vi.fn((key, value) => { store[key] = value.toString(); }),
        removeItem: vi.fn(key => { delete store[key]; })
    };
});
```

Each method is a `vi.fn()`, so you can later assert that `localStorage.setItem` was called the expected number of times with the expected data.

---

## Quick Reference Card

```
describe('Group name', () => {          // group related tests
    let thing;

    beforeEach(() => {                  // runs before EVERY it()
        thing = new Thing();
    });

    it('should behave a certain way', () => {
        // Arrange
        const input = 42;

        // Act
        const result = thing.doSomething(input);

        // Assert
        expect(result).toBe(expectedValue);
    });
});
```



## References

- [Vitest API Reference](https://vitest.dev/api/) — Complete list of all functions, matchers, and options.
- [Vitest Expect Matchers](https://vitest.dev/api/expect.html) — Every matcher with examples.
- [Vitest Mocking Guide](https://vitest.dev/guide/mocking.html) — Deep dive into `vi.fn()`, `vi.spyOn()`, and module mocking.
- 

*This document was created by Brian Bird using Gemini 3.1 Pro, spring 2026*

---

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/) CS233JS Lecture Notes by [Brian Bird](https://profbird.dev), 2026, are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

---
