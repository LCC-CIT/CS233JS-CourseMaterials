/**
 * memeUiController.js
 *
 * This module acts as the Controller for the Meme Creator application.
 * It is responsible for all DOM interactions, event listening, and LocalStorage persistence.
 * It drives the MemeLogicService by calling its public API methods based on user input.
 */

import './general';
import MemeLogicService from './memeLogicService';


// ==========================================
// 1. STATE & DOM REFERENCES
// ==========================================

// DOM References: Input controls
const imageInput = document.getElementById('image');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const filterSelect = document.getElementById('filterSelect');
const scaleRange = document.getElementById('scaleRange');
const rotateRange = document.getElementById('rotateRange');
const bgColorInput = document.getElementById('bgColor');
const downloadButton = document.getElementById('downloadMeme');

// DOM References: Image and Canvas
const defaultImageElement = document.getElementById('defaultImage');
const canvas = document.getElementById('imgCanvas');

// Fallback image
const defaultImageFile = "/images/img_whenYourCodeWorks_big.jpg";

// Instantiate the logic engine
const engine = new MemeLogicService(canvas);

// (Interaction state is now managed by the logic service)
// ==========================================
// 2. INITIALIZATION
// ==========================================

/**
 * Initializes the application on window load.
 */
function init() {
  createCanvas();
  loadDefaultSettings();
  addEventHandlers();
}


// ==========================================
// 3. HELPERS
// ==========================================

/**
 * Helper to attach an event that calls an engine method and saves to LocalStorage.
 * @param {HTMLElement} element - The DOM element.
 * @param {string} eventType - The event name (e.g., 'input', 'change').
 * @param {string} storageKey - The key to use in localStorage.
 * @param {Function} engineMethod - The engine setter to call.
 * @param {Function} parser - Optional value transformation function.
 */
function addSaveEvent(element, eventType, storageKey, engineMethod, parser = (v) => v) {
  element.addEventListener(eventType, () => {
    engineMethod(parser(element.value));
    localStorage.setItem(storageKey, element.value);
  });
}

/**
 * Helper to load a single setting from LocalStorage and apply it.
 * @param {string} key - LocalStorage key.
 * @param {HTMLElement} element - Target input element.
 * @param {Function} engineMethod - The engine setter to call.
 * @param {Function} parser - Optional value transformation function.
 */
function loadSetting(key, element, engineMethod, parser = (v) => v) {
  const value = localStorage.getItem(key);
  if (value) {
    element.value = parser(value);
    engineMethod(parser(value));
  }
}


// ==========================================
// 4. EVENT HANDLERS
// ==========================================

/**
 * Orchestrates the binding of all application event listeners.
 */
function addEventHandlers() {
  // Text inputs
  addSaveEvent(topTextInput, 'keyup', 'topText', (v) => engine.setTopText(v));
  addSaveEvent(bottomTextInput, 'keyup', 'bottomText', (v) => engine.setBottomText(v));

  // Image and download
  imageInput.addEventListener('change', loadImage);
  downloadButton.addEventListener('click', downloadMeme);

  // Visual settings
  addSaveEvent(filterSelect, 'change', 'filter', (v) => engine.setFilter(v));
  addSaveEvent(scaleRange, 'input', 'scale', (v) => engine.setScale(v), parseFloat);
  addSaveEvent(rotateRange, 'input', 'rotation', (v) => engine.setRotation(v), parseFloat);
  addSaveEvent(bgColorInput, 'input', 'bgColor', (v) => engine.setBgColor(v));

  // Canvas mouse events for dragging text
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseUp);
}


// ==========================================
// 5. INTERACTION LOGIC
// ==========================================

/**
 * Maps mouse event coordinates to local canvas space.
 * @param {MouseEvent} e
 * @returns {Object} Localized coordinates.
 */
function getMouseCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

/**
 * Handles mousedown: delegates pointer down to the logic service.
 * @param {MouseEvent} e
 */
function handleMouseDown(e) {
  const { x, y } = getMouseCoordinates(e);
  if (engine.handlePointerDown(x, y)) {
    canvas.style.cursor = 'grabbing';
  }
}

/**
 * Handles mousemove: updates hover cursor or delegates drag to the logic service.
 * @param {MouseEvent} e
 */
function handleMouseMove(e) {
  const { x, y } = getMouseCoordinates(e);

  // If the engine says a drag occurred, save the new positions
  if (engine.handlePointerMove(x, y)) {
    saveTextPositions();
  } else {
    // If we're not dragging, just update the cursor based on hover
    canvas.style.cursor = engine.hitTestText(x, y) ? 'grab' : 'default';
  }
}

/**
 * Handles mouseup: delegates pointer up to the logic service and resets cursor.
 */
function handleMouseUp() {
  engine.handlePointerUp();
  canvas.style.cursor = 'default';
}


// ==========================================
// 6. PERSISTENCE
// ==========================================

/**
 * Restores the entire application state from LocalStorage on initial load.
 */
function loadDefaultSettings() {
  // Simple settings: load value into DOM element and call engine setter
  loadSetting('topText', topTextInput, (v) => engine.setTopText(v));
  loadSetting('bottomText', bottomTextInput, (v) => engine.setBottomText(v));
  loadSetting('filter', filterSelect, (v) => engine.setFilter(v));
  loadSetting('scale', scaleRange, (v) => engine.setScale(v), parseFloat);
  loadSetting('rotation', rotateRange, (v) => engine.setRotation(v), parseFloat);
  loadSetting('bgColor', bgColorInput, (v) => engine.setBgColor(v));

  // Complex settings: text positions (JSON object)
  const savedPositions = localStorage.getItem('textPositions');
  if (savedPositions) {
    engine.setTextPositions(JSON.parse(savedPositions));
  }

  // Load the image: use localStorage if available, otherwise use default
  const savedImage = localStorage.getItem('meme');
  defaultImageElement.onload = () => engine.setImage(defaultImageElement);
  defaultImageElement.src = savedImage ? savedImage : defaultImageFile;
}

/**
 * Saves the current text positions to LocalStorage.
 */
function saveTextPositions() {
  localStorage.setItem('textPositions', JSON.stringify(engine.getTextPositions()));
}


// ==========================================
// 7. UTILITY
// ==========================================

/**
 * Sets the canvas dimensions based on the window size.
 */
function createCanvas() {
  const size = Math.min(600, window.innerWidth - 30);
  canvas.width = size;
  canvas.height = size;
}

/**
 * Handles the file upload process for new images.
 */
function loadImage() {
  if (imageInput.files && imageInput.files[0]) {
    let reader = new FileReader();
    reader.onload = () => {
      const newImage = new Image();
      newImage.onload = () => {
        engine.setImage(newImage);
        localStorage.setItem('meme', newImage.src);
      };
      newImage.src = reader.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
}

/**
 * Handles the download button click, exporting the canvas as a PNG.
 */
function downloadMeme() {
  const imageSource = engine.exportDataURL();
  downloadButton.setAttribute('href', imageSource);
  saveTextPositions();
}

// Start the application
window.onload = init;
