---
title: Intro to Bootstrap
description: Quick intro to Bootstrap 
keywords: Bootstrap
generator: Typora
author: Brian Bird
---

<h1>ES6 Classes</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                       |                                                     |
| ---------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review  | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. <mark>ES6 Classes and Git</mark>                  | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes **<== New topic!**             | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage | 9. Term Project                                     |
| 5. Midterm Review and Quiz                           | 10. Review                                          |
| 11. Final Quiz                                       |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Introduction

This week you are refactoring the three web apps from last week to use classes for object oriented programming reather than procedural programming.

# Object Oriented Programming

## Classes and Objects

### Why use classes?

- To make code easier to reuse.
- To group together methods and variables that are related to eachother so that code is easier to understand.
- To make refactoring easier by reducing dependencies.

### How are classes and objects related?

- A class is like a template or a cookie cutter it is used to make objects.
- Objects (also called instances of a class) are what get executed. Many objects can be made from one class.  
  Exception: next week you will learn about static methods and variables which can be used directly in a class wihtout making an object.

### What does `this` refer to?

JavaScript has something called a *lexical this*. It's pretty diffeent from most other programming languages. The `this` keyword means different things in different contexts:

- In class, it will refer to the object that is created by the class. The significance of it relating to the object and not the class is that there can be many objects made from a class.
- In a method (or function) that is an event handler, it refers to the HTML element that generated the event. For example a `<div>` or a `<button>` 
- In a method (or function) that is used a callback, it refers to the object that called it. For example, in the stopwatch app, you pass a callback function, `incrementTimer`,  to the `setInterval` function. Inside `incrementTimer`, `this` refers to the browser's window object since `setInterval` is a global function.

### When do you need to use `bind`?

If you want a method's `this` to refrence a different object than the default one, you can use bind to change the object that `this` will refer to inside that method. For example, in the stopwatch app, `startButton` is called by a button's  onclick event. By default, inside `startButton`, `this` will refer to the button, but by using `bind` we can force `this` to refer to an object of the stopwatch class.

``` javascript
this.startButton.onclick = this.startTimer.bind(this);
```



# Reference

- [Bootstrap 5 Tutorial](https://www.w3schools.com/bootstrap5/)&mdash; W3Schools
- [Official Bootstrap Website](https://getbootstrap.com/)



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------