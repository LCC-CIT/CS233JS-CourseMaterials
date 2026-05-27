# ToDoList (Lab06-Async)

A browser-based task manager built for CS 233JS that demonstrates asynchronous JavaScript, modular design, and a model-view-controller inspired (MVC) architecture.

## Purpose

This app lets users:

- add tasks
- mark tasks complete/incomplete
- delete tasks
- persist tasks in browser localStorage
- see a motivational quote loaded from a web API at startup
- get a how-to resource link for newly added tasks

The project is designed to demonstrate:

- ES modules and class-based architecture
- async/await with fetch
- API integration with graceful failure handling
- separation of concerns through semi-MVC architecture.

## Architecture

The codebase follows an MVC-oriented module split:

- `src/js/model.js` (`TaskModel`)
  - owns task state
  - validates/restores from localStorage
  - commits updates and notifies subscribers
  - no DOM or fetch usage

- `src/js/view.js` (`TaskView`)
  - caches DOM references
  - renders UI with `lit-html`
  - exposes event hooks (`onAddTask`, `onDeleteTask`, `onToggleTask`)
  - displays quote and optional how-to links

- `src/js/controller.js` (`TaskController`)
  - wires model and view together
  - subscribes to model updates and triggers re-renders
  - handles async service calls for quote and how-to link

- `src/js/quoteService.js`
  - pure async service function `fetchQuote()`
  - fetches quote data only
  - no DOM side effects

- `src/js/tavilyService.js`
  - pure async service function `fetchHowToLink(taskDescription)`
  - fetches first relevant result from Tavily
  - no DOM side effects

- `src/js/index.js`
  - application started on `DOMContentLoaded`
  - imports CSS dependencies so Vite bundles and fingerprints styles

## Development Tools

This project uses:

- Vite for dev server, bundling, and production build output
- npm scripts for local workflow
- source maps in production builds for easier debugging
- relative asset base path (`base: './'`) for subdirectory deployment compatibility

### Scripts

- `npm run dev` - start local Vite dev server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally

## NPM Packages

### Runtime dependencies

- `lit-html`
  - template rendering and UI updates

- `bootstrap`
  - base UI styles and layout utility classes

- `bootstrap-icons`
  - icon set (for example, delete/trash icon)

### Development dependencies

- `vite`
  - build tool and dev server

## Web Services

### 1) Motivational Quote Service

- Website: [DummyJSON](https://dummyjson.com)
- Module: `src/js/quoteService.js`
- Endpoint: `https://dummyjson.com/quotes/random`
- Function: `fetchQuote()`
- Behavior:
  - returns `{ quote, author }` on success
  - returns `null` on failure so the UI remains usable

Notes:

- This endpoint supports browser CORS usage.
- A previously attempted provider (`zenquotes.io`) was blocked by CORS and is not used.

### 2) Tavily Search Service (How-To Link)

- Website: [Tavily](https://tavily.com)
- Module: `src/js/tavilyService.js`
- Endpoint: `/api/tavily/search` (Proxied same-origin route)
- Function: `fetchHowToLink(taskDescription)`
- Query shape: `How do I {taskDescription}`
- Behavior:
  - sends POST request to same-origin proxy URL without client-side API keys
  - returns `{ url, title }` from the first result
  - returns `null` when request fails or no result is found

Notes:

- The API key is stored securely server-side as `TAVILY_API_KEY` (with no `VITE_` prefix to prevent browser bundle leakage).
- Vite's dev proxy forwards local requests and injects the key during development.
- Cloudflare Pages Functions act as the proxy and inject the environment variable in production.

## Project Structure

- `index.html` - app shell
- `src/js/` - MVC modules and service modules
- `src/css/styles.css` - custom styling
- `CHANGELOG.md` - project revision history and notable changes

## Potential Improvements: Unique IDs for Task State

Currently, the tasks are stored in an array and tracked by their array index (e.g. `tasks[index]`). When a user performs asynchronous actions (like fetching a "how-to" link), there is a risk of a race condition if tasks are added or deleted before the network request resolves:
1. User adds `"Task A"` (placed at index 3) and an API request begins.
2. Before the API responds, the user deletes `"Task B"` at index 1.
3. The array shrinks and `"Task A"` shifts to index 2.
4. The API response resolves and tries to update the task at index 3, which is now incorrect or out of bounds.

### Recommended Fix: Unique IDs
To make the application robust and demonstrate production-ready state management patterns:
- Generate a unique string identifier for each task when it is created using the Web API `crypto.randomUUID()`.
- Store and identify tasks by this `id` attribute instead of their array `index`.
- Modify event listeners in the View to read a `data-id` attribute from the `<li>` element.
- Look up and update tasks in the Model and Controller by matching `task.id === id`.
