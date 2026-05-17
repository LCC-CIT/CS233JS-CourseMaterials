# Meme Maker Program Design and Notes

This project is a CS 233JS reference implementation of a Meme Maker web application built with the HTML5 Canvas API and Vite. It demonstrates a small, modular architecture that separates DOM/event handling from the data model and rendering logic.

## Program Design

The application is split into three small modules under `src/js/`:

### `main.js` — Entry Point
Imports the Bootstrap stylesheet and the controller, then calls `init()`. Because the controller is loaded as an ES module, the DOM is already parsed by the time `init()` runs. In Vite's dev mode it also exposes the controller on `window` for console debugging.

### `memeUiController.js` — DOM and Event Layer
This module owns all interaction with the DOM. Its responsibilities include:
- Holding references to the hidden `<img>` source and the `<canvas>` element.
- Creating the single shared `CanvasModel` instance.
- Registering event listeners and handlers for the form controls:
  - `image` — file picker (`change`) → reads the file as a base64 data URL so it can be persisted to `localStorage`.
  - `topText` / `bottomText` — text inputs (`input`).
  - `filterSelect` — dropdown (`change`).
  - `scaleRange` / `rotateRange` — range sliders (`input`); values are parsed to `Number` before being stored on the model.
  - `bgColor` — color picker (`input`).
  - `downloadMeme` — anchor (`click`) → assigns `canvas.toDataURL('image/jpeg')` to the link's `href` so the browser's native `download` attribute saves the file.
  - `resetMeme` — button (`click`) → clears local storage and reloads the page to reset all defaults.
- Sizing the canvas to fit the viewport (capped at 500&nbsp;px).
- Restoring saved state from `localStorage` on startup, or falling back to a default image and the form's initial values.

### `canvasModel.js` — Data Model and Renderer
The `CanvasModel` class is a plain data object that also knows how to draw itself. It holds:
- `image` (the `HTMLImageElement` source) and `imageUrl` (data URL, used for persistence).
- `topText`, `bottomText`, `filter`, `scale`, `rotate`, `bgColor`.

It exposes:
- `setAll(settings)` — bulk updates model properties without triggering immediate redraws.
- `render()` — clears the canvas, paints the background, applies the scale/rotate transform around the canvas center, draws the image, applies the active Lena.js filter to the pixel data, then layers the meme text on top via the private `#drawText` method.
- `loadFromLocalStorage()` — returns the previously saved plain object, or `null`.

It also uses a private `#storeInLocalStorage()` method to serialize the model (excluding the non-serializable `image` element) to `localStorage`.

## Technical Capabilities

- **Canvas transformations** — Uses `save`/`translate`/`rotate`/`scale`/`restore` to scale and rotate the image around its center.
- **Pixel-level filters** — Reads `ImageData`, runs it through a [Lena.js](https://github.com/davidsonfellipe/lena.js) filter (grayscale, highpass, saturation, laplacian, mirror, thresholding), and writes it back.
- **Meme typography** — Draws bold Impact text with both `fillText` (white) and `strokeText` (black) for the classic outlined look. Font size scales with canvas width.
- **Persistence** — All form state plus the source image (as a data URL) round-trips through `localStorage` so the meme is preserved across reloads.
- **Download** — The "Download" button is a plain anchor; the click handler swaps in a fresh `toDataURL('image/jpeg')` just before the browser's default action saves the file.

## Coding Conventions

- **HTML element references** — Variables that hold a reference to a DOM element are suffixed with `Element` (e.g., `canvasElement`, `hiddenImageElement`).
- **JSDoc comments** — Functions, classes, and non-obvious properties are documented with [JSDoc](https://jsdoc.app/) block comments.

## Development Environment

- **Build System**: [Vite 6](https://vitejs.dev/) for module bundling and Hot Module Replacement.
- **Standards**: ES6+ JavaScript modules, including a private class field (`#drawText`).
- **Dependencies**: [Bootstrap 5](https://getbootstrap.com/) for layout and [Lena.js](https://github.com/davidsonfellipe/lena.js) for image filters.

### Scripts
- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — produce a production build in `dist/`.
- `npm run preview` — serve the production build locally.

---
*Authored for the CS233JS curriculum as a reference implementation for Lab 05.*
