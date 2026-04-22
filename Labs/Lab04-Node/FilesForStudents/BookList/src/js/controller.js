export class BookController {
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