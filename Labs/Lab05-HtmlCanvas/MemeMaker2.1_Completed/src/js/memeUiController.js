/**
 * @file memeUiController.js
 * Handles all DOM interaction: element references, event listener registration,
 * and event handlers.
 */

import CanvasModel from './canvasModel.js';

// DOM References: Image and Canvas
const hiddenImageElement = document.getElementById('hiddenImage');
const canvasElement = document.getElementById('canvas');

export const canvasModel = new CanvasModel();

// ==========================================
// EVENT HANDLERS
// ==========================================

/**
 * Reads the picked file as a base64 data URL so the image source is
 * self-contained and survives any later refactor toward localStorage persistence.
 */
function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImageElement(e.target.result);
        reader.readAsDataURL(file);
    }
}

/** Re-renders on every keystroke so the preview tracks the input live. */
function handleTopTextChange(event) {
    canvasModel.topText = event.target.value;
    canvasModel.storeInLocalStorage();
    canvasModel.render(canvasElement);
}

/** Re-renders on every keystroke so the preview tracks the input live. */
function handleBottomTextChange(event) {
    canvasModel.bottomText = event.target.value;
    canvasModel.storeInLocalStorage();
    canvasModel.render(canvasElement);
}



/**
 * Refreshes the anchor's href with a JPEG of the current canvas just before the
 * browser's default click action fires; the anchor's `download` attribute then
 * handles the file save, so no preventDefault or synthetic click is needed.
 */
function handleDownloadClick(event) {
    event.currentTarget.href = canvasElement.toDataURL('image/png');
}

// ==========================================
// SETUP FUNCTIONS
// ==========================================

/** Registers all event listeners. */
function setupEventListeners() {
    document.getElementById('image').addEventListener('change', handleImageChange);
    document.getElementById('topText').addEventListener('input', handleTopTextChange);
    document.getElementById('bottomText').addEventListener('input', handleBottomTextChange);
    document.getElementById('downloadMeme').addEventListener('click', handleDownloadClick);
}

/**
 * Sets the hidden image element's src, wires it to the model, and renders on load.
 * @param {string} url - Path or data URL for the image.
 */
function setImageElement(url) {
    hiddenImageElement.src = url;
    canvasModel.imageUrl = url;
    canvasModel.storeInLocalStorage();
    canvasModel.image = hiddenImageElement;
    hiddenImageElement.onload = () => {
        canvasModel.render(canvasElement);
    };
}

/** Sizes the canvas to fit the viewport (capped at 500px). */
function sizeCanvas() {
    canvasElement.height = Math.min(500, window.innerWidth - 30);
    canvasElement.width = Math.min(500, window.innerWidth - 30);
}

/**
 * Initializes the application: wires up event listeners, sizes the canvas,
 * restores any saved model state, and renders the first frame.
 */
export function init() {
    const DEFAULT_IMAGE_FILE = "./images/img_whenYourCodeWorks_big.jpg";

    setupEventListeners();
    sizeCanvas();

    const saved = CanvasModel.loadFromLocalStorage();
    if (saved?.imageUrl) {
        Object.assign(canvasModel, saved);
        document.getElementById('topText').value = saved.topText;
        document.getElementById('bottomText').value = saved.bottomText;
        setImageElement(saved.imageUrl);
    }
    else {
        setImageElement(DEFAULT_IMAGE_FILE);
                document.getElementById('topText').value = '';
        document.getElementById('bottomText').value = '';
    }
}
