# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

## [1.0.1] - 2026-05-19

### Added

- Async motivational quote feature:
  - Added `src/js/quoteService.js` with pure `fetchQuote()`.
  - Added controller flow (`TaskController.loadQuote`) to fetch and display quotes.
  - Added quote rendering in `TaskView.displayQuote()` and `quoteTemplate()`.
  - Added `#motivationalQuote` container in `index.html`.
  - Added `.quote-banner` styling in `src/css/styles.css`.

- Async how-to link enrichment for new tasks:
  - Added `src/js/tavilyService.js` with pure `fetchHowToLink(taskDescription)`.
  - Added `howToLink` field to model tasks.
  - Added `TaskModel.updateTaskLink(index, linkData)`.
  - Added async add-task flow in controller to fetch/update how-to links.
  - Added optional link rendering in task rows and `.how-to-link` style.

### Changed

- Refactored app structure into a semi-MVC module layout:
  - `src/js/model.js` for state and localStorage persistence.
  - `src/js/view.js` for rendering and event wiring.
  - `src/js/controller.js` for orchestration.
  - `src/js/index.js` for bootstrap.

- Migrated build tooling from webpack to Vite:
  - Removed webpack config usage.
  - Added/used Vite scripts (`dev`, `build`, `preview`).
  - Moved CSS dependencies to npm imports handled through `src/js/index.js`.
  - Standardized project layout to Vite conventions (root `index.html`, module entry `/src/js/index.js`).

- Improved maintainability:
  - Renamed handler registration methods from `bind*` to clearer event/subscribe names.
  - Applied modern ES patterns (destructuring, spread/filter/map) in key paths.
  - Added concise why-focused comments across files.

- Released this project as an example app for students.

### Removed

- Removed JavaScript obfuscation workflow:
  - Removed `javascript-obfuscator` dependency.
  - Removed `build:obfuscate` script.

## [1.0.0] - 2025-01-15

### Changed

- Updated watch workflow in `package.json` to use Firefox Developer Edition.
- Cleaned `webpack.config.js` by removing unneeded items and stray commas.
- Removed direct `index.js` script tag from `index.html`; bundle should be loaded by build output.

### Fixed

- Resolved MIME type error caused by direct script loading:
  - Browser blocked `http://localhost:8080/js/index.js` due to `text/html` mismatch (`nosniff`).

## Notes

- Vite builds are configured with `base: './'` for subdirectory-safe deploys.
- Vite builds emit source maps for easier production debugging.
- Tavily API key is client-side in this lab context and visible in browser tooling; acceptable for coursework, not for production.
- Quote API uses `https://dummyjson.com/quotes/random` because ZenQuotes is blocked by browser CORS.

Format: based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

[Brian Bird](https://profbird.dev)