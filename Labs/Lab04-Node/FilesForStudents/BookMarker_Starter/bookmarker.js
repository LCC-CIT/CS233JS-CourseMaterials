/*  BookMarker — Starter File
    This application simulates an electronic bookmark list. Users can add and delete
    bookmarks from the list. The list of bookmarks is stored in browser local storage
    so bookmarks persist between sessions.

    Adapted by Brian Bird from starter files by Mari Good, winter 2024.
    Updated and refactored by Brian Bird using GitHub Copilot spring 2026.
    All classes and initialization code are in this single file.
*/

/* ========== Model ========== */

/**
 * Manages the bookmark data and its persistence in localStorage.
 * Acts as the single source of truth for the bookmark list, ensuring
 * data is validated before being saved or used by the rest of the app.
 */
class BookmarkModel {
  /**
   * Restores the bookmark list from localStorage on startup so the user's
   * bookmarks survive page refreshes and browser restarts. Falls back to
   * a set of sample bookmarks when storage is empty or contains corrupt data.
   */
  constructor() {
    try {
      const savedBookmarks = null; // array to hold bookmarks
      // TODO: Add a line of code that retrieves bookmarks from local storage into savedBookmarks
      if (!Array.isArray(savedBookmarks) || !this._allValid(savedBookmarks)) {
        throw new Error('Invalid bookmark payload');
      }
      this.bookmarks = savedBookmarks;
    } catch (e) {
      // Provide starter entries if local storage is empty/corrupt.
      this.bookmarks = [
        {
          description: 'Really cool site for open source photos',
          image: '',
          link: 'https://www.pexels.com/',
          title: 'https://www.pexels.com/'
        },
        {
          description: "Brian's professional website",
          image: '',
          link: 'https://profbird.dev/',
          title: 'https://profbird.dev/'
        }
      ];
    }
  }

  /**
   * Guards against corrupt or maliciously crafted localStorage data by
   * confirming that a bookmark object has all required string properties
   * before it is accepted into the model.
   */
  isValidBookmark(bookmark) {
    return (
      typeof bookmark === 'object' &&
      bookmark !== null &&
      typeof bookmark.description === 'string' &&
      typeof bookmark.link === 'string' &&
      typeof bookmark.title === 'string' &&
      typeof bookmark.image === 'string'
    );
  }

