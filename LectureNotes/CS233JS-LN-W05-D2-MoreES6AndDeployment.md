---
title: Dev Tools 2
description: More about ES6 features, dev tools and deployment.
keywords: Node, NPM, Babel, Webpack
generator: Typora
author: Brian Bird
---

<h1>More about ES6, Dev Tools and Deployment</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                     |
| ------------------------------------------------------------ | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review          | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                       | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                        | 8. Making API calls, graphs and charts, Google maps |
| 4. More time to finish the dice games                        | 9. Term Project                                     |
| 5. <mark>JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. Midterm Quiz</mark> | 10. Review                                          |
| 11. Final Quiz                                               |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Introduction

**Spring 2024**

## Announcements

- Midterm opens on Thursday, closes on Sunday.

- College closed this Friday.

## Reminders

- Wednesday (today): 
  Reading quiz 3 closes
- Thursday: 
  - Lab 2B production version due.
  - The midterm quiz opens.
- Friday: 
  Lab 3 beta version&mdash;share it with your lab partner via GitHub and the Beta Forum.  
  Note: use the repository you got through GitHub Classroom, don't make a different repository.
- Sunday:  
  Midterm quiz closses.



# Introduction

**Spring 2024**

## Announcements

- Midterm opens on Thursday, closes on Sunday.

- College closed this Friday.

## Reminders

- Wednesday (today): 
  Reading quiz 3 closes
- Thursday: 
  - Lab 2B production version due.
  - The midterm quiz opens.
- Friday: 
  Lab 3 beta version&mdash;share it with your lab partner via GitHub and the Beta Forum.  
  Note: use the repository you got through GitHub Classroom, don't make a different repository.
- Sunday:  
  Midterm quiz closses.



# New ES6 Syntax/Features

These are "new" ES6 features that Mari introduced you to and that you are using in this week's lab assignment[^1]. 

### Template Strings (template literals)

Template strings allow you to create strings with embedded expressions, which are evaluated and then concatenated into the resulting string. It uses backticks (``) instead of single or double quotes.

Example:

```javascript
let name = "Jordan";
let greeting = `Hello, ${name}!`; // "Hello, Jordan!"
```

In the ToDoList app, the `generateTaskHTML` function uses this.

### Local Storage

An HTML5 feature that allows data storage in a user’s browser with no expiration. It’s part of the Web Storage API and unlike cookies, it isn’t sent to the server and can hold up to 5MB of data per domain. The data persists even after the browser window is closed.

- localStorage["key"]
- localStorage.getItem("key")
- localStorage.setItem("key", "value")
- delete localStorage["key"]

```javascript
// Store data with the key "userName"
localStorage["userName"] = "Juan Gonzalez";

// Retrieve data, expected output: "Juan Gonzalez"
console.log(localStorage["userName"]);

// Change data
localStorage["userName"] = "Olivia Medina";

// Another way to retrieve data, expected output: "Oliva Medina"
console.log(localStorage.getItem("userName"));

// Another way to set or change data
localStorage.setItem()"userName", "Jules Torres";

// Expected output: "Jules Torres"
console.log(localStorage.getItem("userName"));

// Remove data
delete localStorage["userName"];

// Expected output: undefined
console.log(localStorage["userName"]);
```

Local storage is used in the ToDoList app tasks are stored in local storage in `loadTasks` and retrieved in the `constructor`, 

## Arrays

- Array.reduce()
  This method is used to apply a function to each element in an array to reduce the array to a single value. The function it applies is a  callback function which is executed the for each value in the array starting at index 0. Here's an example:

  ```javascript
  let numbers = [1, 2, 3, 4, 5];
  
  // The annonymous function is a callback function that sums values
  let sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  
  // Expected output: 15
  console.log(sum);
  ```

  The `Array.reduce()` method in JavaScript is used to apply a function to each element in an array to reduce the array to a single value. It executes the callback function for each value of the array from left-to-right.

  Here's an example that calculates the sum of numbers in an array:

  ```javascript
  let numbers = [1, 2, 3, 4, 5];
  
  let sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  
  // Expected output: 15, the sum of numbers in the array
  console.log(sum);
  ```

  The variable `accumulator` is the accumulated total previously returned in the last invocation of the callback function, or on the first invocation, the initial value. The `currentValue` is the current element being processed in the array. The `0` after the callback function is the initial value set for the accumulator. 

- Array.push()

### HTML form validation

- classList.add()
- classList.remove()
- is-invalid Bootstrap style

### JSON

- JSON Object Literals
- JSON.parse()
- JSON.stringify()



# Reference

- [Node.js official site](https://nodejs.org/en)

- [Babel official site](https://babeljs.io/)

- [Webpack official site](https://webpack.js.org/)

- [ECMAScript Version History](https://en.wikipedia.org/wiki/ECMAScript_version_history)

- [ECMAScript Browser Compatibility Table](https://compat-table.github.io/compat-table/es6/). 

  

[^1]: The name “Node” refers to its capability to create large distributed software systems, where each part of the system runs on a different server. Each server can be considered a “node” in a network

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 