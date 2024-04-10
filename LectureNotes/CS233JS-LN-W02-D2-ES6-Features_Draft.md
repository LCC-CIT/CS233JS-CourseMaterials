---
title: Intro to Bootstrap
description: Quick intro to Bootstrap 
keywords: Bootstrap
generator: Typora
author: Brian Bird
---

<h1>New JS Features Used in Lab Apps</h1>

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

This week you are refactoring the three web apps from last week to use classes as well as some other "new" (as of 2015) features added in ES6 and some features that you didn't learn in CS 133JS. Some of these are discussed below.

## Arrow functions

Here are examples from the concentration game:

```javascript
cards[i].onclick = () => this.handleClick(i);  // add an event handler method

card.onclick = () => { };  // remove an event handler
```

Good news! Arrow functions automatically bind `this` to the context in which they were defined, so there's no need to use `.bind(this)`.

## Template literals

Another example from concentration

```javascript
card.style.backgroundImage = 'url(' + cardImage + ')';
// can be writteen as:
card.style.backgroundImage = `url(${cardImage})`;
```

An example from ttt:

```javascript
document.getElementById("status").innerHTML = "Next Player: " + player;
// can be written as:
document.getElementById("status").innerHTML = `Next Player: ${player}`;
```



## The Array Constructor

Last term we learned how to create objects as either *object literals* or by using an *object constructor*.

Remember these?

```javascript
// Object literal
const pigeon = {
	name: "Agatha",
  breed: "Egyptian Swift",
  speed: 50,
  fly: function(){
    return this.name + " is flying at " + this.speed + " MPH.";
  }
}
```

```javascript
// Object constructor
function Pigeon(name, breed, speed){
	this.name = name;
  this.breed = breed;
  this.speed = speed;
  this.fly = function(){
    return this.name + " is flying at " + this.speed + " MPH.";
  };
}

// Create a Pigeon object
const agatha = new Pigeon("Agatha", "Egyptian Swift", 50);
```

The `Array` object constructor is a built-in, prewritten, constructor that you can use to create arrays. It comes with a set of pre-defined methods that will be in any array you create with the `Array` constructor. Here is an example from the concentration game:

```javascript
const NUMBER_OF_CARDS = 20;
this.images = Array(NUMBER_OF_CARDS).fill(null);  
```

In the code above, the `new` keyword isn't needed since the `fill` method itself returns an array. The code above creates an array and initializes each element to null just as if we had done this:

```javascript
const NUMBER_OF_CARDS = 20;
this.images = [];
for (let i = 0; i < NUMBER_OF_CARDS; i++) {
images.push(null);
}
```

Note that the `new` operator is optional with the `Array` constructor (I don't know why!) Here are three ways to create an array that are equivalent:

```javascript
this.winningLine = new Array();
this.winningLine = Array();
this.winningLine = [];
```



# Reference

[Array Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#constructor) on MDN

------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------