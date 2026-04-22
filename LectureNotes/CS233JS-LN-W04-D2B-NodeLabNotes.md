---
title: Node lab
description: Notes on the Node.js lab.
keywords: source map, development, production, bundle, deployment
generator: Typora
author: Brian Bird
---

<h1>Notes on the Node Lab</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Table of Contents</h2>

[TOC]

## The `lit-html` package

- Look at how the syntax is similar to a template string.
- In the browser's debugger, look at what is returned by `html` and by `render`.
- Compare the development and production versions of `lit-html`.
  - See the dev version running on the dev server: message in console, large dependency visible in debugger
  - See the production version by displaying dist/index.html with live server.

## Source Map

- Remove the source map directive from the bundler config file. In the browser, try to debug the code.
- Re-enable the source map and look at the source in the debugger again.

## Size of Bundled Files

- In the example code, look at the size of the node modules used by the web app.

- Look at the size of the source files.
- Compare these to the size of the bundled files in the dist folder.

## Production Code and Deployment

- The dev server keeps the code it built in memory, but doesn't put it in the dist folder.
- `npm run build` builds (bundles and more) the code with output in the dist folder.  
  **Upload just the files inside the dist folder to citstduent!**

- FYI, when pushing to GitHub, the .gitignore file has node_modules listed as a folder to ignore.



## Reference

[MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, updated in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 