# CLAUDE.md

## Project

CS233JS Lab 05 reference implementation — a Meme Maker app built with the HTML5 Canvas API and Vite. The refactor to the current simplified architecture is complete.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

## Architecture

Three modules under `src/js/`:

- **`main.js`** — Entry point. Imports Bootstrap CSS, calls `init()` from the controller, and (in Vite dev mode only) exposes `canvasModel` and the controller on `window` for console debugging.
- **`memeUiController.js`** — Owns all DOM access. Holds references to `hiddenImageElement` and `canvasElement`, creates the single shared `CanvasModel` instance (exported as `canvasModel`), wires up event listeners, sizes the canvas, and on startup either restores saved state from `localStorage` or loads a default image.
- **`canvasModel.js`** — `CanvasModel` class. Plain data fields (`image`, `imageUrl`, `topText`, `bottomText`, `filter`, `scale`, `rotate`, `bgColor`) plus `render(canvasElement)`, `storeInLocalStorage()`, and `static loadFromLocalStorage()`. Text drawing lives in a private `#drawText` method.

Rendering pipeline inside `render()`: fill background → save context → translate/rotate/scale around the canvas center → `drawImage` → restore → apply Lena.js filter to `ImageData` (if not `'none'`) → draw top/bottom text on top.

Persistence: every event handler calls `canvasModel.render(canvasElement)` followed by `canvasModel.storeInLocalStorage()`. The `image` field is stripped before serialization (it's a non-serializable `HTMLImageElement`); `imageUrl` is the data URL used to rehydrate the image on reload.

Download: `downloadMeme` is an `<a>` with a `download` attribute. The click handler sets `event.currentTarget.href = canvasElement.toDataURL('image/jpeg')` and lets the browser's default action save the file — no `preventDefault`, no synthetic click.

## Coding Conventions

- **HTML element references** — DOM-element variables must be suffixed with `Element` (e.g., `canvasElement`, `hiddenImageElement`). Follow this when adding new references.
- **JSDoc** — Document functions, classes, and non-obvious properties with JSDoc block comments. Match the style already in the source.
- **Private class members** — Use the `#name` private field syntax (as in `#drawText`) rather than underscore-prefixed conventions.

## Dependencies

- **Bootstrap 5** — Layout and form controls.
- **Lena.js** — Client-side image filters: `grayscale`, `highpass`, `saturation`, `laplacian`, `mirror`, `thresholding`. Filter names in the `<select>` map directly to `LenaJS[name]` function calls.
- **Vite 6** — Build tooling and dev server.

## Notes for Future Edits

- The whole app shares one `CanvasModel` instance — don't construct a second one.
- Range inputs (`scaleRange`, `rotateRange`) deliver string values; parse with `parseFloat` before assigning to the model.
- `storeInLocalStorage()` swallows quota errors silently; large data-URL images may not persist.
- There is no longer any drag-and-drop, hit-testing, layered class hierarchy (`ImageLayer`/`MemeText`), or `MemeLogicService`. Earlier versions had these — don't reintroduce them without a reason.
