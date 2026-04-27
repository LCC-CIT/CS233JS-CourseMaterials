---
title: Midterm Review
description: Review topics covered in the first half of the term.
keywords: html elements, es6, node.js, vite, modules
author: Brian Bird
---

<h1>Midterm Review</h1>

**CS233JS Intermediate Programming: JavaScript**

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



## Topics to Review

These are the major topics covered in the first four weeks. This list is not intended to be comprehensive of every detail that was covered, but to list the main topics.

### Review of Beginning JavaScript (Week 1)

These review topics were covered in the first week of the term.

#### Getting References to HTML Elements

These are the different ways to get a reference to an HTML element (or elements) using JavaScript:

| Method / Return value                                        | Example                                                      |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| **`getElementById`**<br />Single element                     | `let myElement = document.getElementById('id');`             |
| **`getElementsByClassName`**<br />HTMLCollection of elements | `let myElements = document.getElementsByClassName('cls');`   |
| **`getElementsByTagName`**<br />HTMLCollection of elements   | `let myElements = document.getElementsByTagName('div');`     |
| **`querySelector`**<br />First matching element              | `let myElement = document.querySelector('#id');`             |
| **`querySelectorAll`**<br />NodeList of elements             | `let myElements = document.querySelectorAll('.cssClassName');` |
| **`getElementsByName`**<br />NodeList of elements            | `let myElements = document.getElementsByName('name');`       |

#### Scope

Here’s a summary the different types of *scopes* in JavaScript, along with the structures they occur in, their characteristics and examples:

---

| **Scope Type**     | **Description**                                              | **Code Example**                                             |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Global Scope**   | Variables declared outside all functions or blocks. Accessible everywhere. | `const globalVar = "I'm global!"; `                          |
| **Function Scope** | Variables declared inside a function. <br />Accessible only within that function. | `function greet() { let message = "Hello";`<br />` console.log(message ); } ` |
| **Block Scope**    | Variables declared with `let`/`const` inside `{}` (e.g., `if`, `for`, `while`). | `if (a < b) { let diff = b - a;`<br />`console.log(diff); } ` |
| **Class Scope**    | Variables declared in a class body <br />(e.g., instance variables, methods, etc.). | `class MyClass { message = "Hello"; }`                       |
| **Lexical Scope**  | Scope determined by the placement of code (e.g., nested blocks). | `for(let i = 0; i < 10; i++) {` <br />  `if(i % 2 == 0) {`<br />     `console.log(i);`<br />  `}` <br />`}` |

**Best Practices**

- **Global scope**: Avoid overuse to keep code simple.
- **Variable declaration**: `var` is function-scoped, while `let`/`const` are block-scoped and preferred.



#### Event Listeners

Here's a summary of ways to assign *event listeners* to *events*:

| Method                 | Example                                  | Use Case                                |
| ---------------------- | ---------------------------------------- | --------------------------------------- |
| `addEventListener`     | `element.addEventListener('click', fn);` | Modern, flexible, multiple listeners    |
| Inline HTML Attributes | `<button onclick="fn()">`                | Quick prototyping (avoid in production) |
| DOM Event Properties   | `element.onclick = fn;`                  | Simple assignments (overwrites)         |

**Best Practices**

- Prefer `addEventListener` for better control and compatibility.
- Avoid inline HTML event attributes for maintainability and separation of concerns.

### New Topics (Weeks 2&ndash;4)

#### Git

- Git is a *distributed version control system* for tracking changes in files. It is used for collaboration and version control in software development.
- Git stores files in *repositories*. A *remote repositor*y (on GitHub for example) can be *cloned* into a *working directory* on a local computer to create a *local repository* which contains the current versions of files and contains a  `.git` folder where past versions are stored.
- **Creating a Repository from Scratch**: You can start a new project from scratch on GitHub and initialize it with a `README.md` (to describe the project) and a `.gitignore` (to tell Git which files to ignore).

Here’s a summary of some basic Git commands:

| **Command** | **Description**                                              | **Example/Usage**                                            |
| :---------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **Clone**   | Creates a copy of a remote repository on your local machine. | `git clone https://github.com/user/repo.git`                 |
| **Pull**    | Fetches changes from a remote repository and merges them into the local branch. | `git pull origin main`                                       |
| **Add**     | Stages changes for the next commit.                          | `git add file.txt` (stages a file) or `git add .` (stages all changes) |
| **Commit**  | Saves changes to the local repository with a message describing the changes. | `git commit -m "Add new feature"`                            |
| **Push**    | Uploads local commits to a remote repository.                | `git push origin main`                                       |
| **Status**  | Shows the current state of the working directory and staging area. | `git status` (lists untracked, modified, and staged files)   |

#### ES6 Modules

Modules allow you to split your JavaScript code into separate files, making it easier to maintain and reuse.

| **Concept** | **Description** | **Example** |
| ----------- | --------------- | ----------- |
| **Export** | Makes functions, objects, or primitive values available from a module so they can be used by other programs. | `export const PI = 3.14;`<br>`export function greet() { }` |
| **Import** | Used to bring in exported items from another module. | `import { PI, greet } from './math.js';` |
| **Default Export** | A module can have one default export, which can be imported without curly braces. | `export default class User { }`<br>`import User from './user.js';` |

