/* By Brian Bird spring 2026 based on code from Mari Good in 2024,
refactored using GitHub Copilot */

import { fetchQuote } from './quoteService.js';
import { fetchHowToLink } from './tavilyService.js';

export class TaskController {
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

    // Fetch a motivational quote asynchronously; the view updates when it resolves.
    this.loadQuote();
  }

  onTodoListChanged = (tasks) => {
    this.view.displayTasks(tasks);
  };

  async loadQuote() {
    const quoteData = await fetchQuote();
    this.view.displayQuote(quoteData);
  }

  handleAddTask = async (taskDescription) => {
    this.view.clearApiError();
    const index = this.model.tasks.length;
    this.model.addTask(taskDescription);
    const linkData = await fetchHowToLink(taskDescription);
    if (linkData && this.model.tasks[index]?.description === taskDescription) {
      // Guard against stale index if tasks were added/deleted while the fetch was in flight.
      this.model.updateTaskLink(index, linkData);
    } else if (!linkData) {
      this.view.showApiError('Could not fetch a how-to link for this task. The task was saved.');
    }
  };

  handleDeleteTask = (index) => {
    this.model.deleteTask(index);
  };

  handleToggleTask = (index) => {
    this.model.toggleTaskStatus(index);
  };
}
