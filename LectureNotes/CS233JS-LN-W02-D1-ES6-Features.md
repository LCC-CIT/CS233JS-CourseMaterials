---

title: ES6
description: Key ES 6 Features 
keywords: ES6
generator: Typora
author: Brian Bird
---

<h1>New JS Features Used in Lab Apps</h1>

**CS233JS Intermediate Programming: JavaScript

<h2>Table of Contents</h2>

[TOC]

## Introduction

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

Template strings allow you to create strings with embedded expressions, which are evaluated and then concatenated into the resulting string. It uses backticks (``) instead of single or double quotes.

Example:

```javascript
let name = "Jordan";
let greeting = `Hello, ${name}!`; // "Hello, Jordan!"
```

Another example from concentration

```javascript
card.style.backgroundImage = 'url(' + cardImage + ')';
// can be written as:
card.style.backgroundImage = `url(${cardImage})`;
```

Another example:

```javascript
document.getElementById("status").innerHTML = "Next Player: " + player;
// can be written as:
document.getElementById("status").innerHTML = `Next Player: ${player}`;
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

## The Spread Operator `...`

The spread operator is "syntactic sugar"  used to "unpack" or "expand" elements from an iterable (like an array or an object) into a new context. 

### Spreading Arrays

The spread operator allows you to combine multiple arrays or add new elements to an array

**Example: Merging Playlists**

```javascript
const chillVibes = ['Lo-fi', 'Jazz'];
const workoutHits = ['Rock', 'Techno'];

// Unpacking both arrays into a new "super" array
const dailyMix = [...chillVibes, 'Classical', ...workoutHits];

console.log(dailyMix); 
// Output: ['Lo-fi', 'Jazz', 'Classical', 'Rock', 'Techno']
```

------

### Spreading Objects

Object spreading is the industry standard for state management (common in frameworks like React). It allows you to create a *shallow copy* of an object while updating specific properties.

**Example: Updating User Profiles**

```javascript
const user = {
  id: 101,
  name: 'Alex',
  role: 'Student'
};

// Create a new object, spread the existing user data, 
// and overwrite the 'role' property.
const updatedUser = {
  ...user,
  role: 'Graduate'
};

console.log(updatedUser);
// Output: { id: 101, name: 'Alex', role: 'Graduate' }
console.log(user.role); 
// Output: 'Student' (The original object remains untouched!)
```

------

### Notes:

- **Order Matters:** In objects, if you spread an object and then define a property with the same name, the later one "wins" and overwrites the previous value.
- **Immutability**. Instead of modifying an existing array or object (mutating it), you "spread" the old values into a new one, adding or changing only what you need.

## Reference

[Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#arrow_functions) on MDN

[Template Literals (Template Strings)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) on MDN

[Array Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#constructor) on MDN

[Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) on MDN

*Parts of these notes were drafted using Gemini 3.*



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------

[^1]: The term  *lambda function* comes from *lambda calculus* in mathematics. Lambda calculus is one of the theoretical foundation for the programming language paradigm called *functional programming*.  A primary aspect of functional programming is the use of *higher order functions* (functions that take functions as arguments and return other functions as results) which is a concept that comes from lambda calculus. 