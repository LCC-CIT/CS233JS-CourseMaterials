/**
 * @file main.js
 * Application entry point.
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import { init, canvasModel } from './profileUiController.js';

init();  // Calls init after import module is done which means DOM is loaded too.

// ==========================================
// DEVELOPMENT MODE DEBUGGING SETUP
// ==========================================

// Make objects available in the console for debugging when in dev mode
// (meta.env is set by Vite)
if (import.meta.env !== undefined && import.meta.env.DEV) {
    window.profileUiController = { init };
    window.canvasModel = canvasModel;
}
