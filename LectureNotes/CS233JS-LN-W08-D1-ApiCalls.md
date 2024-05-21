---
title: Web API
description: TBD
keywords: TBD
generator: Typora
author: Brian Bird
---

<h1>Working with Web APIs</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. Intro to Course, Bootstrap and JavaScript Review, lab 1   | 6. HTML5 Canvas, CSS Flexbox, lab 4                          |
| 2. ES6 Classes and Git, lab 2                                | 7.AJAX, ES6 promises, fetch API, lab 5                       |
| 3. More about Classes                                        | 8.  <mark>Making API calls, graphs and charts, Google maps, lab 6</mark> |
| 4. More time to finish the dice games, lab 2b (XC)           | 9. Term Project                                              |
| 5. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. lab 3, Midterm Quiz | 10. Review                                                   |
| 11. Final Quiz                                               |                                                              |

<h2>Table of Contents</h2>

[TOC]

# XHR Calls Revisited

Let's review HTTP requests in general and XMLHttpRequsts (XHRs) in particular.  
**Note**:  when we talk about "XHRs" we mean any HTTP request sent from code, not just requests sent by the JavaScript `XMLHttpRequest` object. XHRs usually get some specific data rather than a whole HTML file.

## HTTP Requests

There are multiple HTTP request types. We are just going to look at GET requests here. A GET request does what it sounds like, it gets data which is returned in an HTTP response. A GET request consists of a web URL with optional query parameters. 

The code for all the following examples can be seen running on [this code demo web page](https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/XHR_Demo/index.html). On the code demo page:

- View the source in the browser.

- Open the browser's console to see log messages.

- Open the browser's network tab to see HTTP requests and responses.

  

### HTTP Requests in HTML
#### `<a>` Element

A simple link (anchor element) can return a web page from a remote server:
```html
https://citstudent.lanecc.edu/~brianb/southindia/index.htm
```
#### `<Embed>` Element
We can also get text from a file on a remote server and embed it in our web page:

```html
<embed type="text/html" src="https://citstudent.lanecc.edu/~brianb/CS233JS/Examples/GhandiQuote.txt"  width="500" height="200>
```

### HTTP Requests from JavaScript

In order to do something with an HTTP response, other than show it on a web page, we need a way to make a request using code. 

#### `XMLHttpRequest` Object

This example uses the `XMLHttpRequst` object to make a *synchronous* HTTP request.  
Note that `XMLHttpRequest.open` can also be used to make *asynchronous* requests if the last argument is set to `true`.

**HTML**

```html
<p class="quote" id="quote"></p>
```

**JavaScript**

```javascript
let request = new XMLHttpRequest();
  request.open("GET", 'https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/XHR_Demo/GhandiQuote.txt', false); 
  request.send(null);

  if (request.status === 200) {
      document.getElementById('quote1').innerHTML = request.responseText;
  }
```

#### `fetch` Method with Fluent Syntax
Here is an *asynchronous* request using `fetch` that gets the contents of a text file and displays it on the page. This code uses *fluent syntax* (aka method chaining), meaning that the `then` methods are called on `Promise` objects returned by the `fetch` and `then` methods. The `Promise` objects are not visible in the code, although they are still there "behind the scenes".

```javascript
fetch('https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/XHR_Demo/GhandiQuote.txt')
  .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.text();
  })
  .then(text => {
      document.getElementById('quote').innerHTML = text;
  })
  .catch(function () {
 		console.log('An error occurred');
  });
```

#### `fetch` Method with Procedural Syntax

Here is the same *asynchronous* request using `fetch`, but in this code the `Promise` objects returned by the  `fetch` and `then` methods are assigned to variables before being used, so they are "visible" in the code.

```JavaScript
const fetchPromise = fetch('https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/XHR_Demo/GhandiQuote.txt');

const responsePromise = fetchPromise.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.text();
});

responsePromise.then(text => {
    document.getElementById('quote').innerHTML = text;
});

responsePromise.catch(function () {
   console.log('An error occurred');
});
```


# More Dev Tools
These are used in lab 6.

## JSON Server

Q: How is this different from the webpack dev server?

## DotEnv

GitDefender alert about web api key.

Store api key in environment variables.



# Lab 6

## Map API

### Azure Maps

[Getting Started with Azure Maps](https://learn.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys)&mdash;Microsoft Blog Post.

- Requires an [Azure for Students](https://azure.microsoft.com/en-us/free/students) account.
  - Free  for12 months, no credit card required.
  - Azure is used for other classes in our department.
- 1,000 or more (depending on the type of transaction) free transactions (without using your credit).

### Google Maps

[Getting Started with Google Maps Platform](https://developers.google.com/maps/get-started)&mdash;GCP  Docs.

Requires a [GCP (Google Cloud Platform)](https://cloud.google.com) account.

- 90 free trial, requires a credit card.
  - Your card could be billed if you use more than $300 in "free" services during the trial period.  
    A notification will be sent if this is about to happen.
  - After the trial period, you get a $200 a month free credit for GCP services, including Google Maps.

# Reference

[Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest)&mdash;MDN

[Get and Post method using Fetch API](https://www.geeksforgeeks.org/get-and-post-method-using-fetch-api/)&mdash;Geeks for Geeks.

[How to Use JSON Server for Front-end Development](https://www.freecodecamp.org/news/json-server-for-frontend-development/)&mdash;Juliet Ofoegbu, Free Code Camp.

[How to Use Node Environment Variables with a DotEnv File for Node.js and npm](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/)&mdash;Veronica Stork, Free Code Camp.



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---