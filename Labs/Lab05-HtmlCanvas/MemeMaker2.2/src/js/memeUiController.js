/**
 * @file memeUiController.js
 * Handles all DOM interaction: element references, event listener registration,
 * and event handlers.
 */

import CanvasModel from './canvasModel.js';

// DOM References: Image and Canvas
const imageInputElement = document.getElementById('image');
const hiddenImageElement = document.getElementById('hiddenImage');
const canvasElement = document.getElementById('canvas');

// canvasModel only being exported for debugging.
export const canvasModel = new CanvasModel(canvasElement);

// ==========================================
// EVENT HANDLERS
// ==========================================

/** Assigns all event handler to events. */
function setupEventListeners() {
    imageInputElement.addEventListener('change', handleImageChange);
    document.getElementById('topText').addEventListener('input', handleTopTextChange);
    document.getElementById('bottomText').addEventListener('input', handleBottomTextChange);
    document.getElementById('filterSelect').addEventListener('change', handleFilterChange);
    document.getElementById('scaleRange').addEventListener('input', handleScaleChange);
    document.getElementById('rotateRange').addEventListener('input', handleRotateChange);
    document.getElementById('bgColor').addEventListener('input', handleBGColorChange);
    document.getElementById('downloadMeme').addEventListener('click', handleDownloadClick);
    document.getElementById('resetMeme').addEventListener('click', handleResetClick);
}


/**
 * Reads the picked file as a base64 data URL (not an object URL) so the image
 * can be serialized into localStorage alongside the rest of the model state.
 */
function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        // reader.result is the image encoded as a base64 "data URL" string
        reader.onload = () => setImageElement(reader.result);
        // setImageElement will be called after the file has been read
        reader.readAsDataURL(file);
    }
}

/** Re-renders and persists on every keystroke so the preview tracks the input live. */
function handleTopTextChange(event) {
    canvasModel.topText = event.target.value;
    canvasModel.render();
}

/** Re-renders and persists on every keystroke so the preview tracks the input live. */
function handleBottomTextChange(event) {
    canvasModel.bottomText = event.target.value;
    canvasModel.render();
}

/** Applies a Lena.js filter to the rendered image. */
function handleFilterChange(event) {
    canvasModel.filter = event.target.value;
    canvasModel.render();
}

/** Range inputs deliver their value as a string, so parse it before storing on the model. */
function handleScaleChange(event) {
    canvasModel.scale = parseFloat(event.target.value);
    canvasModel.render();
}

/** Range inputs deliver their value as a string, so parse it before storing on the model. */
function handleRotateChange(event) {
    canvasModel.rotate = parseFloat(event.target.value);
    canvasModel.render();
}

/** Paints the area exposed when the image is scaled down or rotated. */
function handleBGColorChange(event) {
    canvasModel.bgColor = event.target.value;
    canvasModel.render();
}

/**
 * Refreshes the anchor's href with a JPEG of the current canvas just before the
 * browser's default click action fires; the anchor's `download` attribute then
 * handles the file save, so no preventDefault or synthetic click is needed.
 */
function handleDownloadClick(event) {
    event.currentTarget.href = canvasElement.toDataURL('image/jpeg');
}

/** Clears local storage and reloads the page to reset all defaults. */
function handleResetClick() {
    localStorage.clear();

    // Reset DOM elements so the browser caches the defaults upon reload
    document.getElementById('topText').value = '';
    document.getElementById('bottomText').value = '';
    document.getElementById('filterSelect').value = 'none';
    document.getElementById('scaleRange').value = '1';
    document.getElementById('rotateRange').value = '0';
    document.getElementById('bgColor').value = '#000000';

    location.reload();
}

// ==========================================
// SETUP FUNCTIONS
// ==========================================

/**
 * Sets the hidden image element's src, adds it to canvasModel, and renders it in the HTML canvas.
 * @param {string} url - plain URL or data URL (URL + image data as a string)
 */
function setImageElement(url) {
    hiddenImageElement.src = url;
    canvasModel.image = hiddenImageElement;
    hiddenImageElement.onload = () => {
        canvasModel.render();
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
    const DEFAULT_IMAGE_FILE = "./images/DevsCelebratingWorkingCode.png";

    setupEventListeners();
    sizeCanvas();

    const saved = canvasModel.loadFromLocalStorage();
    if (saved?.imageUrl) {
        document.getElementById('topText').value = saved.topText;
        document.getElementById('bottomText').value = saved.bottomText;
        document.getElementById('filterSelect').value = saved.filter;
        document.getElementById('scaleRange').value = saved.scale;
        document.getElementById('rotateRange').value = saved.rotate;
        document.getElementById('bgColor').value = saved.bgColor;
        setImageElement(saved.imageUrl);
    } else {
        // Put HTML values into the model so the first render matches what the form shows.
        canvasModel.filter = document.getElementById('filterSelect').value;
        canvasModel.scale = parseFloat(document.getElementById('scaleRange').value);
        canvasModel.rotate = parseFloat(document.getElementById('rotateRange').value);
        canvasModel.bgColor = document.getElementById('bgColor').value;
        setImageElement(DEFAULT_IMAGE_FILE);
        imageInputElement.value = '';
        canvasModel.imageUrl = DEFAULT_IMAGE_FILE;
    }
}
