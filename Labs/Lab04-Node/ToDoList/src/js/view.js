export class TaskView {
  constructor() {
    // Cache DOM references once to avoid repeated lookups during frequent UI updates.
    this.app = document.getElementById('taskList');
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

  displayTasks(tasks) {
    // Rebuild from model state to guarantee the DOM reflects source-of-truth data.
    const tasksHtml = tasks.reduce(
      (html, task, index) => html += this.generateTaskHtml(task, index), ''
    );
    this.app.innerHTML = tasksHtml;
  }

  generateTaskHtml({ description, isComplete }, index) {
    return `
      <li class="list-group-item checkbox" data-index="${index}">
        <div class="row">
          <div class="col-sm-1 pt-2 checkbox">
            <label><input name="toggleTaskStatus" type="checkbox" value="" class="" ${isComplete ? "checked" : ""}></label>
          </div>
          <div class="col-sm-10 task-text ${isComplete ? "complete" : ""}">
            ${description}
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <a name="deleteTask" class="" href="/" ><i class="bi-trash delete-icon"></i></a>
          </div>
        </div>
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
    this.app.addEventListener('click', ({ target, preventDefault }) => {
      const deleteItem = target.closest('a[name="deleteTask"]');
      if (deleteItem) {
        // Prevent anchor navigation because deletion should stay in the current app state.
        preventDefault();
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
