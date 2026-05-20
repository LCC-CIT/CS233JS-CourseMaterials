# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # Production bundle to dist/ (includes source maps)
npm run preview   # Serve the dist/ build locally
```

Production builds use `base: './'` in `vite.config.js` so asset URLs are relative — required for deployment to subdirectories on `citstudent.lanecc.edu`. Do not remove this setting.

## Architecture

This app follows a strict MVC pattern across four modules:

| File | Role |
|---|---|
| `src/js/model.js` | State + localStorage. **No imports, no DOM, no fetch.** |
| `src/js/view.js` | DOM references (cached in constructor) + lit-html templates + event wiring |
| `src/js/controller.js` | Orchestration only — subscribes to model, wires view handlers, calls services |
| `src/js/quoteService.js` | Pure `fetchQuote()` — async fetch, no DOM, no side effects |
| `src/js/index.js` | Bootstrap: wires MVC inside `DOMContentLoaded` |

**Dependency rule**: the Model has zero imports. External services are imported by the Controller, which fetches data and passes it directly to the View.

The Model notifies the Controller via pub-sub callbacks (`subscribeTodoListChanged`). The View exposes event wiring methods (`onAddTask`, `onDeleteTask`, `onToggleTask`) that the Controller binds to Model mutations.

## Async API

`quoteService.js` calls `https://dummyjson.com/quotes/random` on page load and returns `{ quote, author }` or `null` on failure. The ZenQuotes API (`zenquotes.io`) does **not** send `Access-Control-Allow-Origin` headers and is blocked by browsers — do not switch back to it.

The View's `displayQuote()` silently no-ops on `null`, so an API failure leaves the task UI intact.

## CS 233JS Style Requirements

From the course style standards and `.cursorrules` in this repo:

- **ES6+ only**: `const`/`let`, arrow functions, destructuring, spread/filter/map, template literals, ES modules. `async/await` is permitted; avoid `.then()` chains.
- **Naming**: `camelCase` for variables/functions, `PascalCase` for classes, `ALL_CAPS` for repeated literal strings/numbers.
- **Comments explain WHY**, not what. Avoid comments that restate the code.
- Event handlers always use `addEventListener` — never inline `onclick` attributes.
- `===` everywhere; never `==`.
- Never do DOM lookups (`document.getElementById`, etc.) inside Model classes.

## lit-html

Templates use the `html` tag function from `lit-html` and are rendered with `render(template, container)`. Event delegation is used for dynamic list items — listeners attach to the container, not individual items, because lit-html re-renders wipe per-item listeners.

## Build Notes

- CSS (Bootstrap, Bootstrap Icons, custom) is imported inside `src/js/index.js` so Vite fingerprints and bundles it — not via HTML `<link>` tags.
- No obfuscation. Builds must remain readable for grading.
- Deploy only the contents of `dist/` to the web server, not the project root.
