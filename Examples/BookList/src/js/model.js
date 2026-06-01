// Created by Brian Bird in spring 2026 using Gemini 3.1 Pro.

/**
 * The Model handles state management and data persistence.
 * It uses pure logic as much as possible to facilitate unit testing.
 */
export class BookModel {
  /**
   * Initializes the model by loading from localStorage or setting an empty array.
   */
  constructor() {
    this.books = this._loadBooks();
  }

  /**
   * Internal method to load books from localStorage.
   * @returns {Array<Object>} Array of book objects.
   */
  _loadBooks() {
    try {
      const stored = localStorage.getItem('booklist_books');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse books from localStorage', e);
    }
    return [];
  }

  /**
   * Internal method to persist current state to localStorage.
   */
  _commit() {
    localStorage.setItem('booklist_books', JSON.stringify(this.books));
  }


  /**
   * Adds a new book to the collection.
   * @param {Object} bookData - The book metadata.
   */
  addBook(bookData) {
    const newBook = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // Robust unique ID
      status: 'To Read',         // Default status
      rating: 0,                 // Default rating
      ...bookData
    };
    this.books.push(newBook);
    this._commit();
  }

  /**
   * Updates the status of a specific book.
   * @param {string} id - The ID of the book.
   * @param {string} status - 'To Read', 'Reading', or 'Finished'.
   */
  updateStatus(id, status) {
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.status = status;
      // If a book is no longer 'Finished', we should clear its rating to keep state clean
      if (status !== 'Finished') {
        book.rating = 0;
      }
      this._commit();
    }
  }

  /**
   * Updates the rating of a finished book.
   * @param {string} id - The ID of the book.
   * @param {number} rating - Number from 1 to 5.
   */
  rateBook(id, rating) {
    const book = this.books.find(b => b.id === id);
    if (book && book.status === 'Finished') {
      book.rating = rating;
      this._commit();
    }
  }

  /**
   * Deletes a book from the collection.
   * @param {string} id - The ID of the book.
   */
  deleteBook(id) {
    this.books = this.books.filter(b => b.id !== id);
    this._commit();
  }
}
