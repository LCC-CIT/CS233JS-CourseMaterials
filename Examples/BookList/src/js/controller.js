import { searchBooksByTitle } from './openLibraryService.js';

/**
 * Controller handles interactions between View, Model, and external Services.
 */
export class BookController {
  /**
   * Initializes the controller.
   * @param {Object} model - The application state model.
   * @param {Object} view - The UI view layer.
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // Provide view with a reference to the controller so it can assign event handlers directly
    this.view.init(this);

    // Initial render
    this.view.renderBooks(this.model.books);
  }

  /**
   * Called by the view when the user searches for a book.
   * @param {string} query - The book title to search for.
   */
  async handleSearch(query) {
    this.view.showSearchLoading();
    const results = await searchBooksByTitle(query);
    this.view.renderSearchResults(results);
  }

  /**
   * Called by the view when the user clicks a specific search result to add it.
   * @param {Object} bookData - The selected book object.
   */
  handleSelectSearchResult(bookData) {
    this.model.addBook(bookData);
    this.view.clearSearch();
    this.view.renderBooks(this.model.books);
  }

  /**
   * Called by the view when a user submits a manual entry form.
   * @param {Object} bookData - The manual book info.
   */
  handleManualAdd(bookData) {
    if (!bookData.title) return; // Basic validation
    this.model.addBook(bookData);
    this.view.clearManualForm();
    this.view.renderBooks(this.model.books);
  }

  /**
   * Called by the view when a user changes a book's status dropdown.
   * @param {string} id - Book ID.
   * @param {string} newStatus - "To Read", "Reading", or "Finished".
   */
  handleStatusChange(id, newStatus) {
    this.model.updateStatus(id, newStatus);
    this.view.renderBooks(this.model.books);
  }

  /**
   * Called by the view when a user clicks a star rating.
   * @param {string} id - Book ID.
   * @param {number} rating - 1-5 rating.
   */
  handleRatingChange(id, rating) {
    this.model.rateBook(id, rating);
    this.view.renderBooks(this.model.books);
  }

  /**
   * Called by the view to delete a book.
   * @param {string} id - Book ID.
   */
  handleDeleteBook(id) {
    this.model.deleteBook(id);
    this.view.renderBooks(this.model.books);
  }
}
