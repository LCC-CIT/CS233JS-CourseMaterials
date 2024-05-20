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

## HTTP Requests

There are multiple HTTP request types. We are just going to look at GET requests here. A GET request just does what it sounds like it gets data which is returned in a response. A GET request is a web URL with optional query parameters. 

### HTTP Requests in HTML

Here is an example that returns a web page from a remote server:

https://citstudent.lanecc.edu/~brianb/southindia/index.htm

We can also just get an image from a remote server:

```html
<img src="https://citstudent.lanecc.edu/~brianb/southindia/Chennai/MarinaBeach.jpg" width="500" height="200">
```



<img src="https://citstudent.lanecc.edu/~brianb/southindia/Chennai/MarinaBeach.jpg" width="500" height="200">

Or text:

```html
<embed type="text/html" src="https://citstudent.lanecc.edu/~brianb/CS233JS/Examples/GhandiQuote.txt"  width="500" height="200>
```

<embed type="text/html" src="https://citstudent.lanecc.edu/~brianb/CS233JS/Examples/GhandiQuote.txt"  width="500" height="200>



### HTTP Requests from JavaScript

In order to do something with an HTTP response, other than show it on a web page, we need a way to make a request using code. 

#### XMLHttpRequest

This is a JavaScript API for making synchronous HTTP requests.

```javascript
function reqListener() {
  console.log(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://citstudent.lanecc.edu/~brianb/CS233JS/Examples/GhandiQuote.txt");
req.send();

```

<script>
  function reqListener() {
  	console.log(this.responseText);
	}  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", "https://citstudent.lanecc.edu/~brianb/CS233JS/Examples/GhandiQuote.txt");
  req.send();
</script>





# Backend Web Dev ?

## JSON Server

Q: How is this different from the webpack dev server?



# Security

GitDefender alert about web api key

Store api key in environment variable



# Lab 5 ?

## Test Drivers



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