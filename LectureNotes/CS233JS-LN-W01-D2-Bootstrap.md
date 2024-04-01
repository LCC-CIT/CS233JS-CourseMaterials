---
title: Intro to Bootstrap
description: Quick intro to Bootstrap 
keywords: Bootstrap
generator: Typora
author: Brian Bird
---

<h1>Intro to Bootstrap</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                     |
| ------------------------------------------------------------ | --------------------------------------------------- |
| 1. Intro to Course, <mark>Bootstrap</mark> and JavaScript Review | 6. AJAX, ES6 promises, fetch API                    |
| 2. ES6 Classes and Git                                       | 7. Making API calls, graphs and charts, Google maps |
| 3. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage         | 8. TBD                                              |
| 4. HTML5 Canvas, CSS Flexbox                                 | 9. Term Project                                     |
| 5. Midterm Review and Quiz                                   | 10. Review                                          |
| 11. Final Quiz                                               |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Introduction

Bootstrap is an open source CSS and JavaScript library for layout and styling of web pages. It’s *responsive* and *mobile-first* and is one of the the most popular front-end libraries. 

- *Responsive* web design that the web page will adapt to the screen size, platform and orientation of the user's browser.
- *Mobile-first* means designing a web site starting with the mobile version, which is then adapted to larger screens.

# Using Bootstrap

## Add it to a Web Page

In the `<head>` element of the web page:

- Add a link to Bootstrap, in this case, it's on a CDN.

   ```html
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"    rel="stylesheet">
   <script    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js">   </script>
   ```

- Add the responsive viewport meta tag to ensure proper rendering and touch zooming for all devices.

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

## Using it in a Web Page

The Bootstrap library contains style sheets with a huge number of CSS classes. The main way you control styling and layout of your web pages is by adding these classes to the elements of your page. For example, the code below whould make the div have rounded corners, a light background an centered, heading 1 text.

```html
<div class="h1 text-center bg-light rounded">
```



# Reference

- [Bootstrap 5 Tutorial](https://www.w3schools.com/bootstrap5/)&mdash; W3Schools
- [Official Bootstrap Website](https://getbootstrap.com/)



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------