import { html, render } from 'lit-html';
// Importing a templating package that simplifies creating the task HTML code.
// Documentation for lit-html is here: https://lit.dev/docs/templates/overview/
export class TaskView {
  /** Initializes the TaskView, caching DOM elements for efficient access. */
  constructor() {
    // Cache DOM references once to avoid repeated lookups during frequent UI updates.
    this.app = document.getElementById('taskList');
    this.input = document.getElementById('addTask');
    this.addButton = document.getElementById('addButton');
  }

  /** Returns the current value of the task input field. */
  get taskDescription() {
    return this.input.value;
  }

  /** Clears the input field and removes any invalid styling. */
  resetInput() {
    this.input.value = '';
    this.input.classList.remove('is-invalid');
  }

  /** Adds invalid styling to the input field to indicate an error. */
  showInvalidInput() {
    this.input.classList.add('is-invalid');
  }

  /** Renders the list of tasks to the DOM using the tasks template. */
  displayTasks(tasks) {
    // Render from model state so the DOM reflects source-of-truth data.
    render(this.tasksTemplate(tasks), this.app);
  }

  /** Generates the HTML template for the list of tasks. */
  tasksTemplate(tasks) {
    return html`
      ${tasks.map((task, index) => this.taskTemplate(task, index))}
    `;
  }

  /** Generates the HTML template for a single task item. */
  taskTemplate({ description, isComplete }, index) {
    return html`
      <li class="list-group-item checkbox" data-index="${index}">
        <div class="row">
          <div class="col-sm-1 pt-2 checkbox">
            <label>
              <input name="toggleTaskStatus" type="checkbox" value="" .checked=${isComplete}>
            </label>
          </div>
          <div class="col-sm-10 task-text ${isComplete ? "complete" : ""}">
            ${description}
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <button name="deleteTask" type="button" class="btn p-0 border-0" aria-label="Delete task"><i class="bi-trash delete-icon"></i></button>
          </div>
        </div>
      </li>
    `;
  }

  /** Registers the add task event handler for the add button. */
  onAddTask(handler) {
    this.addButton.addEventListener('click', () => {
      if (this.taskDescription.trim() !== '') {
        handler(this.taskDescription);
        this.resetInput();
      } else {
        // Immediate visual feedback reduces invalid submits and user confusion.
        this.showInvalidInput();
      }
    });
  }

  /** Registers the delete task event handler for delete buttons. */
  onDeleteTask(handler) {
    // Delegate from list container so handlers keep working after list re-renders.
    this.app.addEventListener('click', ({ target }) => {
      const deleteItem = target.closest('button[name="deleteTask"]');
      if (deleteItem) {
        const index = parseInt(deleteItem.closest('li').getAttribute('data-index'), 10);
        handler(index);
      }
    });
  }

  /** Registers the toggle task event handler for checkboxes. */
  onToggleTask(handler) {
    // Delegate from list container so dynamic checkboxes do not need per-item listeners.
    this.app.addEventListener('change', ({ target }) => {
      if (target.name === 'toggleTaskStatus') {
        const index = parseInt(target.closest('li').getAttribute('data-index'), 10);
        handler(index);
      }
    });
  }
}
