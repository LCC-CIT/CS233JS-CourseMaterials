---
title: Final Quiz Review
description: Review topics covered in the second half of the term.
keywords: canvas, AJAX, fetch, promises, async/await, CORS, dotenv, Vite, Vitest, unit testing
author: Brian Bird
---

<h1>Final Quiz Review</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Introduction

The topics listed in this review are the ones that will be covered by the final quiz. This review page doesn't cover every detail that might be on the final quiz, but is intended to be a starting place for your review. In addition to this page, study:

- The midterm review guide.
- The lecture notes
- Programming examples
- Tutorials
- Reading quizzes

### Tips for Reviewing

- Focus on understanding concepts and being able to apply them rather than memorizing answers.
- Ask yourself questions (or have a friend quiz you) rather than reading and re-reading course material.
- Write code snippets and run them in the console to solidify your understanding.



## Topics to Review

These are the major topics covered in weeks 6–10. This list is not intended to include every detail that was covered, but to list the main topics.

---

### HTML5 Canvas

The `<canvas>` element lets JavaScript draw graphics (shapes, images, text) directly on a web page. You get a **context object** from the canvas and call methods on it to draw.

**Getting started:**

```javascript
const canvas = document.querySelector('#myCanvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');
```

**Computer graphics coordinate system:** the origin (0, 0) is the *top-left* corner. The x-axis increases to the right; the y-axis increases *downward*.

##### Context Properties

| Property | What it controls | Example |
|---|---|---|
| `fillStyle` | Fill color for shapes and text | `ctx.fillStyle = 'blue';` |
| `strokeStyle` | Outline color for shapes and text | `ctx.strokeStyle = 'black';` |
| `lineWidth` | Width of strokes in pixels | `ctx.lineWidth = 3;` |
| `textAlign` | Horizontal text alignment relative to x-coordinate | `ctx.textAlign = 'center';` |

##### Context Methods

| Method | What it does | Example |
|---|---|---|
| `clearRect(x, y, w, h)` | Erases a rectangular area of the canvas | `ctx.clearRect(0, 0, canvas.width, canvas.height);` |
| `drawImage(img, x, y, w, h)` | Draws an image onto the canvas, optionally scaled | `ctx.drawImage(img, 0, 0, 400, 300);` |
| `fillText(text, x, y)` | Draws filled text at the given coordinates | `ctx.fillText('Hello!', 100, 50);` |
| `beginPath()` | Starts a new drawing path | `ctx.beginPath();` |
| `arc(x, y, r, start, end)` | Adds a circle (or arc) to the current path | `ctx.arc(100, 100, 50, 0, Math.PI * 2);` |
| `translate(x, y)` | Moves the canvas coordinate origin | `ctx.translate(offsetX, offsetY);` |
| `lineTo(x, y)` | Adds a line segment to the current path | `ctx.lineTo(event.offsetX, event.offsetY);` |

**Clipping example — circular crop:**

```javascript
ctx.beginPath();
ctx.arc(200, 200, 100, 0, Math.PI * 2); // circle centered at (200,200), radius 100
ctx.clip();
ctx.drawImage(photo, 100, 100, 200, 200); // only the circular region is visible
```

**Freestyle drawing (mouse events):**

```javascript
canvas.addEventListener('mousedown', e => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', e => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});
```

#### The `download` Attribute

Adding the `download` attribute to an `<a>` element tells the browser to download the linked file instead of opening it.

```html
<a href="path/to/meme.png" download="my-meme.png">Download Meme</a>
```

---

### AJAX and the Fetch API

#### Synchronous vs. Asynchronous Requests

| Type | Description |
|---|---|
| **Synchronous** | Code executes line-by-line. A network request blocks the browser tab until it completes — the page freezes. |
| **Asynchronous** | A request is started in the background; the browser continues executing code immediately. The response is handled later. |

#### AJAX

*AJAX (Asynchronous JavaScript and XML)* is the technique of updating parts of a webpage without a full page reload. Despite the name, modern AJAX typically transfers JSON (not XML). It enables fast, dynamic UIs that communicate with a server in the background.

#### The Fetch API

The **Fetch API** is the modern way to make asynchronous HTTP requests in JavaScript. It returns a **Promise** and replaces the older `XMLHttpRequest` (XHR) object.

#### Promises

A *promise* is a placeholder object representing the eventual result of an asynchronous operation. It is always in one of three states:

| State | Meaning |
|---|---|
| **Pending** | The operation has not yet completed. |
| **Fulfilled** | The operation completed successfully; a result value is available. |
| **Rejected** | The operation failed; an error reason is available. |

#### `async` / `await`

| Keyword | Role |
|---|---|
| `async` | Placed before a function declaration. Ensures the function always returns a Promise and allows `await` to be used inside it. |
| `await` | Pauses execution of the `async` function until the Promise settles, then "unwraps" it to the resolved value. The rest of the page stays responsive. |

