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

This is an example of how to set up all the dev tools for a Node project. The *Going to Boston* dice game is being used as an example.

## NPM and Package.json

1. If Node.js and NPM are not already installed on your machine, install them.

2. In your project folder, run: `npm init`  to generate a package.json file
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
   Use this command to install babel and add it to the `devDependencies` in package.json: 

   ````bash
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   npm install webpack-cli --save-prod
   ````

   

## Webpack

   - Install webpack and webpack CLI in your project's folder and simultaneously add it to the list of dependencies in package.json using these commands: 
     ```bash
     npm install webpack --save-prod
     npm install webpack-cli --save-prod
     ```
   
     
   
   - As of version 4.0.0 of webpack, a `webpack.config.js` file isn't needed. If you don't create a configuration file, these defaults will be used:
   
     - Entry:  ./src/index.js
     - Output:  ./dist/main.js
     

But, since we are adding the babel plug-in and other customizations, we need to create a configuration file. This is the default starting file from the webpack documentation:
```javascript
 const path = require('path');

 module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'going2boston.bundle.js',
   },
 };
```

### CSS bundling

Install these loaders:

```bash
npm install --save-dev style-loader css-loader
```

Configure the loaders:

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

Import the bundled css into index.js. Note that in this example styles.css is in the folder above index.js.

```javascript
import '../styles.css';
```



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



   

# Reference

[NPM documentation on packages and modules](https://docs.npmjs.com/packages-and-modules) 

- [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file)
- [Specifying dependencies and devDependencies in a package.json file](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

[Webpack documentation](https://webpack.js.org/concepts/)

- [Configuration](https://webpack.js.org/concepts/configuration/)
- [babel-loader](https://webpack.js.org/loaders/babel-loader/)
- [Development and the dev server](https://webpack.js.org/guides/development/)

[Babel documentation](https://babeljs.io/docs/)



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---