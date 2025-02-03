---
title: Node.js + Tools
description: Node.js and dev tools in the Node development eco-system.
keywords: Node, NPM, Babel, Webpack
generator: Typora
author: Brian Bird
---

<h1>Node.js and JavaScript Dev Tools</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                     |
| ------------------------------------------------------------ | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review          | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                       | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                        | 8. Making API calls, graphs and charts, Google maps |
| 4. <mark>JS Dev Tools: Node.js, NPM, Webpack, LocalStorage.</mark> | 9. Term Project                                     |
| 5. Midterm Quiz                                              | 10. Review                                          |
| 11. Final Quiz                                               |                                                     |



<h2>Table of Contents</h2>

[TOC]

## Objectives for This Week

- To introduce you to commonly used JavaScript development tools including Node.js, Babel, and Webpack.
- To introduce you to using the web browser's LocalStorage for storing client-side data.
- To develop your proficiency in designing, implementing, testing and debugging JavaScript web apps.

## Node.js

Node.js, often just called "Node"[^1], is an open-source, cross-platform runtime environment that allows JavaScript to run outside a browser, enabling server-side scripting and command line applications. It enables running JavaScript everywhere.

### NPM

NPM, or Node Package Manager, is the default package manager for Node.js. It allows developers to install and manage JavaScript packages (code libraries) in their projects as well as share packages with other developers.

### Installation

There are Node installers for Windows, Mac OS, and Linux. The installers includes NPM. [Download here](https://nodejs.org/en/download). 

### Package.json

#### devDependencies section

Each Node project has a package.json file. One of the things it contains is a list of all the node modules the project needs, aka the project's *dependencies*. 

```json
"devDependencies": {
    "@babel/cli": "^7.18.10",
    "@babel/core": "^7.19.1",
    "@babel/preset-env": "^7.19.1",
    "html-webpack-plugin": "^5.5.0",
    "copy-webpack-plugin": "^11.0.0",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.11.1"
  }
```

To download and install these modules type this on the command line:

```bash
npm install
```

#### scripts section

 The scripts section of package.json allows you to create “macros” that run command line tools for you.

```json
"scripts": {
"webpack": "webpack",
"build": "webpack --config webpack.config.js", 
"watch": "webpack serve --open"
}
```

To run a script type `npm run scriptName` on the command line. For example:

```bash
npm run build
```



## Babel

Babel.js is a JavaScript compiler that converts modern JavaScript (ES6+) into backwards-compatible versions, like ES5, for older browsers and environments. It’s widely used in web development for compatibility purposes.

These days (2025), you might use Bable to compile from some newer version of JS, like ES2024, to a version supported by all the browsers, which could be ES5 or ES6.

Note: Node.js is required to run Babel.

## Webpack

Webpack is a *static module bundler* for JavaScript applications. What this means is that it takes all the dependencies, which includes JavaScript packages, images, css files, etc. and combines (bundles) them together into static modules (files) that it generates.  These are modules that a browser can understand and load faster and more efficiently.

### Installing Webpack

You install webpack using NPM:

```bash
npm install webpack webpack-cli --save-dev
```

The `install` command is followed by the two things being installed: `webpack` itself and `webpack-cli` which is the command-line interface module for webpack. The flag, `--save-dev`,  means that these npm packages will be stored in the `packag.json` file in the `devDependencies` section.

### Webpack and Babel

Webpack can be configured to use Babel to transpile your code. This has been done in the *webpack.config.js* file in the starter files for this week's lab assignment.

### Webpack Dev Server

Webpack also includes a light-weight web server, *webpack-dev-server*, that you can run on your machine. This web server  "watches" your js code for changes and uses Bable to transpile it, then it reloads the transpiled code into the browser automatically as it changes.

The package.json file in the starter files for your project includes a script for running the webpack dev server. You run it ty typing this on the command line:

```bash
npm run watch
```



Node.js is required to run Webpack.



## Reference

- [Node.js official site](https://nodejs.org/en)

- [Babel official site](https://babeljs.io/)

- [Webpack official site](https://webpack.js.org/)

  - [Webpack Getting Started Guide](https://webpack.js.org/guides/getting-started/)

- [ECMAScript Version History](https://en.wikipedia.org/wiki/ECMAScript_version_history)

- [ECMAScript Browser Compatibility Table](https://compat-table.github.io/compat-table/es6/). 

  

[^1]: In her notes and video, Mari introduced you to Array.splice() and Array.push(), but in my (Brian's) CS133JS class, you were already introduced to those.

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 