---
title: AJAX
description: How to use AJAX to update data in web pages.
keywords: AJAX, fetch, JSON, promise
generator: Typora
author: Brian Bird
---

<h1>Updating Web Page Data with AJAX</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                            |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review, lab 1   | 6. HTML5 Canvas, CSS Flexbox, lab 4                        |
| 2. ES6 Classes and Git, lab 2                                | 7. <mark>AJAX, ES6 promises, fetch API, lab 5</mark>       |
| 3. More about Classes                                        | 8. Making API calls, graphs and charts, Google maps, lab 6 |
| 4. More time to finish the dice games, lab 2b (XC)           | 9. Term Project                                            |
| 5. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. lab 3, Midterm Quiz | 10. Review                                                 |
| 11. Final Quiz                                               |                                                            |

<h2>Table of Contents</h2>

[TOC]



# AJAX Demo

Look at the MDN Guide: [Fetching Data from the Server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)

Experiment with the [Can Store web app on GitHub](https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/).

Look at the code here: [can-script.js](https://github.com/mdn/learning-area/blob/main/javascript/apis/fetching-data/can-store/can-script.js), in particular the fetchBlob function.

```javascript
function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    const url = `images/${product.image}`;
    // Use fetch to fetch the image, and convert the resulting response to a blob (Binary Large Object)
    // Again, if any errors occur we report them in the console.
    fetch(url)
      .then( response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.blob();
      })
      .then( blob => showProduct(blob, product) )
      .catch( err => console.error(`Fetch problem: ${err.message}`) );
  }
```



# Term Project

| Week | Project Step                                                 | Due Date                                  |
| ---- | ------------------------------------------------------------ | ----------------------------------------- |
| 8    | [Project&mdash;Description + UI MockUp](https://classes.lanecc.edu/mod/assign/view.php?id=4158701) | Friday, May 24                            |
| 9    | [Project&mdash;API Call Research + Documentation](https://classes.lanecc.edu/mod/assign/view.php?id=4158702) | Tuesday, May 28                           |
| 9    | [Project&mdash;JavaScript Dev Environment + Static HTML & CSS](https://classes.lanecc.edu/mod/assign/view.php?id=4158703) | Thursday, May 30                          |
| 10   | Project&mdash;Beta Version                                   | Sunday, June 2                            |
| 10   | Project&mdash;Code Review                                    | Tuesday, June 4                           |
| 10   | [Project&mdash;Implementation](https://classes.lanecc.edu/mod/assign/view.php?id=4158704) <br />Production Version. <br /> | Thursday, June 6<br />Cut-off, Sunday 6/9 |



# Reference

MDN Guide: [Fetching data from the server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 