/**
 * @file memeUiController.js
 * Handles all DOM interaction: element references, event listener registration,
 * and event handlers.
 */

import CanvasModel from './canvasModel.js';

// DOM References: Image and Canvas
const hiddenImageElement = document.getElementById('hiddenImage');
const canvasElement = document.getElementById('canvas');

const canvasModel = new CanvasModel();

// ==========================================
// EVENT HANDLERS
// ==========================================

/**
 * Reads the picked file as a base64 data URL (not an object URL) so the image
 * can be serialized into localStorage alongside the rest of the model state.
 */
function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        // Get just the URL out of the dataURL blob in file
        canvasModel.imageUrl = URL.createObjectURL(file);
        canvasModel.storeInLocalStorage();
        const reader = new FileReader();
        // setImageElement will be called after the file has been read
        reader.onload = () => setImageElement(reader.result);
        reader.readAsDataURL(file);
    }
}

/** Re-renders and persists on every keystroke so the preview tracks the input live. */
function handleTopTextChange(event) {
    canvasModel.topText = event.target.value;
    canvasModel.render(canvasElement);
    canvasModel.storeInLocalStorage();
}

/** Re-renders and persists on every keystroke so the preview tracks the input live. */
function handleBottomTextChange(event) {
    canvasModel.bottomText = event.target.value;
    canvasModel.render(canvasElement);
    canvasModel.storeInLocalStorage();
}

/** Applies a Lena.js filter to the rendered image. */
function handleFilterChange(event) {
    canvasModel.filter = event.target.value;
    canvasModel.render(canvasElement);
    canvasModel.storeInLocalStorage();
}

/** Range inputs deliver their value as a string, so parse it before storing on the model. */
function handleScaleChange(event) {
    canvasModel.scale = parseFloat(event.target.value);
    canvasModel.render(canvasElement);
    canvasModel.storeInLocalStorage();
}

/** Range inputs deliver their value as a string, so parse it before storing on the model. */
function handleRotateChange(event) {
    canvasModel.rotate = parseFloat(event.target.value);
    canvasModel.render(canvasElement);
    canvasModel.storeInLocalStorage();
}

/** Paints the area exposed when the image is scaled down or rotated. */
function handleBGColorChange(event) {
    canvasModel.bgColor = event.target.value;
    canvasModel.render(canvasElement);
    canvasModel.storeInLocalStorage();
}

/**
 * Refreshes the anchor's href with a JPEG of the current canvas just before the
 * browser's default click action fires; the anchor's `download` attribute then
 * handles the file save, so no preventDefault or synthetic click is needed.
 */
function handleDownloadClick(event) {
    event.currentTarget.href = canvasElement.toDataURL('image/jpeg');
}

// ==========================================
// SETUP FUNCTIONS
// ==========================================

/** Registers all event listeners. */
function setupEventListeners() {
    document.getElementById('image').addEventListener('change', handleImageChange);
    document.getElementById('topText').addEventListener('input', handleTopTextChange);
    document.getElementById('bottomText').addEventListener('input', handleBottomTextChange);
    document.getElementById('filterSelect').addEventListener('change', handleFilterChange);
    document.getElementById('scaleRange').addEventListener('input', handleScaleChange);
    document.getElementById('rotateRange').addEventListener('input', handleRotateChange);
    document.getElementById('bgColor').addEventListener('input', handleBGColorChange);
    document.getElementById('downloadMeme').addEventListener('click', handleDownloadClick);
}

/**
 * Sets the hidden image element's src, wires it to the model, and renders on load.
 * @param {string} url - plain URL or data URL (URL + image data as a string)
 */
function setImageElement(url) {
    hiddenImageElement.src = url;
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
        Object.assign(canvasModel, saved); // Copy saved proerties into canvasModel
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
        canvasModel.imageUrl = DEFAULT_IMAGE_FILE;
    }
}
