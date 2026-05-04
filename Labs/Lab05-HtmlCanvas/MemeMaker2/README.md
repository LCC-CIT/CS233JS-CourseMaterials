# Meme Maker: Modular Architectural Reference

This project serves as an educational reference for implementing a decoupled, object-oriented web application using the HTML5 Canvas API and Vite. The implementation demonstrates a strict separation of concerns through a modular architecture that distinguishes between core logic and infrastructure (I/O).

## Architectural Implementation

The codebase is organized into distinct layers to facilitate modularity and testability.

### 1. The Controller Layer (`memeUiController.js`)
This module manages all interactions between the browser's Document Object Model (DOM) and the application logic. Its responsibilities include:
- Initializing event listeners for user input.
- Managing data persistence via the Web Storage API (`localStorage`).
- Translating DOM events into instructions for the logic layer.
- Implementing DRY (Don't Repeat Yourself) patterns through higher-order helper functions for state synchronization.

### 2. The Logic Layer (`memeLogicService.js`)
The logic layer, implemented by the `MemeLogicService` class, acts as the central coordinator for the application state and the rendering pipeline. It is decoupled from the DOM to ensure that the core logic is independent of the UI. It handles:
- **State Management**: Tracks image data, text content, and transformation values (scale, rotation).
- **Interaction Management**: Manages internal flags for transient states such as text dragging.
- **Rendering Pipeline**: Orchestrates the rendering sequence of multiple visual layers.
- **Graphic Constraints**: Applies global constraints, such as the master clipping path for rounded corner aesthetics.
- **Dynamic Layout Algorithms**: Calculates vertical image offsets when specific text elements are absent.

### 3. Encapsulated Component Classes (`src/js/classes/`)
Visual elements are encapsulated within specialized classes, each responsible for its own internal state and rendering logic:
- **`ImageLayer`**: Implements image transformation matrices (scaling, rotation) and integrates with the `LenaJS` library for pixel-level filter processing.
- **`MemeText`**: Manages string data, coordinate state for drag-and-drop interaction, and uses the Canvas API for specialized typography rendering (stroked and filled text).

## Technical Capabilities

- **Coordinate Mapping and Hit-Testing**: Implements geometric intersection checks to enable direct manipulation (dragging) of text elements within the canvas coordinate system.
- **Transformation Pipeline**: Utilizes canvas state management (`save`/`restore`) to apply complex transformations, including translation, rotation, and scaling around a central pivot point.
- **Data Persistence**: Implements a synchronized state model that ensures all user-defined parameters are persisted across browser sessions.
- **External Library Integration**: Demonstrates the integration of third-party image processing libraries (`LenaJS`) within a modular rendering pipeline.
- **Dynamic Layout Algorithms**: Features an automated positioning algorithm that adjusts image placement based on the presence of specific metadata (text content).

## Development Environment

The project is configured for a modern development workflow:
- **Build System**: [Vite](https://vitejs.dev/) for optimized module bundling and Hot Module Replacement (HMR).
- **Standards**: ES6+ JavaScript modules.
- **Dependencies**: [Bootstrap 5](https://getbootstrap.com/) for layout and [LenaJS](https://github.com/davidsonfellipe/lena.js) for image processing.

---
*Authored for the CS233JS curriculum as a reference implementation for Lab 05.*
