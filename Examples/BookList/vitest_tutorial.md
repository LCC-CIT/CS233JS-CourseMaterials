[TOC]

# Demystifying Vitest: A Beginner's Guide to Unit Testing

Hey again! If you just survived reading the JavaScript Forest Guide for our BookList app, congratulations! You've figured out how the MVC architecture works. 

But then you see this other folder in the project called `tests/` and commands like `npm run test` or `vitest`. When I first saw this, I thought: *"Wait, I'm barely writing code that works. Now I have to write MORE code just to test the code I already wrote? Is this a joke?"*

It actually isn't a joke, and once I understood it, it saved me from manually reloading my browser and clicking buttons 50 times every time I made a change. 

Let's break down **Vitest** (the testing tool we use in this class) in a way that won't make your head spin.

---

## 🧐 What is a "Unit Test" anyway?

Think of a unit test like a **mini-quiz** you write for a single, small chunk of your code (a "unit," like a function or a class method). 

Instead of opening Chrome, typing a book title in the search bar, clicking "Search", clicking "Add", and checking if it saved, you write a JS script that says:
> *"Hey, run the `addBook()` method with these mock details, and check if the list has 1 book in it now."*

If the method works, the test passes. If you accidentally broke the code while editing it, the test fails and tells you exactly what went wrong.

### 🦴 The Anatomy of a Test: The Three "A"s

Almost every unit test you write follows the same three steps, which we call the **Triple-A pattern**:

1. 🪵 **Arrange (Set up):** Get everything ready for the test. This is where you create mock data, initialize your classes, or set up fake storage.
2. 🎬 **Act (Run):** Run the actual function or method you are testing. This is usually just a single line of code that executes the logic.
3. 🔍 **Assert (Check):** Compare the result with what you expected. This is where we use `expect()` to check our answers.

You'll see this exact structure marked in the code walkthroughs below! It's a great habit to structure your tests this way so they are easy for anyone to read.

---

## 🔄 TDD and the Red/Green Concept

In modern software development, you'll often hear the term **TDD (Test-Driven Development)**. 

TDD is a style of writing code where you actually **write the test first**, before you write any of the real application logic. It sounds completely backward—how do you test something that doesn't exist yet?—but it forces you to think about how your functions *should* behave before you get bogged down in writing them.

TDD revolves around the **Red/Green Loop**:

1. 🔴 **Red:** You write a test for a feature you haven't implemented yet. You run the test runner, and it fails (turning red). This is expected because the code doesn't exist! It proves your test is actually looking for the right thing.
2. 🟢 **Green:** You write the bare minimum amount of real code needed to make that test pass (turning the test runner green).
3. 🔵 **Refactor:** Now that the test is green and you know your code works, you clean it up (improve variable names, remove duplicates). Since you have the test, you can make changes confidently—if you break anything, the test will instantly turn red again!

---

## 🎭 What is Mocking? (The High-Level Concept)

Unit tests are supposed to test a single function *in isolation*. But in real applications, our code doesn't live in a vacuum. It interacts with the outside world:
* It reads and writes to the browser's database (`localStorage`).
* It fetches data from the internet (the OpenLibrary API).
* It triggers callback functions in other modules.

If we let our tests talk directly to the real internet or real storage, our tests would fail when the school Wi-Fi is down, or we might accidentally corrupt real user data!

**Mocking** is the solution. Think of a mock like a **stunt double** in a movie. Instead of having the actor jump off a building, you hire a double. 

In testing, a mock is a fake object or function that *pretends* to be the real thing (like `localStorage` or `fetch`), but is completely under our control.
* **Fakes / Spies:** We track if our code called the mock, how many times, and what parameters were passed.
* **Stubs:** We pre-program the mock to return specific values (e.g., *"When my code calls fetch(), pretend the internet responded with success and return this specific book JSON"*).

---

## 🛠️ What should we test (and what should we NOT test)?

This is a huge trap for beginners. You might think, *"I need to test if the delete button turns red when I hover over it!"* or *"I need to test if the modal pops up when I click this link!"*

