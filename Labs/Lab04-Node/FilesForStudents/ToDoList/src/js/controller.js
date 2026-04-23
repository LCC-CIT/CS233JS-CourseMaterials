/* By Brian Bird spring 2026 based on code from Mari Good in 2024, 
refactored using GitHub Copilot */

export class TaskController {
  /** Initializes the TaskController, wiring model and view interactions. */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Centralize state-to-view updates here so model changes always re-render consistently.
    this.model.subscribeTodoListChanged(this.onTodoListChanged);
    
    // Register UI handlers once so interactions flow through one orchestration point.
    this.view.onAddTask(this.handleAddTask);
    this.view.onDeleteTask(this.handleDeleteTask);
    this.view.onToggleTask(this.handleToggleTask);

    // Trigger an initial paint to keep the UI in sync with persisted model state.
    this.onTodoListChanged(this.model.tasks);
  }

  /** Updates the view with the current list of tasks. */
  onTodoListChanged = (tasks) => {
    this.view.displayTasks(tasks);
  };

  /** Adds a new task with the given description to the model. */
  handleAddTask = (taskDescription) => {
    this.model.addTask(taskDescription);
  };

  /** Deletes the task at the specified index from the model. */
  handleDeleteTask = (index) => {
    this.model.deleteTask(index);
  };

  /** Toggles the completion status of the task at the specified index in the model. */
  handleToggleTask = (index) => {
    this.model.toggleTaskStatus(index);
  };
}
