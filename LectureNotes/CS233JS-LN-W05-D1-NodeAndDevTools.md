---
title: More OOP
description: Why using classes and encapsulation makes your code better.
keywords: OOP, class, encapsulation, getter, setter
generator: Typora
author: Brian Bird
---

<h1>More About Classes and Object Oriented Programming</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                     |
| ------------------------------------------------------------ | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review          | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                       | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                        | 8. Making API calls, graphs and charts, Google maps |
| 4. More time to finish the dice games                        | 9. Term Project                                     |
| 5. <mark>JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. Midterm Quiz</mark> | 10. Review                                          |
| 11. Final Quiz                                               |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Announcements

**Spring 2024**

- Midterm opens on Thursday, closes on Sunday.
- Change of office hours to 11:00am M&mdash;Th
- College closed on Friday.

# Node.js

Node.js, often just called "Node"[^1], is an open-source, cross-platform runtime environment that allows JavaScript to run outside a browser, enabling server-side scripting and command line applications. It enables running JavaScript everywhere.

## NPM

NPM, or Node Package Manager, is the default package manager for Node.js. It allows developers to install and manage JavaScript packages (code libraries) in their projects as well as share packages with other developers.

## Installation

There are Node installers for Windows, Mac OS, and Linux. The installers includes NPM. [Download here](https://nodejs.org/en/download).

## Package.json

### devDependencies section

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

To download and install these modules type:

```bash
npm install
```

### scripts section

 The scripts section of package.json allows you to create “macros” that run command line tools for you.

```json
"scripts": {
"webpack": "webpack",
"build": "webpack --config webpack.config.js", 
"watch": "webpack serve --open"
}
```

To run a script type `npm run scriptName` . For example:

```bash
npm run build
```



# Babel

Babel.js is a JavaScript compiler that converts modern JavaScript (ES6+) into backwards-compatible versions for older browsers and environments. It’s widely used in web development for compatibility purposes.



# Webpack

Webpack is a *static module bundler* for JavaScript applications. What this means is that it takes all the dependencies, which includes JavaScript packages, images, css files, etc. and combines (bundles) them together into static modules (files) that it generates.  These are modules that a browser can understand and load faster and more efficiently.

## Webpack and Babel

Webpack can be configured to use Babel to transpile your code. This has been done in the *webpack.config.js* file in the starter files for this week's lab assignment.

## Webpack Dev Server

Webpack also includes a light-weight web server, *webpack-dev-server*, that you can run on your machine. This web server  "watches" your js code for changes and uses Bable to transpile it, then it reloads the transpiled code into the browser automatically as it changes.

The package.json file in the starter files for your project includes a script for running the webpack dev server. You run it with this command:

```bash
npm run watch
```



# Reference

- [Node.js official site](https://nodejs.org/en)

- [Babel official site](https://babeljs.io/)

- [Webpack official site](https://webpack.js.org/)

- [ECMAScript Browser Compatibility Table](https://compat-table.github.io/compat-table/es6/). 

  

[^1]: The name “Node” refers to its capability to create large distributed software systems, where each part of the system runs on a different server. Each server can be considered a “node” in a network

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 