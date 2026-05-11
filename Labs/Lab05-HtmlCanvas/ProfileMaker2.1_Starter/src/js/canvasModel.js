/**
 * @file canvasModel.js
 * Plain data model holding all settings needed to render the canvas.
 */

/**
 * Stores the current state of the canvas rendering parameters and draws itself.
 */
export default class CanvasModel {
    constructor() {
        /** @type {HTMLImageElement|null} The image to draw on the canvas. */
        this.image = null;
    }

    /**
     * Clears the canvas and draws the current image stretched to fill it.
     * @param {HTMLCanvasElement} canvasElement
     */
    render(canvasElement) {
        const ctx = canvasElement.getContext('2d');
        const { width, height } = canvasElement;

        ctx.clearRect(0, 0, width, height);

        if (this.image) {
            ctx.drawImage(this.image, 0, 0, width, height);
        }
    }
}
