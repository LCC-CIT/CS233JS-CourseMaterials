/**
 * @file canvasModel.js
 * Data model holding all settings and methods needed to render the canvas. */
 /* Written by Brian Bird spring 2026 with AI assistance.
 */

import * as LenaJS from 'lena.js';

const STORAGE_KEY = 'mememaker-model';

/**
 * Stores the current state of the canvas rendering parameters and draws itself.
 */
export default class CanvasModel {
    /** @type {HTMLImageElement|null} The image to draw on the canvas. */
    #image = null;

    /** @type {string|null} URL or data URL of the image, used for persistence. */
    #imageUrl = null;

    /** @type {string} */
    #topText = '';

    /** @type {string} */
    #bottomText = '';

    /** @type {string} Active filter name (e.g. 'none', 'grayscale'). */
    #filter = 'none';

    /** @type {number} Scale multiplier (1 = original size). */
    #scale = 1;

    /** @type {number} Rotation in degrees. */
    #rotate = 0;

    /** @type {string} CSS hex color string for the background. */
    #bgColor = '#000000';

    /** @type {HTMLCanvasElement} The canvas element to draw on. */
    #canvasElement = null;

    /**
     * @param {HTMLCanvasElement} canvasElement The canvas element to draw on.
     */
    constructor(canvasElement) {
        this.#canvasElement = canvasElement;
    }

    // ==========================================
    // SETTERS
    // ==========================================

    /**
     * Bulk updates model properties from a settings object without triggering immediate redraws.
     * Keys left out (or set to undefined) leave the corresponding field at its current value.
     * @param {object} settings
     */
    setAll(settings) {
        if (settings.imageUrl !== undefined) {
            this.#imageUrl = settings.imageUrl;
        }
        if (settings.topText !== undefined) {
            this.#topText = settings.topText;
        }
        if (settings.bottomText !== undefined) {
            this.#bottomText = settings.bottomText;
        }
        if (settings.filter !== undefined) {
            this.#filter = settings.filter;
        }
        if (settings.scale !== undefined) {
            this.#scale = settings.scale;
        }
        if (settings.rotate !== undefined) {
            this.#rotate = settings.rotate;
        }
        if (settings.bgColor !== undefined) {
            this.#bgColor = settings.bgColor;
        }
    }

    set image(value) {
        this.#image = value;
        if (!value) {
            this.#imageUrl = null;
            this.#storeInLocalStorage();
            return;
        }

        const resizeImage = () => {
            const canvas = this.#canvasElement;
            if (!canvas) {
                return;
            }
            
            const w = canvas.width;
            const h = canvas.height;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(value, 0, 0, w, h);
            this.#imageUrl = canvas.toDataURL('image/jpeg', 0.7);
            this.#storeInLocalStorage();
            this.render();
        };

        if (value.complete) {
            resizeImage();
        } else {
            value.addEventListener('load', resizeImage, { once: true });
        }
    }

    set topText(value) {
        this.#topText = value;
        this.#storeInLocalStorage();
    }

    set bottomText(value) {
        this.#bottomText = value;
        this.#storeInLocalStorage();
    }

    set filter(value) {
        this.#filter = value;
        this.#storeInLocalStorage();
    }

    set scale(value) {
        this.#scale = value;
        this.#storeInLocalStorage();
    }

    set rotate(value) {
        this.#rotate = value;
        this.#storeInLocalStorage();
    }

    set bgColor(value) {
        this.#bgColor = value;
        this.#storeInLocalStorage();
    }

    /** Persists the model state (excluding the non-serializable image element) to localStorage. */
    #storeInLocalStorage() {
        const serializable = {
            imageUrl: this.#imageUrl,
            topText: this.#topText,
            bottomText: this.#bottomText,
            filter: this.#filter,
            scale: this.#scale,
            rotate: this.#rotate,
            bgColor: this.#bgColor
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    }

    /**
     * Loads the previously saved model state from localStorage and applies it to this instance.
     * @returns {object|null} The parsed stored object, or null if none exists.
     */
    loadFromLocalStorage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            this.setAll(parsed);
            return parsed;
        }
        return null;
    }

    /**
     * Clears the canvas and redraws the image using the current model state.
     */
    render() {
        if (!this.#canvasElement) {
            return;
        }
        const ctx = this.#canvasElement.getContext('2d');
        const { width, height } = this.#canvasElement;

        ctx.clearRect(0, 0, width, height);

        if (this.#image) {
            // Scale and rotate around the canvas center so the image stays anchored to the middle.
            ctx.save();
            ctx.translate(width / 2, height / 2);
            ctx.rotate(this.#rotate * Math.PI / 180);
            ctx.scale(this.#scale, this.#scale);
            ctx.translate(-width / 2, -height / 2);
            ctx.drawImage(this.#image, 0, 0, width, height);
            ctx.restore();

            // Filter runs over the canvas pixel data after the image is drawn.
            if (this.#filter !== 'none') {
                const imageData = ctx.getImageData(0, 0, width, height);
                ctx.putImageData(LenaJS[this.#filter](imageData), 0, 0);
            }
        }

        // Draw background behind the image using destination-over
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = this.#bgColor;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over'; // restore default

        this.#drawText(ctx);
    }

    /**
     * Draws top and bottom meme text onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     */
    #drawText(ctx) {
        if (!this.#canvasElement) {
            return;
        }
        const { width, height } = this.#canvasElement;
        const fontSize = Math.floor(width / 10);
        ctx.font = `bold ${fontSize}px Impact, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize / 10;

        if (this.#topText) {
            ctx.fillText(this.#topText, width / 2, fontSize);
            ctx.strokeText(this.#topText, width / 2, fontSize);
        }
        if (this.#bottomText) {
            ctx.fillText(this.#bottomText, width / 2, height - fontSize / 4);
            ctx.strokeText(this.#bottomText, width / 2, height - fontSize / 4);
        }
    }
}
