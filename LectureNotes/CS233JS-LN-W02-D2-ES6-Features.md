---
title: ES6
description: New ES 6 Features used in the lab assignment
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
| 3. More about Classes                                | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage | 9. Term Project                                     |
| 5. Midterm Review and Quiz                           | 10. Review                                          |
| 11. Final Quiz                                       |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Introduction

This week you are refactoring the three web apps from last week to use classes as well as some other "new" (as of 2015) features added in ES6 and some features that you didn't learn in CS 133JS. Some of these are discussed below.

## Arrow functions

The arrow function syntax is just another way of writing anonymous functions. They are mostly just "syntactic sugar":

```javascript
// A "normal" anonymous function used as an event handler
document.querySelector("button").addEventListener("click", 
  function () {
		 document.querySelector("span").textContent = "Button pressed!";
  } );

// The same function written as an arrow function:
document.querySelector("button").addEventListener("click", 
  () => { document.querySelector("span").textContent = "Button pressed!";} );

// The syntax can be simplified further by omitting the curly braces when there is only one statement in the function body.
document.querySelector("button").addEventListener("click", 
  () => document.querySelector("span").textContent = "Button pressed!");
```



The arrow function syntax can also be used to assign a function or method to an event. Here are examples from the concentration game:

```javascript
cards[i].onclick = () => this.handleClick(i);  // add an event handler method

card.onclick = () => { };  // remove an event handler
```

Good news! Arrow functions automatically bind `this` to the context in which they were defined (in this case, `this`, will be bound to the object where the code is executing), so there's no need to use `.bind(this)`.

Note: In other programming languages, *arrow functions* are called *lambda functions*[^1]. 

## Template literals

Another example from concentration

```javascript
card.style.backgroundImage = 'url(' + cardImage + ')';
// can be written as:
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

## Destructuring Assignment

Destructuring assignment in JavaScript is a feature that simplifies unpacking <u>values from arrays</u> or <u>properties from objects</u> and assigning them to variables. 

For destructuring arrays, the basic syntax is to put the variables that will get the unpacked values inside square brackets `[]`. Like this :`let [a, b] = ["dog", "cat"];` The value in the first element of the array, "dog", is assigned to `a` and the value in the second element, "cat", is assigned to `b`. 

Here is another example of using descructuring assignment with an array:

```javascript
const myArray = [1, 2, 3, 4, 5];
const [first, second] = myArray;
console.log(first); // 1
console.log(second); // 2
```

For destructuring objects, the basic syntax is to put the variables that will get the unpacked values inside curly braces, `{}`. Like this:`let [a, b] = ["dog", "cat"];` The value in the first element of the array, "dog", is assigned to `a` and the value in the second element, "cat", is assigned to `b`. 

Here's an example of destructuring assignment with an object:

```javascript
const myObject = { a: 1, b: 2 };
const { a, b } = myObject;
console.log(a); // 1
console.log(b); // 2
```

Note that when doing destructuring assignment, the variables that will be assigned values can be declared with const or let directly in the destructuring statement. They don't need to be declared in advance, but if they are already declared, they can still be used for destructuring assignment.

# Reference

[Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#arrow_functions) on MDN

[Template Literals (Template Strings)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) on MDN

[Array Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#constructor) on MDN

[Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) on MDN

------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------

[^1]: The term  *lambda function* comes from *lambda calculus* in mathematics. Lambda calculus is one of the theoretical foundation for the programming language paradigm called *functional programming*.  A primary aspect of functional programming is the use of *higher order functions* (functions that take functions as arguments and return other functions as results) which is a concept that comes from lambda calculus. 