#### ES6 JavaScript Features

This is a summary of some of the "new" JavaScript features added in ES6 (2015):

| **Feature** / Description                                    | **Example**                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Arrow Functions**<br />A concise syntax for writing anonymous functions. Automatically binds `this`. | `let button =`<br />   `document.querySelector("button");`<br />`button.addEventListener("click", () =>`<br />   `console.log("Clicked!")); ` |
| **Template Literals**<br />Use backticks (`` ` ``) for strings with embedded expressions (`${}`). | `card.style.backgroundImage = `url(${cardImage})`; `         |
| **Array Constructor**<br />Built-in constructor for creating arrays. Optional `new` keyword. | `const arr = Array(10).fill(null); `                         |
| **Destructuring Assignment**<br />Unpack values from arrays or objects into variables. | `const [first, second] = [1, 2];` <br />`const { a, b } = { a: 1, b: 2 };` |
| **Spread Operator**<br />Unpacks elements from an iterable (like an array or object) into a new context. | `const newArr = [...oldArr, 4];`<br />`const updatedObj = { ...oldObj, age: 30 };` |

#### Local Storage and JSON

| **Feature** / Description                                    | **Example**                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Local Storage**<br />A Web Storage API for storing data in the browser with no expiration. | `localStorage.setItem("key", "value"); localStorage.getItem("key"); ` |
| **JSON Object Literals**<br />A collection of key-value pairs, where keys are strings and values can be any type. | `let obj = { "name": "Jason", "age": 46 }; `                 |
| **`JSON.stringify()`**<br />Converts a JavaScript object or value into a JSON string. | `let jsonString = JSON.stringify(obj); `                     |
| **`JSON.parse()`**<br />Converts a JSON string into a JavaScript object. | `let obj = JSON.parse(jsonString); `                         |



#### Classes and Object Oriented Programming

Here’s a table summarizing the *Object-Oriented Programming* (OOP) concepts presented in class:

| **Concept**                          | **Description**                                              | **Example/Notes**                                            |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Classes and Objects**              | Classes are templates for creating objects. Objects are instances of a class. | `class Pigeon { constructor(name) { this.name = name; } } `  |
| **Purpose of Classes**               | - Reusability<br>- Group related methods/variables<br>- Simplify refactoring | Easier to manage and organize code.                          |
| **`this` Keyword**                   | Refers to different contexts:<br>- In a class: The object created.<br>- In an event handler: The HTML element.<br>- In a callback: The calling object. | `this.startButton.onclick = this.startTimer.bind(this); `    |
| **`bind` Method**                    | Used to explicitly set the context of `this` in a method.    | `this.startButton.onclick =`<br />`this.startTimer.bind(this); ` |
| **Encapsulation**                    | Restricting direct access to some of an object's components. Includes access control and getters/setters. | `#privateField = 0;`<br>`get myField() { return this.#privateField; }` |
| **Aggregation**                      | A "has a" relationship where a class contains instances of another class. | `class Loft { constructor() { this.pigeons = []; } } `       |
| **Composition**                      | A class contains objects of other classes (a "whole-part" relationship). | `class Board { constructor() { this.cards = [new Card(), new Card()]; } } ` |
| **Dependencies**                     | When one class relies on another. Keep dependencies minimal to avoid tight coupling. | Class A knows about Class B, but Class B should not know about Class A. |
| **Separation of Concerns**           | Divide code into distinct parts (e.g., I/O and processing).  | Card class: Handles card logic.<br>Board class: Manages cards.<br>Game class: Handles HTML interaction. |
| **Highly Cohesive, Loosely Coupled** | Classes should have a single responsibility and minimal dependencies. | Easier to test, debug, and update.                           |

#### JavaScript Development Tools (Node.js, etc.)

This table summarizes the JavaScript development tools covered in this class:

| **Tool**                       | **Description**                                              | **Key Features/Commands**                                    |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Node.js**                    | A runtime environment for running JavaScript outside the browser (e.g., server-side). | Cross-platform.<br>Enables JavaScript everywhere.<br>Includes NPM. |
| **NPM (Node Package Manager)** | The default package manager for Node.js. Manages project dependencies. | Install packages: `npm install`.<br>Save dev dependencies: `--save-dev`. |
| **package.json**               | A configuration file for Node.js projects. Contains dependencies and scripts. | devDependencies: Lists development tools.<br>scripts: Defines command-line macros. |
| **Vite**                       | A modern front-end build tool and development server. Uses native ES modules for fast startup and Hot Module Replacement (HMR). | Install: `npm install vite --save-dev`.<br>Build: `npm run build`. |
| **Vite Dev Server**            | A fast development server built into Vite. Automatically and instantly reflects changes in the browser. | Run: `npm run dev`. |
| **Source Maps**                | Companion files that map bundled/minified code back to your original source files. | Useful for debugging in the browser developer tools. |



Note: Parts of this document were drafted using DeepSeek R1 and revisions drafted using Gemini 3.1 pro.

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2025 and revised spring <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---