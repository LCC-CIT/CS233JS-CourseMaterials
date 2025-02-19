---
title: Getting Site Metadata
description: How to use AJAX to get metadata from web sites.
keywords: AJAX, fetch, Open Graph, metadata
generator: Typora
author: Brian Bird
---

<h1>Getting Site Metadata Using AJAX</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## About Web Site Metadata

The `head` element of a web page contains various types of data about the page and if the page is the home page, about the site. In this week's lab assignment, you will be enhancing the bookmarker app to get the site title, description and a preview image. One source of that information is the Open Graph protocol (see below). Another source are the `title` and various `meta` elements like `<meta name='description' content='a description of the site'`.

## Open Graph Protocol

The Open Graph protocol is a set of `<meta>` tags added to a webpage. It was originally developed by Facebook and is now used by many social media platforms and web sites. Here’s a bit more detail:

- **Purpose**: The Open Graph protocol standardizes the use of metadata within a webpage to represent the content of the page. This allows the page to be the same as other objects on social media, like photos or videos.
- **Usage**: By adding Open Graph tags to the HTML of your webpage, you can determine what information is displayed when your webpage is shared on social media. This can include the title, description, image, and more.
- **Syntax**: Open Graph tags are meta tags containing a property attribute name with the `og` prefix and a content attribute containing information. 
  For example: `<meta property="og:title" content="my really awesome web site">`
- **Requirement**: At a minimum, you should include basic Open Graph tags like `og:title`, `og:type`, `og:image`, and `og:url` in your webpage’s HTML for effective previews on social media.

#### Example Open Graph HTML Meta Elements

These are fromt he [Wikipedia](https://wikipedia.org) head element

```html
<meta property="og:title" content="Wikipedia, the free encyclopedia">
<meta property="og:type" content="website">
<meta property="og:description" content="Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.">
<meta property="og:image" content="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png">
```



## Linkpreview Web API

Linkpreview is a company that offers a *web API* (aka *web service*) for getting data about a web site. They offer both free and paid plans. Their service gets web site meta-data from either Open Graph meta tags or from alternative elements in the web page such as the `title` element.

## Calling the Linkpreview API with Fetch

#### JavaScript Code

This code will call the linkpreview API to get the Open Graph data for freeCodeCamp,.org using the fetch function. 

You can run this code in a browser console.

```javascript
 const SITE_URL = "https://freeCodeCamp.org";
 const API_URL = "https://api.linkpreview.net";
 const API_KEY = "fd3f9a0c9fafe271af5bd823cf3f0c02"; // Use your own linkperview API key

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
     console.log(data.description);
   })
   // Catch any errors and log them to the console
   .catch(error => {
     console.error('Error fetching OpenGraph data:', error);
     alert("There was an error fetching the OpenGraph data. Please try again.");
   });
```



#### Example Web App That Gets Site Metadata

[Fetch Site Metadata](https://lcc-cit.github.io/CS233JS-CourseMaterials/Examples/OpenGraphExample/)



## References

[What is Open Graph and how can I use it for my website?](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/)&mdash;Colby Fayock
Colby Fayock, FreeCodeCamp, 2020.

[What Are Open Graph Meta Tags?](https://www.linkpreview.net/open-graph-meta-tags/)&mdash;Linkpreview Documentation

[Linkpreview API](https://docs.linkpreview.net/)&mdash;Linkpreview Documentation

[Using the JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)&mdash;MDN, 2025.



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time>  are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---