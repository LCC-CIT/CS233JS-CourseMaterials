# Meme Maker Starter

This project is a starter template for a Meme Maker web application built with the HTML5 Canvas API and Vite. It demonstrates a small, modular architecture that separates DOM/event handling from the data model and rendering logic.

## Program Design

The application is split into three small modules under `src/js/`:

### `main.js` — Entry Point
Imports the Bootstrap stylesheet and the controller, then calls `init()`. Because the controller is loaded as an ES module, the DOM is already parsed by the time `init()` runs. In Vite's dev mode it also exposes the controller and the `canvasModel` instance on `window` for console debugging.

### `memeUiController.js` — DOM and Event Layer
This module owns all interaction with the DOM. Its responsibilities include:
- Holding references to the hidden `<img>` source and the `<canvas>` element.
- Creating the single shared `CanvasModel` instance.
- Registering event listeners and handlers for the form controls:
  - `image` — file picker (`change`) → reads the file as a base64 data URL so the image source is self-contained.
  - `topText` / `bottomText` — text inputs (`input`).
  - `downloadMeme` — anchor (`click`) → assigns `canvas.toDataURL('image/png')` to the link's `href` so the browser's native `download` attribute saves the file.
- Sizing the canvas to fit the viewport (capped at 500&nbsp;px).
- Setting a default image so the canvas is not empty.

### `canvasModel.js` — Data Model and Renderer
The `CanvasModel` class is a plain data object that also knows how to draw itself. It holds:
- `image` (the `HTMLImageElement` source).
- `topText`, `bottomText`.

It exposes:
- `render(canvasElement)` — clears the canvas, draws the image, then layers the meme text on top via the private `#drawText` method.

## Technical Capabilities

- **Meme typography** — Draws bold Impact text with both `fillText` (white) and `strokeText` (black) for the classic outlined look. Font size scales with canvas width.
- **Download** — The "Download" button is a plain anchor; the click handler swaps in a fresh `toDataURL('image/png')` just before the browser's default action saves the file.

## Coding Conventions

- **HTML element references** — Variables that hold a reference to a DOM element are suffixed with `Element` (e.g., `canvasElement`, `hiddenImageElement`).
- **JSDoc comments** — Functions, classes, and non-obvious properties are documented with [JSDoc](https://jsdoc.app/) block comments.

## Development Environment

- **Build System**: [Vite 6](https://vitejs.dev/) for module bundling and Hot Module Replacement.
- **Standards**: ES6+ JavaScript modules, including a private class field (`#drawText`).
- **Dependencies**: [Bootstrap 5](https://getbootstrap.com/) for layout.

### Scripts
- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — produce a production build in `dist/`.
- `npm run preview` — serve the production build locally.

---
*Authored for the CS233JS curriculum as a starter for Lab 05.*
