/**
 * MemeText.js
 * Represents a line of meme text (top or bottom) and knows how to render itself.
 * The text can be repositioned by dragging.
 */

const HITBOX_PADDING = 10;

export default class MemeText {
  /**
   * @param {string} position - Either 'top' or 'bottom'. Used for default placement.
   */
  constructor(position) {
    this.text = '';
    this.position = position;

    // Coordinates are set to null initially, meaning "use default position"
    this.x = null;
    this.y = null;

    // Cached dimensions from the last render, used for hit-testing
    this._width = 0;
    this._height = 0;
  }

  /**
   * Initializes the default x/y position based on canvas dimensions.
   * Only sets position if it hasn't been manually set yet.
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  setDefaultPosition(canvasWidth, canvasHeight) {
    if (this.x === null) this.x = canvasWidth / 2;
    if (this.y === null) {
      this.y = this.position === 'top'
        ? canvasHeight * 0.05
        : canvasHeight * 0.90;
    }
  }

  /**
   * Checks if a given point falls within this text's clickable area.
   * @param {number} px
   * @param {number} py
   * @returns {boolean}
   */
  containsPoint(px, py) {
    if (!this.text || this.x === null) return false;
    const halfW = this._width / 2 + HITBOX_PADDING;
    const halfH = this._height / 2 + HITBOX_PADDING;
    return Math.abs(px - this.x) < halfW && Math.abs(py - this.y) < halfH;
  }

  /**
   * Shifts the text position by a delta.
   * @param {number} dx
   * @param {number} dy
   */
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  /**
   * Draws the meme text onto the canvas.
   * @param {CanvasRenderingContext2D} context
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  render(context, canvasWidth, canvasHeight) {
    if (!this.text) return;

    // Set default position if not yet placed
    this.setDefaultPosition(canvasWidth, canvasHeight);

    const displayText = this.text.toUpperCase();

    // Calculate font size relative to canvas dimensions
    const fontSize = ((canvasWidth + canvasHeight) / 2) * 4 / 100;

    context.save();
    context.font = `${fontSize}pt sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.lineWidth = fontSize / 5;
    context.strokeStyle = 'black';
    context.fillStyle = 'white';

    // Cache dimensions for hit-testing
    const metrics = context.measureText(displayText);
    this._width = metrics.width;
    this._height = fontSize * 1.2;

    context.strokeText(displayText, this.x, this.y);
    context.fillText(displayText, this.x, this.y);
    context.restore();
  }
}
