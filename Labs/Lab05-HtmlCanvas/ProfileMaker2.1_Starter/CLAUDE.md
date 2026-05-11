# CLAUDE.md

## Project

CS233JS Lab 05 starter — a Profile Maker app built with the HTML5 Canvas API and Vite. The starter ships a working HTML shell, a small reference implementation of the core features, and unwired controls for the features students will add. The intended architecture mirrors the `MemeMaker2.1/` reference implementation.

## Pre-Implemented Features

The starter's JavaScript implements only:

- **Image load** — default image on first paint, plus user upload via the file picker.
- **Top text** and **bottom text** — drawn on top of the image.
- **Download** — save the canvas as a PNG file.

Don't break or rewrite these unless asked.

## Student-Implemented Features

`index.html` already contains the controls for the following features. Students write the JS that wires them up. When helping a student with one of these, extend the existing controller and `CanvasModel` rather than starting over.

- `zoomRange` — image zoom.
- `frameSelect` — border style (white / gold / neon / none).
- `badgeText` — curved badge text around a circular boundary.
- `textColor`, `fontSelect`, `fontSize`, `textOutline` — typography for the drawn text.
- `filterSelect` — Lena.js pixel filter (grayscale, sepia, invert, sharpen, gaussian, noise).
- `stickerText` + `.emoji-btn` buttons + `clearStickers` — click-to-place draggable stickers.
- `editMode` radios (`modePan` / `modeDraw`), `penColor`, `penSize`, `clearDrawing` — freestyle drawing mode.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

## Intended Architecture

Three modules under `src/js/`:

- **`main.js`** — Entry point. Imports Bootstrap CSS and the controller, then calls `init()`.
- **`profileUiController.js`** — Owns all DOM access. Holds references to `hiddenImageElement` and `canvasElement`, creates the single shared `CanvasModel` instance (exported as `canvasModel`), wires up event listeners, sizes the canvas, and on startup loads a default image.
- **`canvasModel.js`** — `CanvasModel` class. Plain data fields (starting with `image`, `topText`, `bottomText`) plus `render(canvasElement)`. Text drawing lives in a private `#drawText` method. Students grow the field set and the render pipeline as they implement more features.

Starter rendering pipeline inside `render()`: clear the canvas → `drawImage` → draw top/bottom text on top.

Download: `downloadPic` is an `<a>` with a `download` attribute. The click handler sets `event.currentTarget.href = canvasElement.toDataURL('image/png')` and lets the browser's default action save the file — no `preventDefault`, no synthetic click.

## Coding Conventions

- **HTML element references** — DOM-element variables must be suffixed with `Element` (e.g., `canvasElement`, `hiddenImageElement`). Follow this when adding new references.
- **JSDoc** — Document functions, classes, and non-obvious properties with JSDoc block comments. Match the style used in the `MemeMaker2.1/` source.
- **Private class members** — Use the `#name` private field syntax (as in `#drawText`) rather than underscore-prefixed conventions.

## Dependencies

- **Bootstrap 5** — Layout and form controls.
- **Lena.js** — Client-side image filters; used by the student-implemented `filterSelect` feature.
- **Vite 6** — Build tooling and dev server.

## Notes for Future Edits

- The whole app shares one `CanvasModel` instance — don't construct a second one.
- Don't add new top-level controls or features beyond what's already in `index.html`. The lab scope is fixed; the controls in the HTML define it.
- If the user wants a complete reference implementation to compare against, point them to `MemeMaker2.1/` (for the architecture pattern) or `ProfileMaker/` (for the feature set).