**Error handling:** use `try...catch` around `await` calls to catch rejected promises (e.g., network errors, 404 responses).

**Example — fetching JSON with `async`/`await`:**

```javascript
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.example.com/weather?city=${city}`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.temperature);

    } catch (err) {
        console.error('Fetch failed:', err.message);
    }
}
```

#### `.then()` Chaining (Fluent Syntax)

An older but still common alternative to `async`/`await` is chaining `.then()` and `.catch()` on the Promise returned by `fetch`:

```javascript
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) throw new Error('HTTP error ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Working with Web APIs

#### HTTP Protocol

*HTTP (HyperText Transfer Protocol)* is the request-response protocol used by browsers and servers. The browser sends an HTTP **request** (a URL with optional parameters), and the server sends back an HTTP **response** (data or a web page).

| HTTP Method | Purpose |
|---|---|
| **GET** | Retrieve data from the server (default for `fetch`). |
| **POST** | Send data to the server (e.g., submitting a form). |
| **PUT** | Update an existing resource on the server. |
| **DELETE** | Remove a resource from the server. |

#### Three Ways to Use `fetch`

| Approach | Style | Notes |
|---|---|---|
| **Procedural** | Assigns each Promise to a variable before calling `.then()` | Makes Promises "visible" in the code; less common in practice. |
| **Fluent / chaining** | Chains `.then()` and `.catch()` directly on `fetch(...)` | Common in older codebases and documentation. |
| **`async`/`await`** | Uses `await` inside an `async` function with `try...catch` | Modern, most readable; preferred style in this course. |

**Key `Response` object methods:**

| Method | Returns | Use when the response body is… |
|---|---|---|
| `response.json()` | Promise → parsed object | JSON data from an API |
| `response.text()` | Promise → string | Plain text or HTML |
| `response.blob()` | Promise → Blob | Binary data (images, files) |

Always check `response.ok` (true for HTTP status 200–299) before processing the body.

### CORS, `.env` Files, and Deployment

#### Same-Origin Policy (SOP)

The *Same-Origin Policy* is a browser security mechanism that prevents JavaScript on one website from reading data from a different website. An **origin** is the combination of protocol + domain + port. For example:

- `http://localhost:5173` and `https://api.example.com` are **different** origins.
- `https://example.com` and `https://example.com/page2` are the **same** origin.

Without SOP, a malicious tab could silently read your banking data or steal session cookies from another tab.

#### CORS (Cross-Origin Resource Sharing)

*CORS* is the mechanism browsers use to enforce the Same-Origin Policy for `fetch` requests. When JavaScript at one origin requests a resource from a **different** origin, the browser checks whether the response includes permission headers.

| Concept | Details |
|---|---|
| **Who enforces CORS** | The **browser** — not the server. Server-to-server requests are not affected. |
| **Key response header** | `Access-Control-Allow-Origin: *` allows any origin; a specific domain restricts access. |
| **What happens without it** | The browser blocks the response, even if the server sent it. A CORS error appears in the console. |
| **Why APIs omit the header** | To force developers to call the API from a server proxy, keeping API keys secret. |

#### The Backend Proxy Pattern

The standard solution when an API doesn't send CORS headers is to route requests through your own server:

```
Browser  →  Your Server (proxy)  →  External API
         ←                       ←
```

The browser only ever talks to your server (same origin). Your server calls the external API (server-to-server, no CORS restrictions) and forwards the response. This also keeps API keys off the client.

A proxy can be implemented as a Node.js/Express route, a Vite dev-server proxy (local development only), or a serverless function (Cloudflare Pages, Netlify, Vercel).

#### `.env` Files and Vite

A `.env` file stores configuration values — especially **secrets** like API keys — outside of source code. This prevents keys from being committed to Git.

| File | When used | Committed to Git? |
|---|---|---|
| `.env` | Always | Yes (non-secret defaults only) |
| `.env.local` | Always, overrides `.env` | **No** — add to `.gitignore` |
| `.env.production` | `vite build` | Yes (non-secret values only) |

**Rules for Vite:**

- Variables must be prefixed with `VITE_` to be accessible in browser code.
- Variables *without* `VITE_` are never included in the browser bundle (keep these for server-side use).
- Access variables in code via `import.meta.env.VITE_MY_VAR`.

```javascript
// In your JavaScript (browser code):
const apiUrl = import.meta.env.VITE_SERVER_URL;
fetch(`${apiUrl}/items`).then(res => res.json());

// Check the current mode:
if (import.meta.env.DEV) {
    console.log('Running locally');
}
```

**Example `.env.local`:**

```
VITE_SERVER_URL=http://localhost:3000
SECRET_API_KEY=abc123secret
```

`VITE_SERVER_URL` is accessible in browser code. `SECRET_API_KEY` (no `VITE_` prefix) is only available server-side and is never bundled into the browser output.

#### Cloudflare Pages Deployment

Cloudflare Pages hosts front-end apps built from a GitHub repository. Key concepts:

| Concept | Details |
|---|---|
| **Build command** | `npm run build` — Vite bundles your source into `dist/` |
| **Build output directory** | `dist` |
| **Environment variables** | Set in *Settings → Environment Variables* in the Cloudflare dashboard; injected during `vite build` |
| **Serverless functions** | JavaScript files in a `functions/` folder; Cloudflare runs them on its servers (no browser involved) |
| **`[[path]].js`** | A catch-all wildcard file that handles any sub-path under its folder |

**Vite dev server proxy** (local development only): configure in `vite.config.js` to intercept frontend requests and forward them to an external API, injecting the API key server-side:

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        server: {
            proxy: {
                '/api/weather': {
                    target: 'https://api.openweathermap.org',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api\/weather/, ''),
                    headers: { 'X-Api-Key': env.SECRET_WEATHER_KEY },
                },
            },
        },
    };
});
```

**Cloudflare serverless proxy function** (production): a `functions/api/weather/[[path]].js` file that intercepts the same relative URL in production and calls the external API using a key stored in Cloudflare's dashboard:

```javascript
// functions/api/weather/[[path]].js
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const targetUrl = `https://api.openweathermap.org${url.pathname.replace('/api/weather', '')}`;
    return await fetch(targetUrl, {
        headers: { 'X-Api-Key': env.SECRET_WEATHER_KEY },
    });
}
```

---

### Unit Testing with Vitest

#### What Is Unit Testing?

A *unit test* is a small, automated script that checks whether a single function or method behaves correctly. Instead of manually clicking through a UI, you run `npm run test` and get an instant pass/fail report.

**Benefits:** catches *regressions* (things that used to work but broke after a change), speeds up testing, documents what code is supposed to do, and encourages cleaner, more modular design.

#### What to Test (and What Not to Test)

| Test these | Don't test these |
|---|---|
| Pure functions (input → output, no side effects) | DOM manipulation |
| Class methods with state and business logic | Visual appearance (colors, layout) |
| Conditional rules ("if X, then Y") | Browser events (click, scroll) |

#### Test-Driven Development (TDD)

TDD is a practice where you write the test *before* writing the code. The cycle is **Red → Green → Refactor**:

1. **Red** — Write a test for a function stub. It fails (red) because the body is empty. This confirms the test is actually exercising the function.
2. **Green** — Write just enough code to make the test pass (green).
3. **Refactor** — Clean up the code while the tests act as a safety net.

#### Setting Up Vitest

```bash
npm install --save-dev vitest
```

Add a `test` script to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "vitest run"
}
```

