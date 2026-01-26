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

Node.js, often just called simply "Node"[^1], is an open-source, cross-platform runtime environment that allows JavaScript to run outside a browser, enabling server-side scripting and command line applications. It enables running JavaScript everywhere.

In addition to enabling JavaScript apps to run witout a web browser, it enables JavaScript development tools that we will be using.

### NPM

NPM, or Node Package Manager, is the default *package manager* for Node.js. It allows developers to install and manage JavaScript packages (code libraries) in their projects as well as share packages with other developers.

### Installing Node and NPM

There are Node installers for Windows, Mac OS, and Linux. The installers install NPM along with Node. [Download here](https://nodejs.org/en/download). 

#### Testing the Installation

Check to see if Node is installed by typing `node -v` on the command line which should respond with the version number. If Node is there, then also try typing `npm -v` and see if it shows you the Npm version number.

##### Hello Node

Try writing a simple *Hello World* (or Hello Node) program. Put this code in a file named `hello.js`:

```javascript
console.log("Hello Node!")
```

Run it using this command:

```javascript
node hello.js
```

#### Common Problems

- **Node and NPM not responding after installation**
  If you just installed Node and typing `node -v` results in an error saying the command isn't recognized, It could be because your terminal (or VS Code if you are using its terminal) was open during installation which would mean the PATH environment variable with the path to Node wasn't loaded. The solution is to close your terminal and or VS Code and re-open it.
- **npm commands cause an error (only an issue on Windows)**
  A common problem that occurs after installing Node and NPM is that when you try to run a command, like `npm install`, you get an error message like:
      *File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.*
  This is because NPM commands on Windows are executed using a Power Shell script and running scripts might be restricted on your system. The solution is to open Power Shell as an administrator and execute this command:
  `Set-ExecutionPolicy RemoteSigned`
  If you need guidance on how to do this, see this short tutorial video: https://youtu.be/j78EdlptmJw?si=J8B76t9_sEzHa6p9
- **`npm install` not installing packages for your project**
  This is usually because you are not running NPM in the same directory with the package.json file. You need to run `npm install` from the same directory that package.json is in so that it can read the list of packages to install.
- **More common NPM problems**
  There is a list of c[ommon problems and their solutions](https://docs.npmjs.com/common-errors) in the official Node documentation.

## Dev Tools

### Webpack

Webpack is a *static module bundler* for JavaScript applications. What this means is that it takes all the dependencies, which includes JavaScript packages, images, css files, etc. and combines (bundles) them together into static modules (files) that it generates.  These are modules that a browser can understand and load faster and more efficiently.

#### Installing Webpack

You install webpack using NPM:

```bash
npm install webpack webpack-cli --save-dev
```

The `install` command is followed by the two things being installed: `webpack` itself and `webpack-cli` which is the command-line interface module for webpack. The flag, `--save-dev`,  means that these npm packages will be stored in the `packag.json` file in the `devDependencies` section.

#### Webpack Dev Server

Webpack also includes a light-weight web server, *webpack-dev-server*, that you can run on your machine. This web server  "watches" your js code for changes and uses Bable to transpile it, then it reloads the transpiled code into the browser automatically as it changes.

The package.json file in the starter files for your project includes a script for running the webpack dev server. You run it ty typing this on the command line:

```bash
npm run watch
```

Node.js is required to run Webpack.

## Using Node and Dev Tools

### Package.json

#### devDependencies section

Each Node project has a package.json file. One of the things it contains is a list of all the node modules the project needs, aka the project's *dependencies*. 

```json
"devDependencies": {
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



## Reference

- [Node.js official site](https://nodejs.org/en)

  - [Official NPM documentation](https://docs.npmjs.com/)

- [Webpack official site](https://webpack.js.org/)

  - [Webpack Getting Started Guide](https://webpack.js.org/guides/getting-started/)

- [ECMAScript Version History](https://en.wikipedia.org/wiki/ECMAScript_version_history)

- [ECMAScript Browser Compatibility Table](https://compat-table.github.io/compat-table/es6/). 

  

[^1]: In her notes and video, Mari introduced you to Array.splice() and Array.push(), but in my (Brian's) CS133JS class, you were already introduced to those.

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 