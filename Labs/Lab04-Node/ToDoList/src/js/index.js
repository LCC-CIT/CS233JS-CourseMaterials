import { TaskModel } from './model.js';
import { TaskView } from './view.js';
import { TaskController } from './controller.js';

document.addEventListener('DOMContentLoaded', () => {
  new TaskController(new TaskModel(), new TaskView());
});
