---
title: AJAX
description: How to use AJAX to update data in web pages.
keywords: AJAX, fetch, JSON, promise
generator: Typora
author: Brian Bird
---

<h1>Working with Web APIs fop the Open Graph Protocol</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Open Graph Protocol

The Open Graph protocol is a set of `<meta>` tags added to a webpage. It was originally developed by Facebook and is now used by many social media platforms and web sites. Here’s a bit more detail:

- **Purpose**: The Open Graph protocol standardizes the use of metadata within a webpage to represent the content of the page. This allows the page to be the same as other objects on social media, like photos or videos.
- **Usage**: By adding Open Graph tags to the HTML of your webpage, you can determine what information is displayed when your webpage is shared on social media. This can include the title, description, image, and more.
- **Requirement**: At a minimum, you should include basic Open Graph tags like `og:title`, `og:type`, `og:image`, and `og:url` in your webpage’s HTML for effective previews on social media.



### Example

#### Open Graph HTML Meta Elements

 This code is from the `<head>` eleement of the [FreeCodeCamp](freeCodeCamp.org) home page (winter 2025) :

```html
<meta property="og:site_name" content="freeCodeCamp.org">
<meta property="og:type" content="website">
<meta property="og:title" content="freeCodeCamp.org">
<meta property="og:description" content="Browse thousands of programming tutorials written by experts. Learn Web Development, Data Science, DevOps, Security, and get developer career advice.">
<meta property="og:url" content="https://www.freecodecamp.org/news/">
<meta property="og:image" content="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png">
<meta property="og:image:width" content="1920">
<meta property="og:image:height" content="1080">
```

#### JavaScript Code to Fetch Open Graph Data

```javascript
const SITE_URL = "https://freeCodeCamp.org";
const API_URL = "https://api.linkpreview.net/";
const API_KEY = "fd3f9a0c9fafe271af5bd823cf3f0c02"; // Use your own linkperview API key

function getDescription() {
  // Fetch the OpenGraph data from the linkpreview API
  fetch(`${API_URL}?q=${SITE_URL}&key=${API_KEY}`)
  		// Check the response and throw an error if it's not
      .then(response => {
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
    		 // return the JSON data in a promise to the next then block
         return response.json();
      })
  		// Parse the JSON and display the OpenGraph data on the page
      .then(data => {
         return data.description;
      })
  	  // Catch any errors and log them to the console
      .catch(error => {
         console.error('Error fetching OpenGraph data:', error);
         alert("There was an error fetching the OpenGraph data. Please try again.");
      });
	});
}
```

#### Example Web App





## Reference

[What is Open Graph and how can I use it for my website?](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/)&mdash;Colby Fayock
Colby Fayock, FreeCodeCamp, 2020.



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time> are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). Some parts of this document were created with the assistance of Microsoft Copilot.