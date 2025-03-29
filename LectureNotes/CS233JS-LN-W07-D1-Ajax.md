---
title: AJAX
description: How to use AJAX to update data in web pages.
keywords: AJAX, fetch, JSON, promise
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

Look at the MDN Guide: [Fetching Data from the Server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)

Experiment with the [Can Store](https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/)  web app running on GitHub.

Look at the code here: [can-script.js](https://github.com/mdn/learning-area/blob/main/javascript/apis/fetching-data/can-store/can-script.js), in particular the `fetchBlob` function.

### Key Concepts

- `Fetch` is a global function that will get data from a URL and return a `promise` object.
- A `promise` is like a placeholder that can be in one of three states:
  1. **Pending**: The initial state, when the promise has not yet been fulfilled or rejected.
  2. **Fulfilled**: The promise has completed successfully, and a data value is available.
  3. **Rejected**: The promise has failed, and an error or reason for failure is available.

- `then` is a method on `promise` objects that is used to handle the fulfillment or rejection of a promise. 
  - It takes up to two arguments:
    - A callback function for when the promise is fulfilled: This function is called with the promise's resolved value.
    - (Optional) A callback function for when the promise is rejected: This function is called with the reason for the promise's rejection.
  - It returns a `promise` so that `then` methods can be chained.

```javascript
function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    const url = `images/${product.image}`;
    // Call fetch to get an image. Fetch returns a promise.
    fetch(url)
      // When the promise resolves it is passed into the then method of the promise
      .then( response => {
      	// If any errors occur, report them in the console.
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // convert the response to a blob (Binary Large Object)
        return response.blob();
      })
      // the blob is passed into the next then, which passes it to showProduct
      .then( blob => showProduct(blob, product) )
     // if there is an error in fetch or any then, catch will be called.
      .catch( err => console.error(`Fetch problem: ${err.message}`) );
  }
```



## Reference

[Fetching data from the server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)&mdash;MDN Guide, 2024.



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time> are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 