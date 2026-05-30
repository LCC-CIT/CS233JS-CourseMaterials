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

## Prerequisites for Running This App

- Get an API key from [Tavily](https://www.tavily.com) and put it in a .env file.
- Unblock access-control-allow-origin to allow CORS responses fromt the Tavily API.

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
- Endpoint: `https://api.tavily.com/search`
- Function: `fetchHowToLink(taskDescription)`
- Query shape: `How do I {taskDescription}`
- Behavior:
  - sends POST request with bearer token from `VITE_TAVILY_API_KEY`
  - returns `{ url, title }` from the first result
  - returns `null` when request fails or no result is found

Notes:

- The API key is read from Vite environment variables (`import.meta.env`).
- For this lab, the key is used client-side; this is acceptable for coursework but not recommended for production systems.

## Project Structure

- `index.html` - app shell
- `src/js/` - MVC modules and service modules
- `src/css/styles.css` - custom styling
- `CHANGELOG.md` - project revision history and notable changes
