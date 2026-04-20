---
title: Node.js + Tools
description: Node.js and dev tools in the Node development eco-system.
keywords: Node, NPM, Vite
generator: Typora
author: Brian Bird
---

<h1>Node.js and JavaScript Dev Tools</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Table of Contents</h2>

[TOC]

## Objectives for This Week

- To introduce you to commonly used JavaScript development tools including Node.js and Vite.
- To introduce you to using the web browser's LocalStorage for storing client-side data.
- To develop your proficiency in designing, implementing, testing and debugging JavaScript web apps.

## Node.js

Node.js, often just called simply "Node", is an open-source, cross-platform runtime environment that allows JavaScript to run outside a browser, enabling server-side scripting and command line applications. It enables running JavaScript everywhere.

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

### Module Bundlers

A *module bundler* is a tool that takes all the separate files that make up a web application — JavaScript modules, CSS stylesheets, images, fonts, and other assets — and combines ("bundles") them into one or a small number of optimized output files that a browser can efficiently load.

#### Why Bundlers Are Needed

Modern JavaScript applications are typically written as many small, focused modules that import from one another. Browsers need to fetch every individual file over the network, and historically they were not efficient at loading dozens or hundreds of small files (due to the overhead of multiple HTTP requests). Bundlers solve this by:

- **Combining files** — merging many source files into fewer output files, reducing the number of network requests.
- **Resolving dependencies** — automatically following `import`/`require` statements to pull in everything the app needs.
- **Optimizing assets** — minifying (removing whitespace and shortening variable names) JavaScript and CSS to reduce file sizes.
- **Transpiling modern code** — converting cutting-edge JavaScript syntax into older syntax that a wider range of browsers can understand.

#### How Bundlers Replace Older Approaches

Before bundlers, developers had to manage dependencies manually. The older approach typically involved:

- Adding multiple `<script>` tags to HTML, one for each JavaScript file or library, and carefully ordering them so each script loaded before the code that depended on it.
- Downloading third-party libraries (like jQuery or Bootstrap) and storing copies of them in the project folder, then updating them by hand.
- Concatenating and minifying files manually (or with ad-hoc shell scripts) before deploying.

Bundlers automate all of this. You simply `import` what you need in your code, run the bundler, and it produces a deployment-ready output with everything included and optimized — no manual `<script>` tag management or library copying required.

### Vite

Vite (pronounced "veet", French for *fast*) is a modern front-end build tool and development server. Unlike older bundlers that must process your entire project upfront, Vite serves source files to the browser during development using native ES modules, so it only processes the files the browser actually requests — making startup nearly instant. For production, it bundles everything into optimized static files that browsers can load efficiently.

#### Installing Vite

You install Vite using NPM:

```bash
npm install vite --save-dev
```

The flag `--save-dev` means that Vite will be recorded in the `package.json` file under the `devDependencies` section, since it is a tool used during development rather than a package shipped with your app.

#### Vite Dev Server

Vite includes a built-in development server that "watches" your source files for changes and instantly reflects them in the browser without a full page reload — a feature called *Hot Module Replacement (HMR)*. This makes for a very fast development experience.

The `package.json` file in the starter files for your project includes a script for running the Vite dev server. You run it by typing this on the command line:

```bash
npm run dev
```

Node.js is required to run Vite.

## Using Node and Dev Tools

### Package.json

#### devDependencies section

Each Node project has a package.json file. One of the things it contains is a list of all the node modules the project needs, aka the project's *dependencies*. 

```json
"devDependencies": {
    "vite": "^5.0.0"
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
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

To run a script type `npm run scriptName` on the command line. For example, to start the development server:

```bash
npm run dev
```

Or to build a production-ready bundle:

```bash
npm run build
```



## Reference

- [Node.js official site](https://nodejs.org/en)

  - [Official NPM documentation](https://docs.npmjs.com/)

- [Vite official site](https://vitejs.dev/)

  - [Vite Getting Started Guide](https://vitejs.dev/guide/)

- [ECMAScript Version History](https://en.wikipedia.org/wiki/ECMAScript_version_history)

- [ECMAScript Browser Compatibility Table](https://compat-table.github.io/compat-table/es6/). 




*Note: Parts of these lecture notes were drafted using Claude Sonnet 4.6.*

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 