// Created by Brian Bird in spring 2026 using Gemini 3.1 Pro.

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/styles.css';

import { BookModel } from './model.js';
import { BookView } from './view.js';
import { BookController } from './controller.js';

/**
 * Overview:
 * BookList is an application to keep track of books you want to read,
 * are currently reading, or have finished. You can search OpenLibrary
 * to automatically fetch book data, or enter it manually.
 * Finished books can be rated. All data is persisted to localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize MVC architecture
  const model = new BookModel();
  const view = new BookView();
  // Controller bridges the View and Model
  const controller = new BookController(model, view);
});
