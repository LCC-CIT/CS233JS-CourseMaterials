import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/styles.css';
import { TaskModel } from './model.js';
import { TaskView } from './view.js';
import { TaskController } from './controller.js';

document.addEventListener('DOMContentLoaded', () => {
  new TaskController(new TaskModel(), new TaskView());
});