  /**
   * Validates every entry in an array so the model can reject an entire
   * saved list the moment any single bookmark fails the shape check.
   * Check every bookmark in the array using a for loop.
   */
  allValid(bookmarks) {
    for (let i = 0; i < bookmarks.length; i++) {
      if (!this.isValidBookmark(bookmarks[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Saves a new bookmark list as the authoritative state, persists it to
   * localStorage so it survives page reloads, and immediately re-renders the view.
   */
  commit(bookmarks) {
    // TODO: write this method
  }

  /**
   * Registers the controller's handler so the model can push updates
   * outward without depending directly on the view or controller classes,
   * keeping the MVC layers loosely coupled.
   */
  subscribeBookmarkListChanged(callback) {
    this.onBookmarkListChanged = callback;
  }

  /**
   * Rejects non-HTTP(S) URLs (such as javascript: or data: schemes) before
   * they can be stored or rendered as links, preventing XSS attacks via
   * malicious bookmark URLs.
   */
  isSafeHttpUrl(value) {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  /**
   * Validates the URL for safety, then appends a new bookmark to the list
   * so the user's addition is immediately reflected in storage and the UI.
   * Returns false when the URL is unsafe so the view can show an error.
   */
  addBookmark(url, description) {
    if (!this.isSafeHttpUrl(url)) {
      return false;
    }

    const newBookmark = {
      description: description,
      image: '',
      link: url,
      title: url
    };

    // Build a new array with the added bookmark.
    
    // TODO: add the new bookmark to the array of bookmarks and put it in local storage
   
    return true;
  }

  /**
   * Removes the bookmark at the given position by rebuilding the array
   * without that entry, then commits the change so storage and the UI
   * stay in sync.
   */
  deleteBookmark(index) {
    // Build a new array without the bookmark at the given index.
  
    // TODO: Remove the bookmark from the array and update local storage.

  }
}

/* ========== View ========== */

/**
 * Owns all DOM interaction — reading form inputs, building bookmark HTML,
 * and wiring user events — so the model stays free of any browser/DOM
 * concerns and the controller never touches the DOM directly.
 */
class BookmarkView {
  /**
   * Caches references to the key DOM elements once at construction time
   * so every subsequent read or write avoids repeated querySelector calls.
   */
  constructor() {
    this.app = document.querySelector('.bookmarks-list');
    this.form = document.querySelector('.bookmark-form');
    this.urlInput = document.getElementById('url');
    this.descriptionInput = document.getElementById('description');
  }

  /**
   * Provides the controller with the current URL value while stripping
   * leading/trailing whitespace to avoid accidental blank-space mismatches.
   */
  get url() {
    return this.urlInput.value.trim();
  }

  /**
   * Provides the controller with the current description value while
   * stripping leading/trailing whitespace for clean storage.
   */
  get description() {
    return this.descriptionInput.value.trim();
  }

  /**
   * Clears the form after a successful add so the user is ready to enter
   * the next bookmark without having to manually clear the fields.
   */
  resetForm() {
    this.form.reset();
  }

  /**
   * Rebuilds the entire bookmark list in the DOM whenever the data changes,
   * keeping the displayed list in sync with the model's current state.
   * Build the HTML for all bookmarks using a for loop.
   */
  displayBookmarks(bookmarks) {
    // Refactor this method to use the NPM lit-html package
    let html = '';
    for (let i = 0; i < bookmarks.length; i++) {
      const bookmark = bookmarks[i];
      html += `
      <div class="bookmark-item content" data-index="${i}">
        <a href="${bookmark.link}" target="_blank" rel="noopener noreferrer" class="bookmark">
          <div class="img" style="background-image:url('./images/bookmark.png')">&nbsp;</div>
          <div class="title">${bookmark.title}<br>${bookmark.description}</div>
        </a>
        <button name="deleteBookmark" type="button" class="btn p-0 border-0 delete-button" aria-label="Delete bookmark">
          <i class="bi-trash delete-icon"></i>
        </button>
      </div>`;
    }
    this.app.innerHTML = html;
  }

  /**
   * Attaches the submit listener to the form so user-initiated adds flow
   * through built-in HTML5 validation first, then through the model's URL
   * safety check, before the handler is allowed to commit the new bookmark.
   */
  onAddBookmark(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

      const added = handler(this.url, this.description);
      if (!added) {
        this.urlInput.setCustomValidity('Please enter an http or https URL.');
        this.form.reportValidity();
        this.urlInput.setCustomValidity('');
        return;
      }

      this.resetForm();
    });
  }

  /**
   * Uses event delegation on the bookmark list container so a single click
   * listener handles delete buttons for all current and future bookmark
   * items without needing to re-attach listeners after every re-render.
   */
  onDeleteBookmark(handler) {
    this.app.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('button[name="deleteBookmark"]');
      if (!deleteButton) {
        return;
      }

      const bookmarkItem = deleteButton.closest('[data-index]');
      const index = parseInt(bookmarkItem.getAttribute('data-index'), 10);
      handler(index);
    });
  }
}

/* ========== Controller ========== */

/**
 * Coordinates the model and view so neither class needs to know about the
 * other. It wires up subscriptions and event handlers at startup, then
 * delegates data operations to the model and rendering to the view.
 */
class BookmarkController {
  /**
   * Connects the model and view by subscribing to model changes and
   * registering view event handlers, then triggers an initial render so
   * the bookmark list is displayed as soon as the app loads.
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.subscribeBookmarkListChanged(this.onBookmarkListChanged);
    this.view.onAddBookmark(this.handleAddBookmark);
    this.view.onDeleteBookmark(this.handleDeleteBookmark);

    this.onBookmarkListChanged(this.model.bookmarks);
  }

  /**
   * Responds to model change notifications by telling the view to re-render,
   * keeping the UI in sync whenever the bookmark list is updated.
   */
  onBookmarkListChanged = (bookmarks) => {
    this.view.displayBookmarks(bookmarks);
  };

  /**
   * Forwards the user's add request to the model and returns the result
   * so the view knows whether to show a validation error or clear the form.
   */
  handleAddBookmark = (url, description) => {
    return this.model.addBookmark(url, description);
  };

  /**
   * Forwards the user's delete request to the model using the bookmark's
   * array index so the correct entry is removed from storage and the UI.
   */
  handleDeleteBookmark = (index) => {
    this.model.deleteBookmark(index);
  };
}

/* ========== Initialization ========== */

/**
 * Delays app startup until the DOM is fully parsed so the view's
 * querySelector calls always find their target elements before the
 * controller wires up events.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Wait for the DOM so view selectors always resolve before wiring events.
  new BookmarkController(new BookmarkModel(), new BookmarkView());
});
