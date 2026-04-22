import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/styles.css';
import { BookModel } from './model.js';
import { BookView } from './view.js';
import { BookController } from './controller.js';

document.addEventListener('DOMContentLoaded', () => {
  new BookController(new BookModel(), new BookView());
});