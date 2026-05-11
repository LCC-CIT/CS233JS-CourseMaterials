# Profile Maker Starter — Program Design and Notes

This project is a CS 233JS starter for a Profile Maker web application built with the HTML5 Canvas API and Vite. It provides the HTML shell, project scaffolding, and a small reference implementation of the core features. Students extend the JavaScript modules to wire up the remaining controls already present in `index.html`. The intended architecture mirrors the Meme Maker reference implementation in `MemeMaker2.1/`.

## Pre-Implemented Features

The starter includes working JavaScript for the basics only:

- **Image load** — a default image is drawn on the canvas when the page first loads, and the user can replace it with their own upload via the file picker.
- **Download** — the "Download" button saves the current canvas as a PNG file.

## Student-Implemented Features

`index.html` already contains the controls for these features; students write the JavaScript that hooks them up to the canvas model and rendering pipeline:

- **Top text** (`topText`) and **bottom text** (`bottomText`) — draw text strings layered on top of the image.
- **Image zoom** (`zoomRange`) — scale the image around the canvas center.
- **Border style** (`frameSelect`) — draw a programmatic frame around the photo (classic white, gold gradient, neon glow, or none).
- **Badge text** (`badgeText`) — curved typography constrained to a circular boundary.
- **Text color** (`textColor`), **font** (`fontSelect`), **font size** (`fontSize`), and **outline** (`textOutline`) — typography controls that affect the drawn text.
- **Filter** (`filterSelect`) — apply a Lena.js pixel filter (grayscale, sepia, invert, sharpen, gaussian blur, noise) to the image data.
- **Stickers** (`stickerText`, `.emoji-btn` buttons, `clearStickers`) — click the canvas to place draggable emoji stickers.
- **Freestyle drawing** (`editMode` radios, `penColor`, `penSize`, `clearDrawing`) — switch the canvas into a draw mode that captures freehand strokes.

## Program Design

The intended architecture is three small modules under `src/js/`:

### `main.js` — Entry Point
Imports the Bootstrap stylesheet and the controller, then calls `init()`. Because the controller is loaded as an ES module, the DOM is already parsed by the time `init()` runs.

### `profileUiController.js` — DOM and Event Layer
This module owns all interaction with the DOM. Its responsibilities include:
- Holding references to the hidden `<img>` source and the `<canvas>` element.
- Creating the single shared `CanvasModel` instance.
- Registering event listeners and handlers for the form controls. The starter registers handlers for the pre-implemented controls (`image`, `downloadPic`); students add handlers for the remaining controls listed above.
- Sizing the canvas to fit the viewport.
- Loading a default image on startup so the canvas is never empty.

### `canvasModel.js` — Data Model and Renderer
The `CanvasModel` class is a plain data object that also knows how to draw itself. The starter holds a single field:
- `image` (the `HTMLImageElement` source).

It exposes `render(canvasElement)`, which clears the canvas and draws the image stretched to fill it.

Students extend the model with additional fields (e.g., `topText`, `bottomText`, `zoom`, `frame`, `badgeText`, `textColor`, `fontFamily`, `fontSize`, `outline`, `filter`, `stickers`, `paths`) and grow the rendering pipeline accordingly.

## Technical Capabilities

- **Canvas drawing** — Uses the Canvas 2D context to draw an image stretched to the canvas dimensions.
- **Image upload** — Reads the picked file as a base64 data URL via `FileReader`, so the image source is self-contained and not tied to a temporary object URL.
- **Download** — The "Download" button is a plain anchor; the click handler swaps in a fresh `toDataURL('image/png')` just before the browser's default action saves the file.

## Coding Conventions

- **HTML element references** — Variables that hold a reference to a DOM element are suffixed with `Element` (e.g., `canvasElement`, `hiddenImageElement`).
- **JSDoc comments** — Functions, classes, and non-obvious properties are documented with [JSDoc](https://jsdoc.app/) block comments.

## Development Environment

- **Build System**: [Vite 6](https://vitejs.dev/) for module bundling and Hot Module Replacement.
- **Standards**: ES6+ JavaScript modules.
- **Dependencies**: [Bootstrap 5](https://getbootstrap.com/) for layout and [Lena.js](https://github.com/davidsonfellipe/lena.js) for the image filters students will implement.

### Scripts
- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — produce a production build in `dist/`.
- `npm run preview` — serve the production build locally.

---
*Authored for the CS233JS curriculum as a starter project for Lab 05.*
