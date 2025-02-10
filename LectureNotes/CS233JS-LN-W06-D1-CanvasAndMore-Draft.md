---
title: HTML5 Canvas
description: HTML5 Canvas and more about the Node.js dev toolchain
keywords: Canvas, Node, NPM, Babel, Webpack
generator: Typora
author: Brian Bird
---

<h1>Node.js and JavaScript Dev Tools</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                        |                                                     |
| ----------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review   | 6. <mark>HTML5 Canvas, CSS Flexbox</mark>           |
| 2. ES6 Classes and Git                                | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                 | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. | 9. Term Project                                     |
| 5. Midterm Quiz                                       | 10. Review                                          |
| 11. Final Quiz                                        |                                                     |



<h2>Table of Contents</h2>

[TOC]

# More on JS Dev Tools

## Webpack

- Comparison of unbundled files to bundled files in the Meme Creator project:
  - Size: 
    - memes.bundle.js is 1,100KB
    - src folder is 37KB
- Import: Is this only understood by webpack, or is it also understood by other tools, Node, browsers?
  - Babel is what allows importing css into JS.
- Webpack is not a "transpiler", it is a module bundler.
  - What is a module?

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

Remember, Webpack only understands JavaScript and JSON¹. So, it converts other frontend files like HTML and CSS into modules with the help of a loader¹. This provides a complete front-end solution¹.

Source: Conversation with Bing, 5/6/2024
(1) What are the advantages of using Webpack - GeeksforGeeks. https://www.geeksforgeeks.org/what-are-the-advantages-of-using-webpack/.
(2) Why webpack | webpack. https://webpack.js.org/concepts/why-webpack/.
(3) Webpack: When To Use And Why - Andy Ray's Blog. https://andrewray.me/blog/webpack-when-to-use-and-why.

## NPM

### package-lock.json

Yes, `package-lock.json` should be tracked in Git. Here's why:

- **Version Locking**: `package-lock.json` is a lock file that keeps the version of all your dependencies¹. Whenever someone runs `npm install`, they will get the exact same version of your application, including external dependencies¹.
- **Avoids Inconsistencies**: If you don't commit it, then the version of the application everyone else will get is different than what you are running locally¹. This means that things might work for you, but break on the CI/production/other local machines¹.
- **Never Delete It**: If you delete `package-lock.json` and re-install, you are forcing the latest versions of all packages in the dependency tree¹. This means you are changing the behavior of potentially the entire application¹.
- **Commit Every Time It Changes**: It's a good practice to commit `package-lock.json` every time it changes¹. This helps to keep track of how your dependencies and sub-dependencies have changed over time, which might also help with debugging things when your code breaks³.

So, the general advice is to put `package-lock.json` in Git, commit it every time it changes, and never delete it¹. However, if you're using another package manager like Yarn, you might want to ignore `package-lock.json` to avoid resolution inconsistencies caused by unsynchronized lock files².

Source: Conversation with Bing Copilot, 5/6/2024
(1) package-lock.json - in GIT or not? - DEV Community. https://dev.to/adamklein/package-lock-json-in-git-or-not-50l5.
(2) Should I git ignore package-lock.json? Understanding package manager .... https://willamesoares.com/posts/should-i-git-ignore-package-lockjson.
(3) Do I commit the package-lock.json file created by npm 5?. https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5.





# References

[Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)&mdash;MDN

[FileReader Object](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)&mdash;MDN



[^1]: 

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 