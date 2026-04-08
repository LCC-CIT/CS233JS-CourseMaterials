---
title: ES Modules
description: How to use ES Modules
keywords: Module, import, export, ESM, default export
generator: Typora
author: Brian Bird
---

<h1>ES Modules</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Modules

A Module is just JavaScript file that has one or more `export` statements in it. You can break your program up into separate sections by putting each section in a different file and then use `export` to share items (functions, objects, arrays, etc.) from a module and `mport` statements to pull those items into another file.

 For example, you can export a function to make it available in other files like this:

```javascript
// This file's path and file name: ./services/validateForm.js
export function validateRegistrationForm(formValues) {
  // function definition not shown 
} 
```

And import it like this:

```javascript
import validateForm from './services/validateForm.js';
```



*Remember: Putting an export statement in a JavaScript file turns it into a module.*



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

#### Renaming an Import

If you are importing an item that might cause a name conflict, you can rename it like this:

```javascript
import { gameLogic as gameStateAndRules } from "./gameLogic.js";
// Then use the renamed object like this:
gameStateAndRules.someMethod();
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

#### Importing a whole module

Instead of importing individual items form a module, the whole module can be imported like this:

```javascript
import * as Module from "./gmaeLogic.js";
// Then use it like this:
Module.gameLogic.someMethod();
```

#### Specifying a Default Export

We could make the `gameLogic` object the default export from *gameLogic.js* by removing `export` from the object definition and putting this line at the bottom of the file:

```javascript
export default gameLogic;
```

In a file that imports this, the code at the top of the file would look like this:

```javascript
import gameLogic from "./gameLogic.js"
```



## Reference

[JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)&mdash;MDN



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---
