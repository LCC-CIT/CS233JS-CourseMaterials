---
title: Node toolchain setup
description: How to set up NPM, Weback and Babel
keywords: package.json, npm, babel, webpack
generator: Typora
author: Brian Bird
---

<h1>Setting up Dev Tools</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Introduction

This is an example of how to set up all the dev tools for a Node project. The [Going to Boston](https://github.com/LCC-CIT/CS233JS-Going2Boston) dice game is being used as an example.

## Prepare Your Source Code

The .js files in the project are currently loaded into the browser by `<script>` elements in `index.html`

```html
<script src="scripts/die.js"></script>
<script src="scripts/player.js"></script>
<script src="scripts/game.js"></script>
<script src="scripts/index.js"></script>
```

We need to remove all of these, because we will specify what files to load in the `webpack.config.js` file

We also need to remove the link to the CSS file since that will be loaded by webpack as well.

```html
<link href="styles.css" rel="stylesheet">
```



## NPM and Package.json

1. If Node.js and NPM are not already installed on your machine, install them.

2. In your project folder, run: `npm init`  to generate a `package.json` file
   Example:

   ```json
   {
     "name": "going2boston",
     "version": "0.9.0",
     "description": "The Going to Boston dice game",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "repository": {
       "type": "git",
       "url": "git+https://github.com/LCC-CIT/CS233JS-Going2Boston.git"
     },
     "keywords": [
       "dice",
       "boston"
     ],
     "author": "Brian Bird",
     "license": "MIT",
     "bugs": {
       "url": "https://github.com/LCC-CIT/CS233JS-Going2Boston/issues"
     },
     "homepage": "https://github.com/LCC-CIT/CS233JS-Going2Boston#readme"
   }
   ```

## Babel
   Use this command to install babel and add it to the `devDependencies` object in `package.json`: 

   ````bash
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   ````

   

## Webpack

   - Use NPM to install the webpack and webpack CLI modules in your project's folder and simultaneously add them to the  `devDependencies` object in `package.json` file using these commands: 
     ```bash
     npm install webpack --save-dev
     npm install webpack-cli --save-dev
     ```
   
     
   
   - As of version 4.0.0 of webpack, a `webpack.config.js` file isn't needed. If you don't create a configuration file, these defaults will be used:
   
     - Entry:  `./src/index.js`
       The entry point for the application. Webpack will start bundling with this file.
     - Output:  `./dist/main.js`
       This is where Webpack will put the bundled files.
     

But, since we are adding the babel plug-in and other customizations, we need to create a configuration file. This one is based on the default starting file from the webpack documentation:
```javascript
 const path = require('path');

 module.exports = {
   mode: 'development',
   entry: './scripts/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'going2boston.bundle.js',
   },
 };
```

### CSS bundling

Install these two loaders in your project:

```bash
npm install --save-dev style-loader css-loader
```

Configure the loaders in `webpack.config.js`:

```javascript
module.exports = {
  // ... other configuration ...
  module: {
    rules: [
      // ... other rules ...
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

Add a line to import the css file in `index.js`:

```javascript
import '../styles.css';
```

(Note that in this example we assume `styles.css` is in the folder above `index.js`.)

#### What Does `import` do?

In week 8, you will learn more about JavaScript ES modules[^1] and how to import and export them. For now, the important thing to know is that the ES `import` keyword brings in code or functionality from other modules. ES modules are usually a single JavaScript file, but it could also be a set of JavaScript files. 

In the example above, a .css file is being imported instead of a .js file. This is only possible because we are using webpack and added a CSS loader plugin to it.

### HTML plug-in

Install the html-webpack-plugin:

```bash
npm install --save-dev html-webpack-plugin
```

   - Add it to the webpack.config.js file so that the html file(s) will be copied to the dist folder.
     - You need an additional plug-in object for each html file in the project.

```javascript
// at the top of the file:
const htmlWebpackPlugin = require("html-webpack-plugin");

// in the module.exports object:
plugins: [
  new htmlWebpackPlugin({
    template: "./index.html"
  })
```

### Copy plug-in

Install a plug-in that will copy assets (images, etc.) to the dist folder.

```bash
npm install --save-dev copy-webpack-plugin
```

Add the plug-in to the webpack.config.js file:

```javascript
// at the top of the file:
const copyPlugin = require("copy-webpack-plugin");

// in the plugins:
new copyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "./images"),
      to: path.resolve(__dirname, "dist/images"),
    }
  ],
})
```



### Bable-loader

Install a plug-in that will load bable so that it can be used to transpile your JS code to an older version of JS.

```bash
npm install --save-dev bable-loader
```

Add the babel-loader module to the webpack.config.js file:

```javascript
     module: {
       rules: [
         {
           test: /\.(?:js|mjs|cjs)$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: [
                 ['@babel/preset-env', { targets: "defaults" }]
               ]
             }
           }
         }
       ]
     }
```


### Test webpack

At this point you can test webpack by running this command:
```bash
npx webpack
```

Webpack should run wihtout errors and create a dist folder. You should be able to open the index.html file in the dist folder and see the app run correctly.

### Webpack dev server

Install the webpack dev server using this command which will also add it to package.json:

```bash
npm install --save-dev webpack-dev-server
npm install --save-dev html-webpack-plugin
```

Add this code to the webpack.config.js file to add the plug-in for the dev server to webpack:

```javascript
// in the module.exports object, aftr the plug-ins:
devtool: 'inline-source-map',
devServer: {
  static: './dist',
},
	optimization: {
  runtimeChunk: 'single',
}
```

#### Test the dev server

Run this command:

```bash
npx webpack serve --open
```



## Reference

[NPM documentation on packages and modules](https://docs.npmjs.com/packages-and-modules) 

- [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file)
- [Specifying dependencies and devDependencies in a package.json file](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

[Webpack documentation](https://webpack.js.org/concepts/)

- [Configuration](https://webpack.js.org/concepts/configuration/)
- [babel-loader](https://webpack.js.org/loaders/babel-loader/)
- [Development and the dev server](https://webpack.js.org/guides/development/)

[Babel documentation](https://babeljs.io/docs/)



[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---

[^1]: there are two main kinds of modules in JavaScript: a) ES modules (ESM) which were introduced in ES6, use `import` and `export` syntax, are supported by modern browswer and node.js and normally have a .mjs file extension. b) Common JS modules (CJS) which was the default module type for node.js before ES6, use `require` and `module.exports` syntax and normally have a .js or .cjs extension.