**Stop! Don't do that.** Testing the browser screen (the DOM and HTML) is incredibly hard to write automated tests for. It requires simulating a browser, which makes tests slow and complicated.

In this class, we separate our files so we can test the **pure logic** and leave the visual stuff for manual checking.

| What to Unit Test 🧪 | What NOT to Unit Test ❌ |
| :--- | :--- |
| **Pure Functions:** Functions that take an input, do some math/formatting, and return an output (like `parseSearchResults` in `openLibraryService.js`). | **UI Looks & Layout:** Whether a button has the class `btn-primary`, color contrast, or font sizes. |
| **State Management / Data Rules:** Adding, updating, deleting, or rating books in our model (`model.js`). | **DOM Manipulation:** Checking if a `div`'s `innerHTML` was updated with the book title. |
| **API Call Handling (Mocked):** Making sure our app formats the URL correctly and handles internet errors gracefully. | **Browser Events:** Clicking on the actual screen or scrolling down. |

---

## 📦 The Vitest Toolbox: Core Functions

When you look at [model.test.js](file:///Volumes/DataCard/Repos/CS233JS-Repos/CS233JS-CourseMaterials/Examples/BookList/tests/model.test.js), the first line imports a bunch of tools from `'vitest'`:
```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
```
Here is what each tool does:

### 1. `describe()` (The Folder)
This is just used to group related tests together so they look neat in the test reports. It takes a name and a function:
```javascript
describe('BookModel', () => {
  // All our BookModel tests go in here!
});
```

### 2. `it()` or `test()` (The Quiz Question)
This is where the actual test code lives. `it` stands for *"It should..."*. You write a description of the behavior you expect:
```javascript
it('should initialize with an empty book list', () => {
  // The test logic goes here
});
```

### 3. `expect()` and Matchers (The Answer Key)
This is how we check if our code behaved correctly. We pass our actual result into `expect()`, and chain it with a "matcher" to check if it equals what we want:
* `expect(a).toBe(b)` — check if `a === b` (for strings, numbers, booleans).
* `expect(a).toEqual(b)` — check if objects or arrays look the same (deep comparison).
* `expect(a).toBeDefined()` — check if a variable has a value (isn't `undefined`).
* `expect(a).toBeNull()` — check if a value is exactly `null`.

### 4. `beforeEach()` & `afterEach()` (The Cleanup Crew)
These run automatically before or after every single `it()` test block. We use them to reset our settings so one test doesn't accidentally mess up the next one:
```javascript
beforeEach(() => {
  // Reset database or clean up mock storage before each test runs!
});
```

### 5. `vi` (The Pretender / Mocking Tool)
This is Vitest's utility for creating "spy" functions or mock objects. As explained in the Mocking section above, we use `vi.fn()` or `vi.spyOn()` to replace real dependencies (like `localStorage` or callback events) with fake, spied-on stunt doubles.

---

## 🔍 Code Walkthroughs: Learning from BookList Tests

Let's look at the real tests in this project to see how these tools work in action.

### Example A: Testing a Pure Function (`openLibraryService.test.js`)
A pure function is the easiest thing to test because it doesn't change anything outside itself. Let's look at the test for `parseSearchResults` in [openLibraryService.test.js](file:///Volumes/DataCard/Repos/CS233JS-Repos/CS233JS-CourseMaterials/Examples/BookList/tests/openLibraryService.test.js):

```javascript
it('should correctly parse a valid OpenLibrary response doc', () => {
  // 1. Arrange: Create mock data that looks like what the API sends us
  const mockData = {
    docs: [
      {
        title: 'The Lord of the Rings',
        author_name: ['J.R.R. Tolkien'],
        first_publish_year: 1954,
        isbn: ['1234567890'],
        cover_i: 12345
      }
    ]
  };

  // 2. Act: Pass the mock data to our clean-up function
  const result = parseSearchResults(mockData);

  // 3. Assert: Check if it came out in our tidy app format
  expect(result.length).toBe(1);
  expect(result[0].title).toBe('The Lord of the Rings');
  expect(result[0].author).toBe('J.R.R. Tolkien');
  expect(result[0].pubDate).toBe('1954');
  expect(result[0].coverPhotoUrl).toBe('https://covers.openlibrary.org/b/id/12345-M.jpg');
});
```
* **Why this is awesome:** We don't have to hit the real internet API to test if our clean-up logic works! We just feed it fake data and check the output.

---

### Example B: Testing with Mocks and Spies (`model.test.js`)
Sometimes our code has "side effects"—it does things like write to `localStorage` or call helper callback functions. How do we test that?

In [model.test.js](file:///Volumes/DataCard/Repos/CS233JS-Repos/CS233JS-CourseMaterials/Examples/BookList/tests/model.test.js), look at the `beforeEach` block:
```javascript
beforeEach(() => {
  // Create a fake, local object to act as our storage
  const store = {};
  
  // Replace the browser's global localStorage with a fake one!
  global.localStorage = {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: vi.fn(key => { delete store[key]; })
  };

  model = new BookModel();
});
```
By replacing `global.localStorage` with a fake object built with `vi.fn()`, our code will run perfectly in Node (where `localStorage` doesn't exist by default), and we don't mess up our actual computer's storage.

We can also test if the Model successfully saves to `localStorage` when data changes:
```javascript
it('should save to localStorage when a book is added', () => {
  // 1. Arrange: The spy on localStorage.setItem is already set up in beforeEach!
  
  // 2. Act: Add a book
  model.addBook({ title: 'Test Book' });

  // 3. Assert: Check if our fake localStorage.setItem function was called!
  expect(global.localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(global.localStorage.setItem).toHaveBeenCalledWith(
    'booklist_books', 
    JSON.stringify(model.books)
  );
});
```
* **Why this is awesome:** `vi.fn()` creates a "spy" function that records how many times it was called and what arguments it was given. It lets us verify that our code is talking to outside APIs correctly without actually writing to the real browser storage!

---

### Example C: Testing Asynchronous Network Requests
In [openLibraryService.test.js](file:///Volumes/DataCard/Repos/CS233JS-Repos/CS233JS-CourseMaterials/Examples/BookList/tests/openLibraryService.test.js), we test `searchBooksByTitle`. This function uses `fetch()`. We don't want our tests to fail just because the school Wi-Fi went down, so we mock `fetch`:

```javascript
it('should fetch and return parsed results on success', async () => {
  const mockResponse = {
    docs: [{ title: 'Mock Book', author_name: ['Mock Author'] }]
  };

  // Tell global.fetch to return a successful mock response
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse
  });

  // Call the function (remember it's async, so we must await it!)
  const results = await searchBooksByTitle('Mock Book');
  
  // Assert: Make sure it queried the correct URL
  expect(global.fetch).toHaveBeenCalledWith(
    'https://openlibrary.org/search.json?q=Mock%20Book&limit=10',
    expect.any(Object)
  );
  
  // Assert: Make sure it returned the cleaned up data
  expect(results.length).toBe(1);
  expect(results[0].title).toBe('Mock Book');
});
```

---

## 🏃 How to Run the Tests

To run the test suite, you don't use your browser at all. You use the command line:

1. Open your terminal in the `/Examples/BookList` folder.
2. Run the command:
   ```bash
   npm run test
   ```
3. Vitest will scan your files, find all files ending in `.test.js`, run them, and print a nice report showing how many passed.

---

## 📚 References and Links

To learn more about testing and Vitest without getting too overwhelmed, check out these resources:

* **Vitest Getting Started:** [Vitest Official Docs](https://vitest.dev/guide/) — The best place to lookup matchers (like `.toBe()` vs `.toEqual()`).
* **Mocking in Vitest:** [Vitest Mocking API Docs](https://vitest.dev/guide/mocking.html) — Explains how `vi.fn()` and `vi.spyOn()` work.
* **What is Unit Testing? (Video):** [Unit Testing Explained in 100 Seconds](https://www.youtube.com/watch?v=Jv2uxzhPFl4) — A super fast, beginner-friendly video explaining the concept of tests.
* **Node.js Mocking Patterns:** [MDN Testing Web Apps Guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Test) — A general overview of why we test logic separately from UI.
