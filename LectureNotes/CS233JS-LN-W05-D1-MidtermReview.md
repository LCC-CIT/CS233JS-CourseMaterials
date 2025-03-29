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
- Programming examples
- Tutorials
- Reading quizzes

### Tips for Reviewng

- Focus on understanding concepts and being able to apply them rather than memorizing answers.
- Ask yourself questions (or have a friend quiz you) rather than reading and re-reading course material.
- Write code snippets and run them in the console to solidify your understanding.



## Review of Beginning JavaScript

These review topics were covered in the first week of the term.

### Getting References to HTML Elements

These are the different ways to get a reference to an HTML element (or elements) using JavaScript:

| Method / Return value                                        | Example                                                   |
| :----------------------------------------------------------- | :-------------------------------------------------------- |
| **`getElementById`**<br />Single element                     | `let myElement = document.getElementById('id')`           |
| **`getElementsByClassName`**<br />HTMLCollection of elements | `let myElements = document.getElementsByClassName('cls')` |
| **`getElementsByTagName`**<br />HTMLCollection of elements   | `let myElements = document.getElementsByTagName('div')`   |
| **`querySelector`**<br />First matching element              | `let myElement = document.querySelector('#id')`           |
| **`querySelectorAll`**<br />NodeList of elements             | `let myElements = document.querySelectorAll('.cls')`      |
| **`getElementsByName`**<br />NodeList of elements            | `let myElements = document.getElementsByName('name')`     |

### Scope

Here’s a summary the different types of *scopes* in JavaScript, along with the structures they occur in, their characteristics and examples:

---

| **Scope Type**     | **Description**                                              | **Example**                                                  |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Global Scope**   | Variables declared outside all functions/blocks. Accessible everywhere. | `const globalVar = "I'm global!"; `                          |
| **Function Scope** | Variables declared inside a function. Accessible only within that function. | `function greet() { let message = "Hello"; } `               |
| **Block Scope**    | Variables declared with `let`/`const` inside `{}` (e.g., `if`, `for`, `while`). | `if (true) { let blockVar = "I'm block-scoped!"; } `         |
| **Class Scope**    | Variables declared in a class body (e.g., class name, static members). | `class MyClass { static message = "Hello"; }`                |
| **Lexical Scope**  | Scope determined by the physical placement of code (e.g., nested functions). | `function outer() { let x = 10; function inner() { console.log(x); } } ` |

**Best Practices**

- **Global scope**: Avoid overuse to keep code simple.
- **Variable declaration**: `var` is function-scoped, while `let`/`const` are block-scoped and preferred.



### Event Listeners

Here's a summary of ways to assign *event listeners* to *events*:

| Method                 | Example                                 | Use Case                                |
| ---------------------- | --------------------------------------- | --------------------------------------- |
| `addEventListener`     | `element.addEventListener('click', fn)` | Modern, flexible, multiple listeners    |
| Inline HTML Attributes | `<button onclick="fn()">`               | Quick prototyping (avoid in production) |
| DOM Event Properties   | `element.onclick = fn`                  | Simple assignments (overwrites)         |

**Best Practices**

- Prefer `addEventListener` for better control and compatibility.
- Avoid inline HTML event attributes for maintainability and separation of concerns.

## Bootstrap

This is a summary of the main Bootstrap concepts and features described in class:

| **Feature**               | **Description**                                              |
| ------------------------- | ------------------------------------------------------------ |
| **Responsive Design**     | The web page adapts to the screen size, platform, and orientation of the user's browser. |
| **Mobile-First Approach** | Designing a website starting with the mobile version, which is then adapted to larger screens. |
| **Adding Bootstrap**      | Include a link to Bootstrap CSS and JavaScript in the `<head>` element.<br>Add a responsive viewport meta tag for proper rendering and touch zooming on all devices. |
| **Viewport Meta Tag**     | `name="viewport"`: Specifies the viewport properties.<br> `content="width=device-width, initial-scale=1"`: Matches the device's width and sets the initial zoom level to 1. |
| **Container Classes**     | `.container`: Provides a responsive fixed-width container.<br>`.container-fluid`: Provides a full-width container that adapts to the viewport width. |
| **CSS Classes**           | Bootstrap provides a large number of CSS classes for styling and layout. Elements are styled by adding these classes to HTML elements. |
| **Example Styling**       | `.h1`: Applies heading 1 styling.<br>`.text-center`: Centers the text.<br>`.bg-light`: Adds a light background.<br>`.rounded`: Adds rounded corners to the element. |
| **Usage Example**         | ```html <div class="container-fluid"> <!-- HTML code goes here --> </div> ```<br>```html <div class="h1 text-center bg-light rounded"> <!-- Styled content --> </div> ``` |

## Git

- Git is a *distributed version control system* for tracking changes in files. It is used for collaboration and version control in software development.
- Git stores files in *repositories*. A *remote repositor*y (on GitHub for example) can be *cloned* into a *working directory* on a local computer to create a *local repository* which contains the current versions of files and contains a  `.git` folder where past versions are stored.

Here’s a summary of some basic Git commands:

| **Command** | **Description**                                              | **Example/Usage**                                            |
| :---------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **Clone**   | Creates a copy of a remote repository on your local machine. | `git clone https://github.com/user/repo.git`                 |
| **Pull**    | Fetches changes from a remote repository and merges them into the local branch. | `git pull origin main`                                       |
| **Add**     | Stages changes for the next commit.                          | `git add file.txt` (stages a file) or `git add .` (stages all changes) |
| **Commit**  | Saves changes to the local repository with a message describing the changes. | `git commit -m "Add new feature"`                            |
| **Push**    | Uploads local commits to a remote repository.                | `git push origin main`                                       |
| **Status**  | Shows the current state of the working directory and staging area. | `git status` (lists untracked, modified, and staged files)   |

### 

## ES6 JavaScript Features

This is a summary of some of the "new" JavaScript features added in ES6:

| **Feature** / Description                                    | **Example**                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Arrow Functions**<br />A concise syntax for writing anonymous functions. Automatically binds `this`. | `let button =`<br />   `document.querySelector("button");`<br />`button.addEventListener("click", () =>`<br />   `console.log("Clicked!")); ` |
| **Template Literals**<br />Use backticks (`` ` ``) for strings with embedded expressions (`${}`). | `card.style.backgroundImage = `url(${cardImage})`; `         |
| **Array Constructor**<br />Built-in constructor for creating arrays. Optional `new` keyword. | `const arr = Array(10).fill(null); `                         |
| **Destructuring Assignment**<br />Unpack values from arrays or objects into variables. | `const [first, second] = [1, 2];` <br />`const { a, b } = { a: 1, b: 2 };` |
| **Local Storage**<br />A Web Storage API for storing data in the browser with no expiration. | `localStorage.setItem("key", "value"); localStorage.getItem("key"); ` |
| **Array `reduce`**<br />Reduces an array to a single value by applying a callback function. | `let sum = numbers.reduce((acc, val) => acc + val, 0); `     |
| **Array `forEach`**<br />Executes a callback function once for each array element. | `array.forEach(value => console.log(value * 10)); `          |
| **HTML Form Validation Styling**<br />Dynamically add/remove CSS classes for form validation. | `textBox.classList.add('is-invalid'); textBox.classList.remove('is-invalid'); ` |
| **JSON Object Literals**<br />A collection of key-value pairs, where keys are strings and values can be any type. | `let obj = { "name": "Jason", "age": 46 }; `                 |
| **`JSON.stringify()`**<br />Converts a JavaScript object or value into a JSON string. | `let jsonString = JSON.stringify(obj); `                     |
| **`JSON.parse()`**<br />Converts a JSON string into a JavaScript object. | `let obj = JSON.parse(jsonString); `                         |



## Classes and Object Oriented Programming

Here’s a table summarizing the *Object-Oriented Programming* (OOP) concepts presented in class:

| **Concept**                          | **Description**                                              | **Example/Notes**                                            |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Classes and Objects**              | Classes are templates for creating objects. Objects are instances of a class. | `class Pigeon { constructor(name) { this.name = name; } } `  |
| **Purpose of Classes**               | - Reusability<br>- Group related methods/variables<br>- Simplify refactoring | Easier to manage and organize code.                          |
| **`this` Keyword**                   | Refers to different contexts:<br>- In a class: The object created.<br>- In an event handler: The HTML element.<br>- In a callback: The calling object. | `this.startButton.onclick = this.startTimer.bind(this); `    |
| **`bind` Method**                    | Used to explicitly set the context of `this` in a method.    | `this.startButton.onclick =`<br />`this.startTimer.bind(this); ` |
| **Composition**                      | A class contains objects of other classes.                   | `class Board { constructor() { this.cards = [new Card(), new Card()]; } } ` |
| **Separation of Concerns**           | Divide code into distinct parts (e.g., I/O and processing).  | Card class: Handles card logic.<br>Board class: Manages cards.<br>Game class: Handles HTML interaction. |
| **Highly Cohesive, Loosely Coupled** | Classes should have a single responsibility and minimal dependencies. | Easier to test, debug, and update.                           |
| **Static Methods/Variables**         | Belong to the class itself, not instances.                   | `class MathUtils { static PI = 3.14; } `                     |

## JavaScript Development Tools (Node.js, etc.)

This table summarizes the JavaScript development tools covered in this class:

| **Tool**                       | **Description**                                              | **Key Features/Commands**                                    |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Node.js**                    | A runtime environment for running JavaScript outside the browser (e.g., server-side). | Cross-platform.<br>Enables JavaScript everywhere.<br>Includes NPM. |
| **NPM (Node Package Manager)** | The default package manager for Node.js. Manages project dependencies. | Install packages: `npm install`.<br>Save dev dependencies: `--save-dev`. |
| **package.json**               | A configuration file for Node.js projects. Contains dependencies and scripts. | devDependencies: Lists development tools.<br>scripts: Defines command-line macros. |
| **Babel**                      | A JavaScript compiler that transpiles modern JavaScript (ES6+) to older versions. | Ensures compatibility with older browsers.<br>Requires Node.js to run. |
| **Webpack**                    | A static module bundler for JavaScript applications. Combines dependencies into bundles. | Bundles JS, CSS, images, etc.<br>Install: `npm install webpack webpack-cli --save-dev`. |
| **Webpack Dev Server**         | A lightweight development server included with Webpack. Automatically reloads changes. | Watches and transpiles code.<br>Run: `npm run watch`.        |



Note: Parts of this documnet were drafted using generative AI (DeepSeek R1)

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---