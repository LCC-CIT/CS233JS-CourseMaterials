---
title: ES Modules
description: New ES Modules
keywords: Module
generator: Typora
author: Brian Bird
---

<h1>ES Modules</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Modules

 You can use ES6 module (import and export) syntax to make a function available in other js files.

```javascript
export default function validateRegistrationForm(formValues) { … } 
```

This code is in src/home.js:

```javascript
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';
```

### Adding `export` and `import` statements to .js files

Add ESM (ES Module) `export` statements to all the class declarations and to the constant declaration in `game.js`  
Example:  

```javascript
export const NUMBER_OF_DIE = 3;

export class Game { ...
```

Add ESM `impor` statements to `game.js`

```javascript
import { Player } from './player.js';
import { Die } from './die.js';
```

Add to `index.js`:

```javascript
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Game } from './game.js';
import { NUMBER_OF_DIE } from './game.js';
```

(In this example we assume `styles.css` is in the parent folder of the one containing `index.js`.)

#### What Does `import` do?

In week 8, you will learn more about JavaScript ES modules[^1] and how to import and export them. For now, the important thing to know is that the ES `import` keyword brings in code or functionality from other modules. ES modules are usually a single JavaScript file, but it could also be a set of JavaScript files. 

In the example above:

-  A .css file is being imported instead of a .js file. This is only possible because we are using webpack and added a CSS loader plugin to it.
-  The `Game` class and the constant `NUMBER_OF_DIE` are being imported from the `game.js` file. The name inside the curly braces is the name of the thing to import.

## Reference

[JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)&mdash;MDN



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---