Test files go in a `tests/` folder and must end in `.test.js`. Run with `npm run test`.

#### The AAA Pattern

Every unit test follows three steps:

| Step | What you do |
|---|---|
| **Arrange** | Set up objects, variables, and any input data needed. |
| **Act** | Call the function or method being tested (usually one line). |
| **Assert** | Check that the result matches what you expected using `expect(...)`. |

#### Vitest Core Functions

| Function | Purpose |
|---|---|
| `describe('name', fn)` | Groups related tests into a named suite. |
| `it('should ...', fn)` / `test(...)` | Defines a single test case. By convention, start the description with "should". |
| `expect(actual).matcher(expected)` | Asserts that `actual` matches the expected value. |
| `beforeEach(fn)` | Runs setup code before *every* `it()` block — use to create a fresh object for each test. |
| `vi.fn()` | Creates a mock function that records calls and arguments. |

All functions must be imported explicitly:

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
```

#### Common Matchers

| Matcher | What it checks |
|---|---|
| `.toBe(value)` | Strict equality (`===`). Use for primitives (numbers, strings, booleans). |
| `.toEqual(value)` | Deep equality. Use for objects and arrays. |
| `.toBeTruthy()` | The value is truthy. |
| `.toHaveLength(n)` | An array or string has exactly `n` elements/characters. |
| `.toContain(item)` | An array includes `item`, or a string includes a substring. |
| `.toHaveBeenCalled()` | A mock function was called at least once. |

#### Complete Test Example

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { GameLogic } from '../src/gameLogic.js';

describe('GameLogic', () => {
    let logic;

    beforeEach(() => {
        logic = new GameLogic();   // Arrange: fresh instance before each test
    });

    it('should initialize with default values', () => {
        // Act: constructor already ran in beforeEach
        // Assert:
        expect(logic.firstPick).toBe(-1);
        expect(logic.secondPick).toBe(-1);
        expect(logic.matches).toBe(0);
        expect(logic.cards).toEqual([]);
    });

    it('should record the first pick', () => {
        logic.pickCard(3);                      // Act
        expect(logic.firstPick).toBe(3);        // Assert
        expect(logic.secondPick).toBe(-1);
    });
});
```



*Note: This document were drafted Claude Cowork and Sonnet 4.6.*

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in spring <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

---
