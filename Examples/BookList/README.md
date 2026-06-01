# BookList

A browser-based book tracker built for CS 233JS that demonstrates asynchronous JavaScript, modular design, data persistence, and a loose Model-View-Controller (MVC) architecture using Vanilla JavaScript and Vitest.

## Purpose

This app lets users:

- Search for books via the OpenLibrary API and add them to a list.
- Manually enter book information.
- Mark books as "To Read", "Reading", or "Finished".
- Rate "Finished" books from 1 to 5 stars.
- Delete books.
- Persist book data in browser localStorage.

The project is designed to demonstrate:

- ES modules and class-based architecture.
- Async/await with the Fetch API.
- Separation of concerns through a beginner-friendly "loose MVC" pattern.
- Unit testing with Vitest.

## Prerequisites for Running This App

- **Node.js**: Ensure you have Node.js installed to use `npm` for managing dependencies.
- No external API keys are required for this project, as the OpenLibrary API is free and open. We use a custom `User-Agent` header to respect their API usage guidelines.

## Architecture: Is it MVC?

This application uses a structure inspired by the **Model-View-Controller (MVC)** design pattern, which is a common way to organize code into three distinct sections:

1. **Model** (`src/js/model.js`): The brain. It stores the data (the books) and handles the rules for updating them (saving to localStorage). It doesn't know anything about the HTML or the user interface.
2. **View** (`src/js/view.js`): The face. It manages the HTML and what the user sees on the screen. It also listens for user actions (like clicking a button).
3. **Controller** (`src/js/controller.js`): The middleman. It connects the View and the Model. When the user clicks "Add Book" in the View, the Controller takes that action and tells the Model to update the data.

**How this *is* MVC:**
We have separated our code so that the data (`model.js`) is completely independent of the screen (`view.js`). The `controller.js` acts as the bridge between them. This separation makes the code easier to test and maintain.

**How this *isn't* strict MVC:**
In a strict, traditional MVC pattern, the View often uses an Observer pattern to listen directly to the Model for changes. To keep things simple for beginners, we removed the Observer pattern entirely. Instead, the Controller explicitly tells the View to re-render whenever it changes the Model, and the View is given a direct reference to the Controller to call its methods (e.g., `this.controller.handleDeleteBook(id)`). This is a "loose" MVC approach that reduces complexity while still teaching the core concept of separating data from presentation.

### Module Breakdown

- `src/js/model.js` (`BookModel`)
  - Owns the book state.
  - Handles reading from and writing to `localStorage`.
  - Contains no DOM or HTML logic.

- `src/js/view.js` (`BookView`)
  - Caches DOM references.
  - Renders UI using Vanilla JS Template Literals.
  - Attaches event listeners directly to the DOM and calls Controller methods.

- `src/js/controller.js` (`BookController`)
  - Wires the Model and View together.
  - Explicitly tells the View to re-render whenever it modifies the Model.
  - Handles async service calls (fetching book data).

- `src/js/openLibraryService.js`
  - Pure async service function to fetch from OpenLibrary.
  - Parses API responses into a clean format.
  - No DOM side effects.

- `src/js/index.js`
  - Instantiates the Model, View, and Controller on `DOMContentLoaded`.
  - Imports CSS dependencies so Vite can bundle them.

## Unit Testing

This project uses **Vitest** to ensure our application logic works correctly without needing to click around in a browser. 

We test the "pure" logic of our application, which means testing code that doesn't rely on the HTML DOM (like `model.js` and `openLibraryService.js`). 

### Running Tests
You can run the tests by executing the following command in your terminal:
```bash
npm run test
```
This will run the test suite located in the `/tests/` directory and report any failures. Testing the Model ensures that saving, updating, and deleting books works reliably before we even wire it up to the screen!

## Development Tools

This project uses:

- **Vite** for the dev server, fast bundling, and production builds.
- **Vitest** for unit testing.
- **npm scripts** for local workflow.

### Scripts

- `npm run dev` - start local Vite dev server.
- `npm run build` - create production build in `dist/`.
- `npm run preview` - preview production build locally.
- `npm run test` - run unit tests using Vitest.

## NPM Packages

### Runtime dependencies

- `bootstrap`
  - Base UI styles and layout utility classes.
- `bootstrap-icons`
  - Icon set (for stars, search, delete, etc.).

### Development dependencies

- `vite`
  - Build tool and dev server.
- `vitest`
  - Unit testing framework.

## Web Services

### OpenLibrary Search API

- **Website**: [OpenLibrary](https://openlibrary.org)
- **Module**: `src/js/openLibraryService.js`
- **Endpoint**: `https://openlibrary.org/search.json?q={query}`
- **Behavior**:
  - Sends a GET request with a custom `User-Agent` header containing contact info to comply with OpenLibrary's rate-limiting policies.
  - Returns raw book data which is parsed into a clean `{ title, author, pubDate, isbn, coverPhotoUrl }` object.
  - Gracefully handles missing data (like a missing cover image or publication date).

## References

- **OpenLibrary API**: [OpenLibrary Developer API Documentation](https://openlibrary.org/developers/api)
- **MVC Architecture**: [MDN Web Docs: MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)
- **Vitest**: [Vitest Official Documentation](https://vitest.dev/)
- **Bootstrap 5**: [Bootstrap Official Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
