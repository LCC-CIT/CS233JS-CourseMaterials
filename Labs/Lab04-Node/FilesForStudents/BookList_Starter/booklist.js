/*  BookList — Starter File
    This application simulates an electronic book list. Users can add and delete
    books from the list. The list of books is stored in browser local storage
    so books persist between sessions.

    Adapted by Brian Bird spring 2026 based on code from Mari Good in 2024,
    refactored using GitHub Copilot.
    All classes and initialization code are in this single file.
*/

/* ========== Model ========== */

class BookModel {
  constructor() {
    try {
      const savedBooks = null; // array to hold books
      // TODO: Add a line of code that retrieves books from local storage into savedBooks
      if (!Array.isArray(savedBooks) || !this.allValid(savedBooks)) {
        throw new Error("Invalid books payload");
      }
      this.books = savedBooks;
    } catch {
      this.books = [
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', isRead: false },
        { title: '1984', author: 'George Orwell', isRead: true },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', isRead: false },
      ];
    }
  }

  isValidBook(book) {
    return (
      typeof book === 'object' &&
      book !== null &&
      typeof book.title === 'string' &&
      typeof book.author === 'string' &&
      typeof book.isRead === 'boolean'
    );
  }

  allValid(books) {
    for (let i = 0; i < books.length; i++) {
      if (!this.isValidBook(books[i])) {
        return false;
      }
    }
    return true;
  }

  commit(books) {
    // TODO: write this method
  }

  subscribeBookListChanged(callback) {
    this.onBookListChanged = callback;
  }

  addBook(title, author) {
    const newBook = { title, author, isRead: false };

    // Build a new array with the added book.

    // TODO: add the new book to the array of books and put it in local storage

  }

  deleteBook(index) {
    // Build a new array without the book at the given index.

    // TODO: Remove the book from the array and update local storage.

  }

  toggleBookStatus(index) {
    // Build a new array with the toggled book status.

    // TODO: Toggle the book status and update local storage.
  }
}

/* ========== View ========== */

class BookView {
  constructor() {
    this.app = document.getElementById('bookList');
    this.inputTitle = document.getElementById('addTitle');
    this.inputAuthor = document.getElementById('addAuthor');
    this.addButton = document.getElementById('addButton');
  }

  get bookTitle() {
    return this.inputTitle.value;
  }

  get bookAuthor() {
    return this.inputAuthor.value;
  }

  resetInputs() {
    this.inputTitle.value = '';
    this.inputAuthor.value = '';
    this.inputTitle.classList.remove('is-invalid');
    this.inputAuthor.classList.remove('is-invalid');
  }

  showInvalidInputs() {
    if (this.bookTitle.trim() === '') {
      this.inputTitle.classList.add('is-invalid');
    } else {
      this.inputTitle.classList.remove('is-invalid');
    }
    if (this.bookAuthor.trim() === '') {
      this.inputAuthor.classList.add('is-invalid');
    } else {
      this.inputAuthor.classList.remove('is-invalid');
    }
  }

  displayBooks(books) {
    // TODO: Refactor this to use the lit-html package
    let html = '';
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const isReadClass = book.isRead ? "read" : "";
      const isChecked = book.isRead ? "checked" : "";
      html += `
      <li class="list-group-item checkbox" data-index="${i}">
        <div class="row">
          <div class="col-sm-1 pt-2 checkbox">
            <label>
              <input name="toggleBookStatus" type="checkbox" value="" ${isChecked}>
            </label>
          </div>
          <div class="col-sm-10 book-text ${isReadClass}">
            <strong>${book.title}</strong> by ${book.author}
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <button name="deleteBook" type="button" class="btn p-0 border-0" aria-label="Delete book"><i class="bi-trash delete-icon"></i></button>
          </div>
        </div>
      </li>`;
    }
    this.app.innerHTML = html;
  }

  onAddBook(handler) {
    this.addButton.addEventListener('click', () => {
      if (this.bookTitle.trim() !== '' && this.bookAuthor.trim() !== '') {
        handler(this.bookTitle, this.bookAuthor);
        this.resetInputs();
      } else {
        this.showInvalidInputs();
      }
    });
  }

  onDeleteBook(handler) {
    this.app.addEventListener('click', ({ target }) => {
      const deleteItem = target.closest('button[name="deleteBook"]');
      if (deleteItem) {
        const index = parseInt(deleteItem.closest('li').getAttribute('data-index'), 10);
        handler(index);
      }
    });
  }

  onToggleBook(handler) {
    this.app.addEventListener('change', ({ target }) => {
      if (target.name === 'toggleBookStatus') {
        const index = parseInt(target.closest('li').getAttribute('data-index'), 10);
        handler(index);
      }
    });
  }
}

/* ========== Controller ========== */

class BookController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.subscribeBookListChanged(this.onBookListChanged);

    this.view.onAddBook(this.handleAddBook);
    this.view.onDeleteBook(this.handleDeleteBook);
    this.view.onToggleBook(this.handleToggleBook);

    this.onBookListChanged(this.model.books);
  }

  onBookListChanged = (books) => {
    this.view.displayBooks(books);
  };

  handleAddBook = (title, author) => {
    this.model.addBook(title, author);
  };

  handleDeleteBook = (index) => {
    this.model.deleteBook(index);
  };

  handleToggleBook = (index) => {
    this.model.toggleBookStatus(index);
  };
}

/* ========== Initialization ========== */

document.addEventListener('DOMContentLoaded', () => {
  new BookController(new BookModel(), new BookView());
});