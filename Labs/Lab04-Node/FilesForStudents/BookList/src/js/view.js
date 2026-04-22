import { html, render } from 'lit-html';

export class BookView {
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
    render(this.booksTemplate(books), this.app);
  }

  booksTemplate(books) {
    return html`
      ${books.map((book, index) => this.bookTemplate(book, index))}
    `;
  }

  bookTemplate({ title, author, isRead }, index) {
    return html`
      <li class="list-group-item checkbox" data-index="${index}">
        <div class="row">
          <div class="col-sm-1 pt-2 checkbox">
            <label>
              <input name="toggleBookStatus" type="checkbox" value="" .checked=${isRead}>
            </label>
          </div>
          <div class="col-sm-10 book-text ${isRead ? "read" : ""}">
            <strong>${title}</strong> by ${author}
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <button name="deleteBook" type="button" class="btn p-0 border-0" aria-label="Delete book"><i class="bi-trash delete-icon"></i></button>
          </div>
        </div>
      </li>
    `;
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