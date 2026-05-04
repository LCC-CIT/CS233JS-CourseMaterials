/**
 * memeLogicService.js
 *
 * This module contains the core logical and graphical processing for the Meme Creator.
 * It manages state and orchestrates the rendering of component classes.
 * It is completely decoupled from the DOM and does not handle user events directly.
 */

import ImageLayer from './classes/ImageLayer';
import MemeText from './classes/MemeText';

export default class MemeLogicService {
  /**
   * Initializes the engine with a target canvas.
   * @param {HTMLCanvasElement} canvas - The canvas to draw on.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // The source image element
    this.userImage = null;
    this.filterSelection = 'none';
    this.scale = 1;
    this.rotation = 0;
    this.bgColor = '#000000';

    // Rendering components
    this.imageLayer = new ImageLayer();
    this.topText = new MemeText('top');
    this.bottomText = new MemeText('bottom');

    // Interaction State
    this.draggingText = null;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  // --- PUBLIC API ---

  /**
   * Sets the source image and triggers a re-render.
   * @param {HTMLImageElement} imgElement - The loaded image object.
   */
  setImage(imgElement) {
    this.userImage = imgElement;
    this.render();
  }

  /**
   * Updates the top text string and triggers a re-render.
   * @param {string} text
   */
  setTopText(text) {
    this.topText.text = text;
    this.render();
  }

  /**
   * Updates the bottom text string and triggers a re-render.
   * @param {string} text
   */
  setBottomText(text) {
    this.bottomText.text = text;
    this.render();
  }

  /**
   * Updates the active image filter and triggers a re-render.
   * @param {string} filterName - LenaJS filter name, or 'none'.
   */
  setFilter(filterName) {
    this.filterSelection = filterName;
    this.render();
  }

  /**
   * Updates the image scale factor and triggers a re-render.
   * @param {number} scale
   */
  setScale(scale) {
    this.scale = scale;
    this.render();
  }

  /**
   * Updates the image rotation (in degrees) and triggers a re-render.
   * @param {number} degrees
   */
  setRotation(degrees) {
    this.rotation = degrees;
    this.render();
  }

  /**
   * Updates the background color and triggers a re-render.
   * @param {string} color - CSS color string.
   */
  setBgColor(color) {
    this.bgColor = color;
    this.render();
  }

  // --- INTERACTION HANDLING ---

  /**
   * High-level entry point for a pointer/mouse down event.
   * @param {number} x - Click X coordinate.
   * @param {number} y - Click Y coordinate.
   * @returns {boolean} True if a text element was clicked.
   */
  handlePointerDown(x, y) {
    const hitText = this.hitTestText(x, y);
    if (hitText) {
      this.draggingText = hitText;
      this.lastMouseX = x;
      this.lastMouseY = y;
      return true;
    }
    return false;
  }

  /**
   * High-level entry point for a pointer/mouse move event.
   * @param {number} x - Current X coordinate.
   * @param {number} y - Current Y coordinate.
   * @returns {boolean} True if an element was dragged (requiring a save).
   */
  handlePointerMove(x, y) {
    if (!this.draggingText) return false;

    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;

    this.draggingText.move(dx, dy);
    this.lastMouseX = x;
    this.lastMouseY = y;
    this.render();
    
    return true;
  }

  /**
   * High-level entry point for a pointer/mouse up event.
   */
  handlePointerUp() {
    this.draggingText = null;
  }

  /**
   * Determines if a click coordinate intersects with either text element.
   * @param {number} x - Click X coordinate.
   * @param {number} y - Click Y coordinate.
   * @returns {MemeText|null} The text object that was hit, or null.
   */
  hitTestText(x, y) {
    if (this.topText.containsPoint(x, y)) return this.topText;
    if (this.bottomText.containsPoint(x, y)) return this.bottomText;
    return null;
  }

  /**
   * Determines if a click coordinate intersects with either text element.
   * @param {number} x - Click X coordinate.
   * @param {number} y - Click Y coordinate.
   * @returns {MemeText|null} The text object that was hit, or null.
   */
  hitTestText(x, y) {
    if (this.topText.containsPoint(x, y)) return this.topText;
    if (this.bottomText.containsPoint(x, y)) return this.bottomText;
    return null;
  }

  /**
   * Returns the current text positions for persistence.
   * @returns {Object} Position data for top and bottom text.
   */
  getTextPositions() {
    return {
      topX: this.topText.x,
      topY: this.topText.y,
      bottomX: this.bottomText.x,
      bottomY: this.bottomText.y
    };
  }

  /**
   * Restores text positions from saved data.
   * @param {Object} positions - Saved position data.
   */
  setTextPositions(positions) {
    if (positions.topX !== null) {
      this.topText.x = positions.topX;
      this.topText.y = positions.topY;
    }
    if (positions.bottomX !== null) {
      this.bottomText.x = positions.bottomX;
      this.bottomText.y = positions.bottomY;
    }
  }

  /**
   * Generates a base64 PNG representation of the current canvas.
   * @returns {string} Data URL.
   */
  exportDataURL() {
    return this.canvas.toDataURL('image/png');
  }

  // --- INTERNAL RENDERING LOGIC ---

  /**
   * Calculates vertical image offset to center the image above bottom text
   * when there is no top text. Returns 0 if both texts exist or neither does.
   * @returns {number} Vertical offset in pixels.
   */
  calculateImageOffset() {
    if (this.topText.text || !this.bottomText.text) return 0;
    const bottomTextY = this.bottomText.y ?? this.canvas.height * 0.90;
    return (bottomTextY - this.canvas.height) / 2;
  }

  /**
   * The main drawing pipeline. Clears the canvas and renders all layers in order.
   */
  render() {
    if (!this.userImage) return;

    // Scale canvas height to match the image's aspect ratio (must be done first,
    // as setting canvas.height clears the canvas)
    const scaleFactor = this.canvas.width / this.userImage.width;
    this.canvas.height = this.userImage.height * scaleFactor;

    // Clip the entire canvas to a rounded rectangle
    const cornerRadius = 20;
    this.context.save();
    this.context.beginPath();
    this.context.roundRect(0, 0, this.canvas.width, this.canvas.height, cornerRadius);
    this.context.clip();

    // 0. Fill background color
    this.context.fillStyle = this.bgColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw Background Image with transforms and filter
    const panY = this.calculateImageOffset();
    this.imageLayer.render(this.context, this.canvas, this.userImage, this.filterSelection, this.scale, this.rotation, panY);

    // 2. Draw Top Text
    this.topText.render(this.context, this.canvas.width, this.canvas.height);

    // 3. Draw Bottom Text
    this.bottomText.render(this.context, this.canvas.width, this.canvas.height);

    // Restore context (release the rounded-rect clip)
    this.context.restore();
  }
}
