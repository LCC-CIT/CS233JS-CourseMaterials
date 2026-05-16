/**
 * @file canvasModel.js
 * Plain data model holding all settings needed to render the canvas.
 */

const STORAGE_KEY = 'mememaker-model';

/**
 * Stores the current state of the canvas rendering parameters and draws itself.
 */
export default class CanvasModel {
    constructor() {
        /** @type {HTMLImageElement|null} The image to draw on the canvas. */
        this.image = null;

        this.imageUrl = ``;
        
        /** @type {string} */
        this.topText = '';

        /** @type {string} */
        this.bottomText = '';
    }

  /** Persists the model state (excluding the non-serializable image element) to localStorage. */
    storeInLocalStorage() {
        const { image, ...serializable } = this;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
        } catch {
            // QuotaExceededError: data URL too large — silently skip
            console.log("Data URL was too big for localStorage");
        }
    }

        /**
     * Returns the previously saved model state, or null if none exists.
     * @returns {object|null}
     */
    static loadFromLocalStorage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    /**
     * Clears the canvas and redraws the image using the current model state.
     * @param {HTMLCanvasElement} canvasElement
     */
    render(canvasElement) {
        const ctx = canvasElement.getContext('2d');
        const { width, height } = canvasElement;

        ctx.clearRect(0, 0, width, height);

        if (this.image) {
            ctx.drawImage(this.image, 0, 0, width, height);
        }

        this.#drawText(ctx, canvasElement);
    }

    /**
     * Draws top and bottom meme text onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @param {HTMLCanvasElement} canvasElement
     */
    #drawText(ctx, canvasElement) {
        const fontSize = Math.floor(canvasElement.width / 10);
        ctx.font = `bold ${fontSize}px Impact, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize / 10;

        if (this.topText) {
            ctx.fillText(this.topText, canvasElement.width / 2, fontSize);
            ctx.strokeText(this.topText, canvasElement.width / 2, fontSize);
        }
        if (this.bottomText) {
            ctx.fillText(this.bottomText, canvasElement.width / 2, canvasElement.height - fontSize / 4);
            ctx.strokeText(this.bottomText, canvasElement.width / 2, canvasElement.height - fontSize / 4);
        }
    }
}
