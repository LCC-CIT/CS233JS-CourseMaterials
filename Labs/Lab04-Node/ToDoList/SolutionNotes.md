# Solution Notes for the ToDoList Lab Project

## Revision History

### Spring 2026

- Restructured JavaScript into a semi-MVC architecture:
   - `src/js/model.js`: task state and persistence logic (localStorage) with model operations
   - `src/js/view.js`: DOM rendering and event wiring
   - `src/js/controller.js`: orchestration between model and view
   - `src/js/index.js`: application bootstrap/wiring
- Migrated build pipeline from webpack to Vite:
   - removed `webpack.config.js`
   - added and then simplified `vite.config.js` for a standard Vite root layout
   - added optional obfuscation build path via `build:obfuscate`
- Updated package scripts and dependencies for Vite-first workflow:
   - `dev`, `build`, and `preview` now use Vite defaults
   - CSS dependencies moved to npm imports (`bootstrap`, `bootstrap-icons`) instead of CDN tags
- Standardized project structure to be more typical for Vite:
   - moved entry HTML from `src/index.html` to root `index.html`
   - updated module entry path to `/src/js/index.js`
   - moved `Lab04-Solution.code-workspace` out of `src/js` to project root
- Improved code readability/maintainability:
   - renamed event registration methods from `bind*` to clearer subscription/event names
   - used destructuring and spread/filter/map in key view/model paths
   - added why-focused explanatory comments in HTML, JS, CSS, and Vite config

Notes:
- Build validated after migration and refactors using `npm run build`.

### Winter 2025

- package.json: modified script for watch to use Firefox dev edition browser
- webpack.config.js; removed unneded items, removed extra/stray commas  
   fixed bug for building without obfuscation
- index.html: removed script element that loaded the index.js file. The index.js is bundled and should not be loaded from this web page.

## Debugging notes

This console error was occuring before removing the script element that loaded index.js:  
The resource from “http://localhost:8080/js/index.js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff). 2 localhost:8080  
Loading failed for the `<script>` with source “http://localhost:8080/js/index.js”.


[Brian Bird](https://profbird.dev)

