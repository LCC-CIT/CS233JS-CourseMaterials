---
title: Intro to Bootstrap
description: Quick intro to Bootstrap 
keywords: Bootstrap
generator: Typora
author: Brian Bird
---

<h1>ES6 Classes</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                        |                                                     |
| ----------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review   | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                | 7. AJAX, ES6 promises, fetch API                    |
| 3. <mark>More about Classes</mark> **<== New topic!** | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage  | 9. Term Project                                     |
| 5. Midterm Review and Quiz                            | 10. Review                                          |
| 11. Final Quiz                                        |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Introduction

This week you are refactoring the three web apps from last week to use classes for object oriented programming reather than procedural programming.

# Object Oriented Programming

## Classes and Objects

### Why use classes?

- To make code easier to reuse.  

  For example, imagine you are making a dice game like [Bunco](https://en.wikipedia.org/wiki/Bunco). The game uses three dice and can have multiple players, so it makes sense to have separate classes for die and player&mdash;then we can make multiple die and player objects

- To group together methods and variables that are related to eachother so that code is easier to understand.  
  In our Bunco game, we could group methods and instace variables together in these classes:

  - Die

  - Player

  - Game&mdash;this class will contain the code for managing the game-play logic.

- To make refactoring easier by reducing dependencies.  

  One of the dependecies that can really complcate our code is the code related to web page i/o (input/output). We can move that code out of the Game class and either put it in a sparate, special i/o  class, or just have a separate file containing i/o functions.



## Encapsulation

#### Access

- Instance variables (fields) are public by default
- Use # to make them private

#### getters and setters





# Reference

- [Bootstrap 5 Tutorial](https://www.w3schools.com/bootstrap5/)&mdash; W3Schools
- [Official Bootstrap Website](https://getbootstrap.com/)



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------