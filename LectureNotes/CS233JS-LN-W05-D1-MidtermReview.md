---
title: Midterm Review
description: Review topics covered in the first half of the term.
keywords: html elements, es6, bootstrap, node.js, webpack, babel
author: Brian Bird
---

<h1>Midtarm Review</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                        |                                                     |
| ----------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review   | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                 | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. | 9. Term Project                                     |
| 5.  <mark>Review and Midterm Quiz</mark>              | 10. Review                                          |
| 11. Final Quiz                                        |                                                     |



<h2>Table of Contents</h2>

[TOC]

## Introduction

The topics listed in this review are the ones that will be covered by the midterm quiz. This review page doesn't cover every detail that might be on the midterm quiz, but is intended to be a starting place for your review. In addition to this page, study:

- The lecture notes
- Reading quizzes
- Programming examples

### Tips for Reviewng

- Focus on understanding concepts and being able to apply them rather than memorizing answers.
- Ask yourself questions (or have a friend quiz you) rather than reading and re-reading course material.
- Write code snippets and run them in the console to solidify your understanding.



## Review of Beginning JavaScript

These review topics were covered in the first week of the term.

### Getting References to HTML Elements

These are the different ways to get a reference to an HTML element (or elements) using JavaScript:

| Method                   | Returns                      | Example                                  |
| :----------------------- | :--------------------------- | :--------------------------------------- |
| `getElementById`         | Single element               | `document.getElementById('id')`          |
| `getElementsByClassName` | `HTMLCollection` of elements | `document.getElementsByClassName('cls')` |
| `getElementsByTagName`   | `HTMLCollection` of elements | `document.getElementsByTagName('div')`   |
| `querySelector`          | First matching element       | `document.querySelector('#id')`          |
| `querySelectorAll`       | `NodeList` of elements       | `document.querySelectorAll('.cls')`      |
| `getElementsByName`      | `NodeList` of elements       | `document.getElementsByName('name')`     |
| Document Properties      | Varies (element/collection)  | `document.body`, `document.forms`        |

### Scope

Here’s a summary the different types of **scopes** in JavaScript, along with the structures they occur in, their characteristics and examples:

---

| **Scope Type**     | **Description**                                              | **Example**                                                  |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Global Scope**   | Variables declared outside all functions/blocks. Accessible everywhere. | ```javascript const globalVar = "I'm global!"; ```           |
| **Function Scope** | Variables declared inside a function. Accessible only within that function. | ```javascript function greet() { let message = "Hello"; } ``` |
| **Block Scope**    | Variables declared with `let`/`const` inside `{}` (e.g., `if`, `for`, `while`). | ```javascript if (true) { let blockVar = "I'm block-scoped!"; } ``` |
| **Class Scope**    | Variables declared in a class body (e.g., class name, static members). | ```javascript class MyClass { static message = "Hello"; } ``` |
| **Lexical Scope**  | Scope determined by the physical placement of code (e.g., nested functions). | ```javascript function outer() { let x = 10; function inner() { console.log(x); } } ``` |

**Best Practices**

- **Global scope**: Avoid overuse to keep code simple.
- **Variable declaration**: `var` is function-scoped, while `let`/`const` are block-scoped and preferred.



### Event Listeners

Here's a summary of ways to assign event listeners to events in JavaScript:

| Method                 | Example                                 | Use Case                                 |
| ---------------------- | --------------------------------------- | ---------------------------------------- |
| `addEventListener`     | `element.addEventListener('click', fn)` | Modern, flexible, multiple listeners     |
| Inline HTML Attributes | `<button onclick="fn()">`               | Quick prototyping (avoid in production)  |
| DOM Event Properties   | `element.onclick = fn`                  | Simple assignments (overwrites)          |
| Event Delegation       | Parent element listener + target check  | Dynamic/efficient child element handling |
| One-Time Listeners     | `{ once: true }`                        | Single-execution events                  |
| Legacy `attachEvent`   | `element.attachEvent('onclick', fn)`    | IE8 compatibility (deprecated)           |
| Passive Events         | `{ passive: true }`                     | Optimize scroll/touch events             |

**Best Practices**

- Prefer `addEventListener` for better control and compatibility.
- Avoid inline HTML event attributes for maintainability and separation of concerns.

## Bootstrap

This is a summary of the main Bootstrap concepts and features described in class:

| **Feature**               | **Description**                                              |
| ------------------------- | ------------------------------------------------------------ |
| **Responsive Design**     | The web page adapts to the screen size, platform, and orientation of the user's browser. |
| **Mobile-First Approach** | Designing a website starting with the mobile version, which is then adapted to larger screens. |
| **Adding Bootstrap**      | - Include a link to Bootstrap CSS and JavaScript in the `<head>` element.<br>- Add a responsive viewport meta tag for proper rendering and touch zooming on all devices. |
| **Viewport Meta Tag**     | - `name="viewport"`: Specifies the viewport properties.<br>- `content="width=device-width, initial-scale=1"`: Matches the device's width and sets the initial zoom level to 1. |
| **Container Classes**     | - `.container`: Provides a responsive fixed-width container.<br>- `.container-fluid`: Provides a full-width container that adapts to the viewport width. |
| **CSS Classes**           | Bootstrap provides a large number of CSS classes for styling and layout. Elements are styled by adding these classes to HTML elements. |
| **Example Styling**       | - `.h1`: Applies heading 1 styling.<br>- `.text-center`: Centers the text.<br>- `.bg-light`: Adds a light background.<br>- `.rounded`: Adds rounded corners to the element. |
| **Usage Example**         | ```html <div class="container-fluid"> <!-- HTML code goes here --> </div> ```<br>```html <div class="h1 text-center bg-light rounded"> <!-- Styled content --> </div> ``` |

