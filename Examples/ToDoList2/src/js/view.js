import { html, render } from 'lit-html';
// Importing a templating package that simplifies creating the task HTML code.
// Documentation for lit-html is here: https://lit.dev/docs/templates/overview/

export class TaskView {
  constructor() {
    // Cache DOM references once to avoid repeated lookups during frequent UI updates.
    this.app = document.getElementById('taskList');
    this.quoteArea = document.getElementById('motivationalQuote');
    this.input = document.getElementById('addTask');
    this.addButton = document.getElementById('addButton');
  }

  get taskDescription() {
    return this.input.value;
  }

  resetInput() {
    this.input.value = '';
    this.input.classList.remove('is-invalid');
  }

  showInvalidInput() {
    this.input.classList.add('is-invalid');
  }

  displayQuote(quoteData) {
    // Silently no-op when the API failed so the rest of the UI is unaffected.
    if (!quoteData) return;
    render(this.quoteTemplate(quoteData), this.quoteArea);
  }

  quoteTemplate({ quote, author }) {
    return html`
      <blockquote class="blockquote quote-banner">
        <p class="mb-2">${quote}</p>
        <footer class="blockquote-footer">${author}</footer>
      </blockquote>
    `;
  }

  displayTasks(tasks) {
    // Render from model state so the DOM reflects source-of-truth data.
    render(this.tasksTemplate(tasks), this.app);
  }

  tasksTemplate(tasks) {
    return html`
      ${tasks.map((task, index) => this.taskTemplate(task, index))}
    `;
  }

  taskTemplate({ description, isComplete, howToLink }, index) {
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
        ${howToLink ? html`
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 how-to-link">
              <a href="${howToLink.url}" target="_blank" rel="noopener noreferrer">${howToLink.title}</a>
            </div>
          </div>
        ` : ''}
      </li>
    `;
  }

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
