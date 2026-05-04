/**
 * ImageLayer.js
 * Responsible for rendering the background image with scale, rotation, and filters.
 */
import * as LenaJS from 'lena.js';

export default class ImageLayer {
  /**
   * Draws the image onto the canvas with optional transforms and filter.
   * @param {CanvasRenderingContext2D} context
   * @param {HTMLCanvasElement} canvas
   * @param {HTMLImageElement} image
   * @param {string} filterName - The LenaJS filter to apply, or 'none'.
   * @param {number} scale - Image scale factor (1 = 100%).
   * @param {number} rotation - Image rotation in degrees.
   * @param {number} panY - Vertical offset for centering.
   */
  render(context, canvas, image, filterName = 'none', scale = 1, rotation = 0, panY = 0) {
    if (!image) return;

    // Draw the image to an offscreen canvas first (for transforms and filter processing)
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Apply scale, rotation, and vertical pan transforms around the center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    tempCtx.save();
    tempCtx.translate(centerX, centerY + panY);
    tempCtx.rotate(rotation * Math.PI / 180);
    tempCtx.scale(scale, scale);
    tempCtx.translate(-centerX, -centerY);
    tempCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
    tempCtx.restore();

    // Apply filter if selected
    if (filterName !== 'none') {
      const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
      const filteredData = LenaJS[filterName](imageData);
      tempCtx.putImageData(filteredData, 0, 0);
    }

    // Composite the processed image onto the main canvas
    context.drawImage(tempCanvas, 0, 0);
  }
}
