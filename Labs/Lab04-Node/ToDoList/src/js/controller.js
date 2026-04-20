export class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Display initial tasks
    this.model.bindTodoListChanged(this.onTodoListChanged);
    
    this.view.bindAddTask(this.handleAddTask);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTask(this.handleToggleTask);

    // Initial render
    this.onTodoListChanged(this.model.tasks);
  }

  onTodoListChanged = (tasks) => {
    this.view.displayTasks(tasks);
  };

  handleAddTask = (taskDescription) => {
    this.model.addTask(taskDescription);
  };

  handleDeleteTask = (index) => {
    this.model.deleteTask(index);
  };

  handleToggleTask = (index) => {
    this.model.toggleTaskStatus(index);
  };
}