## ES6 JavaScript Features

This is a summary of some of the "new" JavaScript features added in ES6:

| **Feature**                      | **Description**                                              | **Example**                                                  |
| -------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| **Arrow Functions**              | A concise syntax for writing anonymous functions. Automatically binds `this`. | ```javascript document.querySelector("button").addEventListener("click", () => console.log("Clicked!")); ``` |
| **Template Literals**            | Use backticks (`` ` ``) for strings with embedded expressions (`${}`). | ```javascript card.style.backgroundImage = `url(${cardImage})`; ``` |
| **Array Constructor**            | Built-in constructor for creating arrays. Optional `new` keyword. | ```javascript const arr = Array(10).fill(null); ```          |
| **Destructuring Assignment**     | Unpack values from arrays or objects into variables.         | ```javascript const [first, second] = [1, 2]; const { a, b } = { a: 1, b: 2 }; `` |
| **Local Storage**                | A Web Storage API for storing data in the browser with no expiration. | ```javascript localStorage.setItem("key", "value"); localStorage.getItem("key"); ``` |
| **Array `reduce`**               | Reduces an array to a single value by applying a callback function. | ```javascript let sum = numbers.reduce((acc, val) => acc + val, 0); ``` |
| **Array `forEach`**              | Executes a callback function once for each array element.    | ```javascript array.forEach(value => console.log(value * 10)); ``` |
| **HTML Form Validation Styling** | Dynamically add/remove CSS classes for form validation.      | ```javascript textBox.classList.add('is-invalid'); textBox.classList.remove('is-invalid'); ``` |
| **JSON Object Literals**         | A collection of key-value pairs, where keys are strings and values can be any type. | ```javascript let obj = { "name": "Jason", "age": 46 }; ```  |
| **`JSON.stringify()`**           | Converts a JavaScript object or value into a JSON string.    | ```javascript let jsonString = JSON.stringify(obj); ```      |
| **`JSON.parse()`**               | Converts a JSON string into a JavaScript object.             | ```javascript let obj = JSON.parse(jsonString); ```          |



## Classes and Object Oriented Programming

Here’s a table summarizing the **Object-Oriented Programming (OOP) concepts** in JavaScript as described in the markdown text:

| **Concept**                          | **Description**                                              | **Example/Notes**                                            |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Classes and Objects**              | Classes are templates for creating objects. Objects are instances of a class. | ```javascript class Pigeon { constructor(name) { this.name = name; } } ``` |
| **Purpose of Classes**               | - Reusability<br>- Group related methods/variables<br>- Simplify refactoring | Easier to manage and organize code.                          |
| **`this` Keyword**                   | Refers to different contexts:<br>- In a class: The object created.<br>- In an event handler: The HTML element.<br>- In a callback: The calling object. | ```javascript this.startButton.onclick = this.startTimer.bind(this); ``` |
| **`bind` Method**                    | Used to explicitly set the context of `this` in a method.    | ```javascript this.startButton.onclick = this.startTimer.bind(this); ``` |
| **Composition**                      | A class contains objects of other classes.                   | ```javascript class Board { constructor() { this.cards = [new Card(), new Card()]; } } ``` |
| **Separation of Concerns**           | Divide code into distinct parts (e.g., I/O and processing).  | - Card class: Handles card logic.<br>- Board class: Manages cards.<br>- Game class: Handles HTML interaction. |
| **Highly Cohesive, Loosely Coupled** | Classes should have a single responsibility and minimal dependencies. | Easier to test, debug, and update.                           |
| **Static Methods/Variables**         | Belong to the class itself, not instances.                   | ```javascript class MathUtils { static PI = 3.14; } ```      |

## JavaScript Development Tools (Node.js, etc.)

This table summarizes the JavaScript development tools covered in this class:

| **Tool**                       | **Description**                                              | **Key Features/Commands**                                    |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Node.js**                    | A runtime environment for running JavaScript outside the browser (e.g., server-side). | - Cross-platform.<br>- Enables JavaScript everywhere.<br>- Includes NPM. |
| **NPM (Node Package Manager)** | The default package manager for Node.js. Manages project dependencies. | - Install packages: `npm install`.<br>- Save dev dependencies: `--save-dev`. |
| **package.json**               | A configuration file for Node.js projects. Contains dependencies and scripts. | - **devDependencies**: Lists development tools.<br>- **scripts**: Defines command-line macros. |
| **Babel**                      | A JavaScript compiler that transpiles modern JavaScript (ES6+) to older versions. | - Ensures compatibility with older browsers.<br>- Requires Node.js to run. |
| **Webpack**                    | A static module bundler for JavaScript applications. Combines dependencies into bundles. | - Bundles JS, CSS, images, etc.<br>- Install: `npm install webpack webpack-cli --save-dev`. |
| **Webpack Dev Server**         | A lightweight development server included with Webpack. Automatically reloads changes. | - Watches and transpiles code.<br>- Run: `npm run watch`.    |



Note: Parts of this documnet were drafted using generative AI (DeepSeek R1)

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---