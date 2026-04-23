/*  GroceryList — Starter File
    This application simulates an electronic grocery list. Users can add and delete
    items from the list. The list of items is stored in browser local storage
    so items persist between sessions.

    All classes and initialization code are in this single file.
*/

/* ========== Model ========== */

class GroceryModel {
  constructor() {
    try {
      const savedGroceries = null; // array to hold groceries
      // TODO: Add a line of code that retrieves groceries from local storage into savedGroceries
      if (!Array.isArray(savedGroceries) || !this._allValid(savedGroceries)) {
        throw new Error('Invalid grocery payload');
      }
      this.groceries = savedGroceries;
    } catch (e) {
      // Provide starter entries if local storage is empty/corrupt.
      this.groceries = [
        { itemName: 'Apples', quantity: '5' },
        { itemName: 'Milk', quantity: '1 gallon' }
      ];
    }
  }

  isValidItem(item) {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.itemName === 'string' &&
      typeof item.quantity === 'string'
    );
  }

  allValid(groceries) {
    for (let i = 0; i < groceries.length; i++) {
      if (!this.isValidItem(groceries[i])) {
        return false;
      }
    }
    return true;
  }

  commit(groceries) {
    // TODO: write this method
  }

  subscribeGroceryListChanged(callback) {
    this.onGroceryListChanged = callback;
  }

  addGrocery(itemName, quantity) {
    const newGrocery = { itemName, quantity };
    
    // TODO: add the new grocery to the array of groceries and put it in local storage
   
    return true;
  }

  deleteGrocery(index) {
    // TODO: Remove the grocery from the array and update local storage.
  }
}

/* ========== View ========== */

class GroceryView {
  constructor() {
    this.app = document.querySelector('.grocery-list');
    this.form = document.querySelector('.grocery-form');
    this.itemNameInput = document.getElementById('itemName');
    this.quantityInput = document.getElementById('quantity');
  }

  get itemName() {
    return this.itemNameInput.value.trim();
  }

  get quantity() {
    return this.quantityInput.value.trim();
  }

  resetForm() {
    this.form.reset();
  }

  displayGroceries(groceries) {
    let html = '';
    for (let i = 0; i < groceries.length; i++) {
      const grocery = groceries[i];
      html += `
      <div class="list-group-item d-flex justify-content-between align-items-center" data-index="${i}">
        <div>
          <h5 class="mb-1">${grocery.itemName}</h5>
          <small class="text-muted">Quantity: ${grocery.quantity}</small>
        </div>
        <button name="deleteGrocery" type="button" class="btn btn-danger btn-sm" aria-label="Delete item">
          <i class="bi-trash"></i>
        </button>
      </div>`;
    }
    this.app.innerHTML = html;
  }

  onAddGrocery(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

      handler(this.itemName, this.quantity);
      this.resetForm();
    });
  }

  onDeleteGrocery(handler) {
    this.app.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('button[name="deleteGrocery"]');
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

class GroceryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.subscribeGroceryListChanged(this.onGroceryListChanged);
    this.view.onAddGrocery(this.handleAddGrocery);
    this.view.onDeleteGrocery(this.handleDeleteGrocery);

    this.onGroceryListChanged(this.model.groceries);
  }

  onGroceryListChanged = (groceries) => {
    this.view.displayGroceries(groceries);
  };

  handleAddGrocery = (itemName, quantity) => {
    return this.model.addGrocery(itemName, quantity);
  };

  handleDeleteGrocery = (index) => {
    this.model.deleteGrocery(index);
  };
}

/* ========== Initialization ========== */

document.addEventListener('DOMContentLoaded', () => {
  new GroceryController(new GroceryModel(), new GroceryView());
});
