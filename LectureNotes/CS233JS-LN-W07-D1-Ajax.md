---
title: AJAX
description: How to use AJAX to update data in web pages using async/await.
keywords: AJAX, fetch, JSON, promise, async, await
generator: Typora
author: Brian Bird
---

<h1>Updating Web Page Data using AJAX</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## Introduction

The demo below is meant to supplement the explanation of AJAX given in Mari Good's videos and accompanying power point slides.

## AJAX Demo

Look at the MDN Guide: [Fetching Data from the Server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data), but just skim the section starting with "Finally we're ready to use the Fetch API", since the example there uses `.then` promise chaining. Our example below, uses the more modern `async` / `await` approach.

Experiment with the [Can Store](https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/CanStore/) web app running on GitHub.

Look at the code here: [can-script.js]https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/CanStore/can-script.js), in particular the `fetchBlob` function (which has been refactored to use async / await).

### Key Concepts

- `Fetch` is a global, "built-in", JavaScript function that will get data from a URL and return a `promise` object.
- A `promise` is like a placeholder that can be in one of three states:
  1. **Pending**: The initial state, when the promise has not yet been fulfilled or rejected.
  2. **Fulfilled**: The promise has completed successfully, and a data value is available.
  3. **Rejected**: The promise has failed, and an error or reason for failure is available.

- `async` is a keyword placed before a function definition. It ensures that the function returns a promise and allows the use of the `await` keyword inside it.
- `await` is an operator used inside an `async` function. It pauses the execution of the function until a promise is settled (fulfilled or rejected), effectively "unwrapping" the promise to give you the data directly. 
- `try...catch` blocks are used to handle errors. Since `await` makes asynchronous code look synchronous, we use standard try/catch blocks to handle rejected promises (like network errors).

```javascript
async function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    const url = `images/${product.image}`;
    
    try {
        // Call fetch to get an image. Fetch returns a promise.
        // The await keyword pauses execution here until the request completes.
        const response = await fetch(url);

        // If the server returns an error (like 404), throw an error manually
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Convert the response to a blob (Binary Large Object)
        // This also returns a promise, so we await it.
        const blob = await response.blob();

        // Once we have the blob, pass it to showProduct
        showProduct(blob, product);
        
    } catch (err) {
        // If fetch fails or any error is thrown above, code jumps here
        console.error(`Fetch problem: ${err.message}`);
    }
}
```



## Reference

[Fetching data from the server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)&mdash;MDN Guide, 2024.

This tutorial and it's code examples use the older `.then()` promise chaining syntax. 



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time> with assistance from Gemeini 3.0, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---

