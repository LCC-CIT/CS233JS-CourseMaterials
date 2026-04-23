---
title: Node.js + NPM
description: Node.js and NPM in the Node development eco-system.
keywords: Node, NPM
generator: Typora
author: Brian Bird
---

<h1>Node.js and NPM</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Table of Contents</h2>

[TOC]

## Node

Node.js, often just called simply "Node", is an open-source, cross-platform runtime environment that allows JavaScript to run outside a browser, enabling server-side scripting and command line applications. It enables running JavaScript everywhere.

In addition to enabling JavaScript apps to run without a web browser, it enables JavaScript development tools that we will be using.

## NPM

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
      *File C:\\Program Files\\nodejs\\npm.ps1 cannot be loaded because running scripts is disabled on this system.*
  This is because NPM commands on Windows are executed using a Power Shell script and running scripts might be restricted on your system. The solution is to open Power Shell as an administrator and execute this command:
  `Set-ExecutionPolicy RemoteSigned`
  If you need guidance on how to do this, see this short tutorial video: https://youtu.be/j78EdlptmJw?si=J8B76t9_sEzHa6p9
- **`npm install` not installing packages for your project**
  This is usually because you are not running NPM in the same directory with the package.json file. You need to run `npm install` from the same directory that package.json is in so that it can read the list of packages to install.
- **More common NPM problems**
  There is a list of c[ommon problems and their solutions](https://docs.npmjs.com/common-errors) in the official Node documentation.

## Creating a Project that Uses Node Modules

### npm init

When you start a new JavaScript project that will use Node modules, the first step is to create a `package.json` file. You do this by running `npm init` in your project folder:

```bash
npm init
```

NPM will ask you a series of questions — project name, version, description, entry point, author, license, etc. — and build the file from your answers. If you want to skip all the questions and accept sensible defaults, use the `-y` flag (*yes to everything*):

```bash
npm init -y
```

Either way, you end up with a `package.json` file in your project folder. Here is what the default output looks like:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

You can edit this file by hand at any time. Once it exists, you are ready to install packages with NPM.

### Installing Node Modules

To install a package and automatically add it to `package.json`, use `npm install` followed by the package name:

```bash
npm install lodash
```

Now the package.json file will have a new field named `dependencies` like this:  
(The ^ means that when automatically updating packages, only the parts after the 4. can be higher numbers.)

```json
{
  // ... other fields,
  "dependencies": {
    "lodash": "^4.18.1"
  }
}
```

To install a development tool llike Vite, you use a command like this:

```bash
npm install vite --save-dev
```

The flag `--save-dev`  is used because this is a development tool (not needed in the final app).  The package.json file will now look like this:

```json
{
  // ... other fields,
  "dependencies": {
    "lodash": "^4.18.1"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

To install *all* packages listed in an existing `package.json` into the node_modules folder on your computer(for example, after cloning a project), run:

```bash
npm install
```




## Using a Node Package in Your Code

Once a package is installed with NPM, you can use it in any of your JavaScript files by importing it with an `import` statement at the top of the file. You do **not** need to specify a file path — Node (and bundlers like Vite) look the package up automatically in `node_modules`.

### Example: Using the `lodash` Library

Suppose you installed [lodash](https://lodash.com/), a popular utility library:

```bash
npm install lodash-es
```

In your JavaScript file, import only the function(s) you need:
(`loadsh-es` is the ESM version of the library)

```javascript
import { capitalize } from 'lodash-es';

const name = capitalize('brian');  // 'Brian'
console.log(name);
```

Or import the whole library under a single name:

```javascript
import _ from 'lodash-es';

const numbers = [3, 1, 4, 1, 5, 9];
const sorted = _.sortBy(numbers);  // [1, 1, 3, 4, 5, 9]
console.log(sorted);
```



## Reference

- [Node.js official site](https://nodejs.org/en)

- [Official NPM documentation](https://docs.npmjs.com/)
  - [Package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)
  - [Version number syntax in package.json](https://github.com/npm/node-semver#versions)


- [lodash documentation](https://lodash.com/docs)

*Note: Parts of these lecture notes were drafted using Claude Sonnet 4.6.*

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 
