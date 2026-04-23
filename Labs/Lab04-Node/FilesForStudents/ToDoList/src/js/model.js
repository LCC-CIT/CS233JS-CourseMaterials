/* By Brian Bird spring 2026 based on code from Mari Good in 2024, 
refactored using GitHub Copilot */

export class TaskModel {
  /** Initializes the TaskModel, loading tasks from localStorage or using default tasks. */
  constructor() {
    try {
      // Restore prior user state so tasks persist between browser sessions.
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (!Array.isArray(savedTasks) || !savedTasks.every((task) => this.isValidTask(task))) {
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

  /** Validates if a task object has the required properties and types. */
  isValidTask(task) {
    return (
      typeof task === 'object' &&
      task !== null &&
      typeof task.description === 'string' &&
      typeof task.isComplete === 'boolean'
    );
  }

  /** Updates the task list and persists changes to localStorage while notifying subscribers. */
  
  commit(tasks) {
    // Persist and notify together so storage and UI do not drift out of sync.
    this.tasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onTodoListChanged(tasks);
  }

  /** Registers a callback to be invoked when the task list changes. */
  subscribeTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  /** Adds a new task with the given description, defaulting to incomplete status. */
  addTask(taskDescription) {
    // New tasks default to incomplete to match typical todo workflow expectations.
    const newTask = { description: taskDescription, isComplete: false };
    this.commit([...this.tasks, newTask]);
  }

  /** Removes the task at the specified index from the task list. */
  deleteTask(index) {
    this.commit(this.tasks.filter((_, taskIndex) => taskIndex !== index));
  }

  /** Toggles the completion status of the task at the specified index. */
  toggleTaskStatus(index) {
    this.commit(
      this.tasks.map((task, taskIndex) =>
        taskIndex === index ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }
}
