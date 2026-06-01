/**
 * The View handles rendering the UI using Template Literals and standard DOM manipulation.
 * It directly assigns events to call the Controller.
 */
export class BookView {
  constructor() {
    this.app = document.getElementById('app');
    
    // UI Elements
    this.searchTitleInput = document.getElementById('searchTitleInput');
    this.searchButton = document.getElementById('searchButton');
    this.searchResults = document.getElementById('searchResults');
    
    this.toggleManualEntryBtn = document.getElementById('toggleManualEntryBtn');
    this.manualEntryForm = document.getElementById('manualEntryForm');
    this.manualTitle = document.getElementById('manualTitle');
    this.manualAuthor = document.getElementById('manualAuthor');
    this.manualIsbn = document.getElementById('manualIsbn');
    this.manualAddButton = document.getElementById('manualAddButton');
    
    this.bookListContainer = document.getElementById('bookListContainer');

    // This property will hold search results temporarily so they can be referenced when clicked
    this.currentSearchResults = [];
  }

  /**
   * Initializes the view with a reference to the controller.
   * Directly assigns DOM event handlers to invoke controller methods.
   * @param {Object} controller - The app controller.
   */
  init(controller) {
    this.controller = controller;

    // Search button click
    this.searchButton.onclick = () => {
      const query = this.searchTitleInput.value.trim();
      if (query) {
        this.controller.handleSearch(query);
      }
    };

    // Toggle manual entry form
    this.toggleManualEntryBtn.onclick = () => {
      this.manualEntryForm.classList.toggle('d-none');
    };

    // Manual add button click
    this.manualAddButton.onclick = () => {
      this.controller.handleManualAdd({
        title: this.manualTitle.value.trim(),
        author: this.manualAuthor.value.trim() || 'Unknown Author',
        isbn: this.manualIsbn.value.trim() || 'N/A',
        pubDate: 'Unknown Date',
        coverPhotoUrl: null
      });
    };

    // Event delegation for search results clicks
    this.searchResults.onclick = (e) => {
      const btn = e.target.closest('.add-result-btn');
      if (btn) {
        const index = parseInt(btn.dataset.index, 10);
        const selectedBook = this.currentSearchResults[index];
        if (selectedBook) {
          this.controller.handleSelectSearchResult(selectedBook);
        }
      }
    };

    // Event delegation for the main book list (deletes, status changes, ratings)
    this.bookListContainer.onclick = (e) => {
      const target = e.target;
      
      // Delete button
      if (target.closest('.delete-btn')) {
        const id = target.closest('li').dataset.id;
        this.controller.handleDeleteBook(id);
      }
      
      // Star rating click
      if (target.closest('.star-rating i')) {
        const id = target.closest('li').dataset.id;
        const rating = parseInt(target.closest('i').dataset.rating, 10);
        this.controller.handleRatingChange(id, rating);
      }
    };

    // Status dropdown change via delegation
    this.bookListContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('status-select')) {
        const id = e.target.closest('li').dataset.id;
        this.controller.handleStatusChange(id, e.target.value);
      }
    });
  }

  /**
   * Shows a loading spinner while searching OpenLibrary.
   */
  showSearchLoading() {
    this.searchResults.innerHTML = `
      <div class="text-center py-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
    this.searchResults.classList.remove('d-none');
  }

  /**
   * Renders the search results from OpenLibrary.
   * @param {Array<Object>} results 
   */
  renderSearchResults(results) {
    this.currentSearchResults = results;
    
    if (results.length === 0) {
      this.searchResults.innerHTML = `<div class="list-group-item text-muted">No results found.</div>`;
      return;
    }

    // Using template literals to construct HTML
    const html = results.map((book, index) => `
      <div class="list-group-item search-result-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          ${book.coverPhotoUrl ? `<img src="${book.coverPhotoUrl}" class="book-cover me-3" alt="Cover">` : `<div class="book-cover me-3 d-flex justify-content-center align-items-center text-muted"><i class="bi-image"></i></div>`}
          <div>
            <strong>${book.title}</strong><br>
            <small class="text-muted">${book.author} | Published: ${book.pubDate}</small>
          </div>
        </div>
        <button class="btn btn-sm btn-outline-primary add-result-btn" data-index="${index}">Add</button>
      </div>
    `).join('');

    this.searchResults.innerHTML = html;
  }

  /**
   * Clears search input and hides results.
   */
  clearSearch() {
    this.searchTitleInput.value = '';
    this.searchResults.innerHTML = '';
    this.searchResults.classList.add('d-none');
    this.currentSearchResults = [];
  }

  /**
   * Clears the manual entry form.
   */
  clearManualForm() {
    this.manualTitle.value = '';
    this.manualAuthor.value = '';
    this.manualIsbn.value = '';
    this.manualEntryForm.classList.add('d-none');
  }

  /**
   * Renders the main book list based on the state model.
   * @param {Array<Object>} books 
   */
  renderBooks(books) {
    if (books.length === 0) {
      this.bookListContainer.innerHTML = `<li class="list-group-item text-center text-muted py-4">No books yet. Search and add one!</li>`;
      return;
    }

    const html = books.map(book => {
      const isFinished = book.status === 'Finished';
      
      // Build star rating HTML dynamically
      let starsHtml = '';
      if (isFinished) {
        starsHtml = `<div class="star-rating ms-3">`;
        for (let i = 1; i <= 5; i++) {
          const starClass = i <= book.rating ? 'bi-star-fill' : 'bi-star';
          starsHtml += `<i class="bi ${starClass}" data-rating="${i}" title="Rate ${i} stars"></i>`;
        }
        starsHtml += `</div>`;
      }

      return `
        <li class="list-group-item d-flex justify-content-between align-items-center ${isFinished ? 'book-finished' : ''}" data-id="${book.id}">
          <div class="d-flex align-items-center">
            ${book.coverPhotoUrl ? `<img src="${book.coverPhotoUrl}" class="book-cover me-3" alt="Cover">` : `<div class="book-cover me-3 d-flex justify-content-center align-items-center text-muted"><i class="bi-book"></i></div>`}
            <div class="book-info">
              <span class="book-title">${book.title}</span>
              <span class="book-meta">${book.author} | ISBN: ${book.isbn}</span>
            </div>
            ${starsHtml}
          </div>
          
          <div class="d-flex align-items-center">
            <select class="form-select form-select-sm status-select me-3">
              <option value="To Read" ${book.status === 'To Read' ? 'selected' : ''}>To Read</option>
              <option value="Reading" ${book.status === 'Reading' ? 'selected' : ''}>Reading</option>
              <option value="Finished" ${book.status === 'Finished' ? 'selected' : ''}>Finished</option>
            </select>
            <button class="btn btn-sm text-danger border-0 delete-btn" aria-label="Delete book">
              <i class="bi-trash fs-5"></i>
            </button>
          </div>
        </li>
      `;
    }).join('');

    this.bookListContainer.innerHTML = html;
  }
}
