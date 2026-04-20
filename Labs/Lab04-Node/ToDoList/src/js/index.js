// Import styles from JS so Vite can fingerprint and bundle them for cache-safe deploys.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/styles.css';
import { TaskModel } from './model.js';
import { TaskView } from './view.js';
import { TaskController } from './controller.js';

/*  Overview
    This application simulates an electronic todo list.  Users can add and delete
    tasks from the list.  They can also mark that a task is complete.  The list
    of tasks is stored on the user's machine in the Browser's local storage so that the tasks
    persist over time.

    Adapted by Brian Bird spring 2024 using starter files from Mari Good 
    Refactored into separate classes and modeles, loosely following the MVC pattern 
    by Brian Bird using GitHub Copilot in spring of 2026
*/

document.addEventListener('DOMContentLoaded', () => {
  // Wire MVC only after the DOM exists so selectors in TaskView always resolve.
  new TaskController(new TaskModel(), new TaskView());
});
