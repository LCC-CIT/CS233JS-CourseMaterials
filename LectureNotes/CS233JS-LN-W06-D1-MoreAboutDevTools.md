---
title: More on Dev Tools
description: More about the Node.js dev toolchain
keywords: Canvas, Node, NPM, Babel, Webpack
generator: Typora
author: Brian Bird
---

<h1>HTML5 Canvas and More On Dev Tools</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                        |                                                     |
| ----------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review   | 6. <mark>More on Dev Tools and HTML5 Canvas</mark>  |
| 2. ES6 Classes and Git                                | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                 | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. | 9. Term Project                                     |
| 5. Midterm Quiz                                       | 10. Review                                          |
| 11. Final Quiz                                        |                                                     |



<h2>Table of Contents</h2>

[TOC]

## More on JS Dev Tools

This week you will be workining with the same JS web dev tools you used last week:

### Node.js and NPM

- The lab 5 `package.json` will have the same kinds of things in it as lab 4.
- Type: `npm install` to install all the node modules.

### Webpack

This week you'll learn more about using Wepack.

- webpack.config.json
  The lab 5 version of this file has more kinds of things in it.

  - Type: `npm run webpack` to build the project and create the dist folder.

- dist folder
  In lab 5 you'll learn more about how the bundled code is generated.

  - memes.bundle.js&mdash;contains all the .js and .css code bundled into one big file.
  - memes.bundle.js.map&mdash;maps the dist code to the src code so you can debug your src code in a web browser.

#### Dev Server

  Run the development server with `npm run watch`  (This doesn't rebuild the dist folder, the server puts transpiled code in memory.)

  

### Benefits of Using Webpack

  Webpack offers several benefits for JavaScript development:

  1. **Module Bundling**: Webpack is a module bundler that creates a dependency graph of all your project's modules¹. It starts from an entry point and follows all the dependencies to know what it has to bundle¹.
  2. **Loaders**: Webpack uses loaders to convert different types of files like images and CSS into modules before adding them to the dependency graph¹.
  3. **Plugins**: Plugins in Webpack provide additional functionality, such as printing something on running the webpack, minifying, and optimizing bundles¹.
  4. **Code Splitting**: Webpack supports a module system that allows you to split your code into different modules¹. This means you can use one file's features in another, despite having different files¹.
  5. **Minification**: Webpack provides minification, which reduces file size and minimizes the code¹. It removes all the whitespace, line breaks, and unnecessary code, and changes long variable names¹.
  6. **Development Speed**: Webpack can speed up the development process. If you're using Webpack, your page does not need to fully reload when there's a small change in JavaScript¹. This benefit can also be accessed for CSS if you use loaders¹. It also reduces the load time of the website during debugging¹.
  7. **Avoids Global Variable Overwriting**: Since Webpack provides a module system based on ECMAScript (ES6), every file you create will become a module¹. Hence, every variable you create in this file will be in the local scope¹. This solves the problem of overwriting global variables¹.
  8. **Feature Flagging**: Webpack supports feature flagging, a software engineering approach by which you can send code to different environments during feature testing¹.

Note: Webpack only understands JavaScript and JSON¹. So, it converts other frontend files like HTML and CSS into modules with the help of a loader¹.

  Source: Bing Copilot, 5/6/2024
  (1) What are the advantages of using Webpack - GeeksforGeeks. https://www.geeksforgeeks.org/what-are-the-advantages-of-using-webpack/.
  (2) Why webpack | webpack. https://webpack.js.org/concepts/why-webpack/.
  (3) Webpack: When To Use And Why - Andy Ray's Blog. https://andrewray.me/blog/webpack-when-to-use-and-why.

  

### Babel





## References

[Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)&mdash;MDN

[FileReader Object](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)&mdash;MDN



[^1]: 

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 