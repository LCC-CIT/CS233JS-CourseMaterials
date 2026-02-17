# Can Store&mdash;an Asynchronous JavaScript Demo

This web app is a refactored version of the [Can Store](https://github.com/mdn/learning-area/tree/main/javascript/apis/fetching-data/can-store) demo on the MDN web site. The original demo used `.then` to chain promises, while this version uses `async` / `await`. The original demo was under a [Creative Commons Zero v1.0 Universal license](http://creativecommons.org/publicdomain/zero/1.0/). This code will continue under that license. This code was initially refactored by Gemini 3.0, 2/17/2026.

## Code Explanation

The `can-script.js` file controls the logic for the "Can Store" web app. It has been refactored to use modern JavaScript `async/await` syntax for improved readability and performance.

**Key Features:**

* **Single Data Fetch:**
Unlike the original version which fetched the product data every time a category was selected, this version fetches `products.json` only **once** when the page loads. This reduces network traffic and makes the application feel much faster.
* **Synchronous Filtering:**
Because the product data is loaded into memory at the start, the functions `selectCategory` and `selectProducts` (which filter the list based on the user's input) run **synchronously**. This means sorting and searching happen instantly without waiting for a server response.
* **Asynchronous Image Loading:**
The `fetchBlob` function remains **asynchronous**. It is responsible for fetching the image for each visible product. It uses `async/await` to handle the network request and conversion to a "Blob" (Binary Large Object) cleanly. The `try...catch` block ensures that if an image fails to load, the error is logged without breaking the rest of the application.
* **Modern Syntax:**
All network requests (`fetch`) use the `async/await` pattern instead of the older `.then()` promise chaining. This makes the code execute in a straight line (top-to-bottom), making it easier to read and debug.

