---
title: ES Modules
description: How to use ES Modules
keywords: Module
generator: Typora
author: Brian Bird
---

<h1>ES Modules</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Modules

Modules are just JavaScript files. You can break up your program into separate sections by putting each section in a different file and then using `export` and `mport` statements to connect them together.

 For example, you can export a function to make it available in other files like this:

```javascript
export default function validateRegistrationForm(formValues) {
  // function definition not shown 
} 
```

And import it like this

```javascript
import validateForm from './services/validateForm';
```

### Adding `export` and `import` statements to .js files

The simplest example is exporting and importing a single item, for example an object.

#### Exporting and Importing a single item

Code in a module with filename *gameLogic.js* exporting an object:

```javascript
export const gameLogic = {
   // Code in the literal object definition omitted
};
```

Code at the top of a module importing the object:

```javascript
import {gameLogic} from "./gameLogic.js";
```

#### Exporting and Importing multiple items

Code in a module with filename *ui.js* exporting a constant and an object:

```javascript
const NUMBER_OF_CARDS = 20;

const ui = {
  // Code in this object not shown
};

// The export statement is at the bottom of the file
export { ui, NUMBER_OF_CARDS };
```

Code at the top of a module importing the constant and object:

```javascript
import {ui, NUMBER_OF_CARDS} from "./ui.js";
```







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
