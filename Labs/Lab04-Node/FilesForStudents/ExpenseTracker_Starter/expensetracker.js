/*  ExpenseTracker — Starter File
    This application simulates an electronic expense tracker. Users can add and delete
    expenses from the list. The list of expenses is stored in browser local storage
    so expenses persist between sessions.

    All classes and initialization code are in this single file.
*/

/* ========== Model ========== */

class ExpenseModel {
  constructor() {
    try {
      const savedExpenses = null; // array to hold expenses
      // TODO: Add a line of code that retrieves expenses from local storage into savedExpenses
      if (!Array.isArray(savedExpenses) || !this._allValid(savedExpenses)) {
        throw new Error('Invalid expense payload');
      }
      this.expenses = savedExpenses;
    } catch (e) {
      // Provide starter entries if local storage is empty/corrupt.
      this.expenses = [
        { description: 'Coffee', amount: '4.50' },
        { description: 'Lunch', amount: '12.00' }
      ];
    }
  }

  isValidExpense(expense) {
    return (
      typeof expense === 'object' &&
      expense !== null &&
      typeof expense.description === 'string' &&
      typeof expense.amount === 'string'
    );
  }

  allValid(expenses) {
    for (let i = 0; i < expenses.length; i++) {
      if (!this.isValidExpense(expenses[i])) {
        return false;
      }
    }
    return true;
  }

  commit(expenses) {
    // TODO: write this method
  }

  subscribeExpenseListChanged(callback) {
    this.onExpenseListChanged = callback;
  }

  addExpense(description, amount) {
    const newExpense = { description, amount };
    
    // TODO: add the new expense to the array of expenses and put it in local storage
   
    return true;
  }

  deleteExpense(index) {
    // TODO: Remove the expense from the array and update local storage.
  }
}

/* ========== View ========== */

class ExpenseView {
  constructor() {
    this.app = document.querySelector('.expense-list');
    this.form = document.querySelector('.expense-form');
    this.descriptionInput = document.getElementById('description');
    this.amountInput = document.getElementById('amount');
  }

  get description() {
    return this.descriptionInput.value.trim();
  }

  get amount() {
    return this.amountInput.value.trim();
  }

  resetForm() {
    this.form.reset();
  }

  displayExpenses(expenses) {
    let html = '';
    for (let i = 0; i < expenses.length; i++) {
      const expense = expenses[i];
      html += `
      <div class="list-group-item d-flex justify-content-between align-items-center" data-index="${i}">
        <div>
          <h5 class="mb-1">${expense.description}</h5>
          <span class="badge bg-success rounded-pill">$${expense.amount}</span>
        </div>
        <button name="deleteExpense" type="button" class="btn btn-sm btn-danger" aria-label="Delete expense">
          <i class="bi-trash"></i>
        </button>
      </div>`;
    }
    this.app.innerHTML = html;
  }

  onAddExpense(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

      handler(this.description, this.amount);
      this.resetForm();
    });
  }

  onDeleteExpense(handler) {
    this.app.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('button[name="deleteExpense"]');
      if (!deleteButton) {
        return;
      }

      const itemEl = deleteButton.closest('[data-index]');
      const index = parseInt(itemEl.getAttribute('data-index'), 10);
      handler(index);
    });
  }
}

/* ========== Controller ========== */

class ExpenseController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.subscribeExpenseListChanged(this.onExpenseListChanged);
    this.view.onAddExpense(this.handleAddExpense);
    this.view.onDeleteExpense(this.handleDeleteExpense);

    this.onExpenseListChanged(this.model.expenses);
  }

  onExpenseListChanged = (expenses) => {
    this.view.displayExpenses(expenses);
  };

  handleAddExpense = (description, amount) => {
    return this.model.addExpense(description, amount);
  };

  handleDeleteExpense = (index) => {
    this.model.deleteExpense(index);
  };
}

/* ========== Initialization ========== */

document.addEventListener('DOMContentLoaded', () => {
  new ExpenseController(new ExpenseModel(), new ExpenseView());
});
