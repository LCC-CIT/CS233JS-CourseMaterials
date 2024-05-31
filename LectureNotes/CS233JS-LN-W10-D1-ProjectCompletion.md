---
title: Project Completion
description: TBD
keywords: TBD
generator: Typora
author: Brian Bird
---

<h1>Working with Web APIs</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. Intro to Course, Bootstrap and JavaScript Review, lab 1   | 6. HTML5 Canvas, CSS Flexbox, lab 4                          |
| 2. ES6 Classes and Git, lab 2                                | 7.AJAX, ES6 promises, fetch API, lab 5                       |
| 3. More about Classes                                        | 8.  <mark>Making API calls, graphs and charts, Google maps, lab 6</mark> |
| 4. More time to finish the dice games, lab 2b (XC)           | 9. Term Project                                              |
| 5. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. lab 3, Midterm Quiz | 10. Project Completion<br />and Review                       |
| 11. Final Quiz                                               |                                                              |

<h2>Table of Contents</h2>

[TOC]



# Setting up Dev Tools

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

3. Install Babel  
   Use this command to install babel and add it to the `devDependencies` in package.json: 

   ````bash
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   npm install webpack-cli --save-prod
   ````

   

4. Install webpack

   - Install webpack and webpack CLI in your project's folder and simultaneously add it to the list of dependencies in package.json using these commands: 
     ```bash
     npm install webpack --save-prod
     npm install webpack-cli --save-prod
     ```

     

   - As of version 4.0.0 of webpack, a `webpack.config.js` file isn't needed. If you don't create a configuration file, these defaults will be used:

     - Entry:  ./src/index.js
     - Output:  ./dist/main.js

     But, since we are adding the babel plug-in we need to create a configuration file. This is the default starting file from the webpack documentation:

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

   - Add the babel-loader module to the webpack.config.js file:

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

     Webpack should run wihtout errors and create a dist folder with a .bundle.js file in it.

   ## 

   

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

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 