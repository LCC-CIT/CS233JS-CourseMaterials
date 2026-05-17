/**
 * @file main.js
 * Application entry point. */
 /* Adapted by Brian Bird, 5/9/2024 from code provided by Mari Good, 
 *  Refactored extensively by B. Bird 5/16/26 with AI assistance.
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import { init } from './memeUiController.js';

init();  // Calls init after import module is done which means DOM is loaded too.

// ==========================================
// DEVELOPMENT MODE DEBUGGING SETUP
// ==========================================

// Make objeccts available in the console for debugging when in dev mode
// (meta.env is set by Vite)
if (import.meta.env !== undefined && import.meta.env.DEV) {
    window.memeUiController = { init };
}
