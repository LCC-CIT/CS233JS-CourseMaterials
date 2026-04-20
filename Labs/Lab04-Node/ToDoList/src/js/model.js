/* By Brian Bird spring 2026 based on code from Mari Good in 2024, 
refactored using GitHub Copilot */

export class TaskModel {
  constructor() {
    try {
      // Restore prior user state so tasks persist between browser sessions.
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (!Array.isArray(savedTasks) || !savedTasks.every((task) => this._isValidTask(task))) {
        throw new Error("Invalid tasks payload");
      }

      this.tasks = savedTasks;
    } catch {
      // Seed starter data to keep first launch usable when storage is empty/corrupt.
      this.tasks = [
        { description: 'Go to Dentist', isComplete: false },
        { description: 'Do Gardening', isComplete: true },
        { description: 'Renew Library Account', isComplete: false },
      ];
    }
  }

  _isValidTask(task) {
    return (
      typeof task === 'object' &&
      task !== null &&
      typeof task.description === 'string' &&
      typeof task.isComplete === 'boolean'
    );
  }

  _commit(tasks) {
    // Persist and notify together so storage and UI do not drift out of sync.
    this.tasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onTodoListChanged(tasks);
  }

  subscribeTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  addTask(taskDescription) {
    // New tasks default to incomplete to match typical todo workflow expectations.
    const newTask = { description: taskDescription, isComplete: false };
    this._commit([...this.tasks, newTask]);
  }

  deleteTask(index) {
    this._commit(this.tasks.filter((_, taskIndex) => taskIndex !== index));
  }

  toggleTaskStatus(index) {
    this._commit(
      this.tasks.map((task, taskIndex) =>
        taskIndex === index ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }
}
