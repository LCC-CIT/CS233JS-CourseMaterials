/**
 * profileLogicService.js
 * 
 * This module contains the core logical and graphical processing for the Profile Maker Starter.
 * It is responsible for state management and rendering the canvas.
 */

export default class ProfileLogicService {
  /**
   * Initializes the engine with a target canvas.
   * @param {HTMLCanvasElement} canvas - The canvas to draw on.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.userImage = null;
    this.bottomText = "";
  }

  // --- PUBLIC API ---

  /**
   * Sets the primary user image to be displayed in the background.
   * @param {HTMLImageElement} imgElement - The loaded image object.
   */
  setImage(imgElement) {
    this.userImage = imgElement;
    this.render();
  }

  /**
   * Updates the text displayed at the bottom of the canvas.
   * @param {string} text 
   */
  setBottomText(text) {
    this.bottomText = text;
    this.render();
  }

  // --- DATA EXPORT ---

  exportDataURL() {
    return this.canvas.toDataURL('image/png');
  }

  // --- RENDERING ---

  /**
   * The main drawing pipeline. Wipes the canvas and draws the image.
   */
  render() {
    if (!this.userImage) return;

    const size = this.canvas.width;
    this.context.clearRect(0, 0, size, size);

    // Calculate dimensions to fit the image inside the square canvas
    const imgAspect = this.userImage.width / this.userImage.height;
    
    let drawWidth, drawHeight;
    let dx = 0, dy = 0;

    if (imgAspect > 1) {
      // Landscape
      drawWidth = size;
      drawHeight = size / imgAspect;
      dy = (size - drawHeight) / 2;
    } else {
      // Portrait or square
      drawHeight = size;
      drawWidth = size * imgAspect;
      dx = (size - drawWidth) / 2;
    }

    this.context.drawImage(this.userImage, dx, dy, drawWidth, drawHeight);

    // Draw Bottom Text
    if (this.bottomText) {
      this.context.save();
      this.context.font = "bold 40px sans-serif";
      this.context.fillStyle = "white";
      this.context.strokeStyle = "black";
      this.context.lineWidth = 2;
      this.context.textAlign = "center";
      
      const textX = size / 2;
      const textY = size - 30; // 30px from the bottom
      
      this.context.fillText(this.bottomText, textX, textY);
      this.context.strokeText(this.bottomText, textX, textY);
      this.context.restore();
    }
  }
}
