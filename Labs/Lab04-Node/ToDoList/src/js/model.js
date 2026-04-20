export class TaskModel {
  constructor() {
    try {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
      if (!this.tasks) throw new Error("No tasks found");
    } catch {
      this.tasks = [
        { description: 'Go to Dentist', isComplete: false },
        { description: 'Do Gardening', isComplete: true },
        { description: 'Renew Library Account', isComplete: false },
      ];
    }
  }

  _commit(tasks) {
    this.tasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onTodoListChanged(tasks);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  addTask(taskDescription) {
    const newTask = { description: taskDescription, isComplete: false };
    this.tasks.push(newTask);
    this._commit(this.tasks);
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this._commit(this.tasks);
  }

  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this._commit(this.tasks);
  }
}
