/**
 * profileUiController.js
 * 
 * This module acts as the Controller in the application's architecture.
 * It is responsible for all DOM interactions and event listening.
 */

import './general';
import ProfileLogicService from './profileLogicService';

// ==========================================
// 1. DOM REFERENCES
// ==========================================

const imageInput = document.getElementById('image');
const bottomTextInput = document.getElementById('bottomText');
const downloadButton = document.getElementById('downloadPic');
const userImage = document.getElementById('userImage');
const canvas = document.getElementById('imgCanvas');

const defaultUserImage = "/images/img_whenYourCodeWorks_big.jpg";

// Instantiate the logic layer
const engine = new ProfileLogicService(canvas);

// ==========================================
// 2. INITIALIZATION
// ==========================================

/**
 * Initializes the application on window load.
 */
function init() {
  createCanvas();
  
  // Load default image
  userImage.onload = () => engine.setImage(userImage);
  userImage.src = defaultUserImage;

  addEventHandlers();
}

// ==========================================
// 3. EVENT HANDLERS
// ==========================================

/**
 * Orchestrates the binding of all application event listeners.
 */
function addEventHandlers() {
  imageInput.addEventListener('change', loadImage);
  
  bottomTextInput.addEventListener('keyup', () => {
    engine.setBottomText(bottomTextInput.value);
  });

  downloadButton.addEventListener('click', downloadPic);
}

// ==========================================
// 4. UTILITY
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
      userImage.onload = () => {
        engine.setImage(userImage);
      };
      userImage.src = reader.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
}

/**
 * Handles the download button click, exporting the canvas as a PNG.
 * @param {Event} e - The click event.
 */
function downloadPic(e) {
  e.preventDefault();
  const imageSource = engine.exportDataURL();
  const a = document.createElement('a');
  a.href = imageSource;
  a.download = 'profile.png';
  a.click();
}

window.onload = init;
