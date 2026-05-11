/**
 * @file canvasModel.js
 * Plain data model holding all settings needed to render the canvas.
 */

import * as LenaJS from 'lena.js';

const STORAGE_KEY = 'mememaker-model';

/**
 * Stores the current state of the canvas rendering parameters and draws itself.
 */
export default class CanvasModel {
    constructor() {
        /** @type {HTMLImageElement|null} The image to draw on the canvas. */
        this.image = null;
        /** @type {string|null} URL or data URL of the image, used for persistence. */
        this.imageUrl = null;
        /** @type {string} */
        this.topText = '';
        /** @type {string} */
        this.bottomText = '';
        /** @type {string} Active filter name (e.g. 'none', 'grayscale'). */
        this.filter = 'none';
        /** @type {number} Scale multiplier (1 = original size). */
        this.scale = 1;
        /** @type {number} Rotation in degrees. */
        this.rotate = 0;
        /** @type {string} CSS hex color string for the background. */
        this.bgColor = '#ffffff';
    }

    /** Persists the model state (excluding the non-serializable image element) to localStorage. */
    storeInLocalStorage() {
        const { image, ...serializable } = this;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
        } catch {
            // QuotaExceededError: data URL too large — silently skip
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

        // Background — visible only when the image is scaled down or rotated away from the edges.
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, width, height);

        // Scale and rotate around the canvas center so the image stays anchored to the middle.
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(this.rotate * Math.PI / 180);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-width / 2, -height / 2);
        ctx.drawImage(this.image, 0, 0, width, height);
        ctx.restore();

        // Filter runs over the canvas pixel data after the image is drawn; text is layered on top after.
        if (this.filter !== 'none') {
            const imageData = ctx.getImageData(0, 0, width, height);
            ctx.putImageData(LenaJS[this.filter](imageData), 0, 0);
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
