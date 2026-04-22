export class BookModel {
  constructor() {
    try {
      const savedBooks = JSON.parse(localStorage.getItem("books"));
      if (!Array.isArray(savedBooks) || !savedBooks.every((book) => this._isValidBook(book))) {
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

  _isValidBook(book) {
    return (
      typeof book === 'object' &&
      book !== null &&
      typeof book.title === 'string' &&
      typeof book.author === 'string' &&
      typeof book.isRead === 'boolean'
    );
  }

  _commit(books) {
    this.books = books;
    localStorage.setItem("books", JSON.stringify(books));
    this.onBookListChanged(books);
  }

  subscribeBookListChanged(callback) {
    this.onBookListChanged = callback;
  }

  addBook(title, author) {
    const newBook = { title, author, isRead: false };
    this._commit([...this.books, newBook]);
  }

  deleteBook(index) {
    this._commit(this.books.filter((_, bookIndex) => bookIndex !== index));
  }

  toggleBookStatus(index) {
    this._commit(
      this.books.map((book, bookIndex) =>
        bookIndex === index ? { ...book, isRead: !book.isRead } : book
      )
    );
  }
}