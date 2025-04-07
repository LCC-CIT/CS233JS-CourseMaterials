---
title: ES6 Classes
description: Intro to ES6 style classes
keywords: ES6, class
generator: Typora
author: Brian Bird
---

<h1>ES6 Classes</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Contents</h2>

[TOC]

## Review

Last term you were introduced to JavaScript object and object construtors

### Objects

This is an example of an *object literal*:

```javascript
// Object literal
const pigeon = {
  // Properties
  name: "Agatha",
  breed: "Egyptian Swift",
  speed: 50,
  // Method
  fly: function(){
    return this.name + " is flying at " + this.speed + " MPH.";
  }
}
```

### Object Constructors

Here's an example of a special function called an *object constructor*. 

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
```

To create an object, call the constructor with the keword `new`. Set the property values in the new object by passing them as arguments in the constructor function call:

```javascript
const agatha = new Pigeon("Agatha", "Egyptian Swift", 50);
const elizabeth = new Pigeon("Elizabeth", "Egyptian Swift", 60);
```

We can use these objects just like we would a literal object:

```javascript
agatha.speed = 55;
agatha.fly();
elizabeth.fly();
```



## Intro to Object Oriented Programming

This week you are refactoring the three web apps from last week to use classes and objects. This programming paradigm is called *object oriented programming* (OOP). Code that just uses functions and not classes or object constructors is called *procedural programming*.

### ES6 Class Syntax

A bunch of new features were added to the JavaScript language in 2015 in the ES6 specification. One of these was classes. A JavaScript *class* is very similar to a constructor function, but with a different syntax. Here's an example of a class:

```javascript
class Pigeon {
    constructor(name, breed, speed) {
        this.name = name;
        this.breed = breed;
        this.speed = speed;
    }

    fly() {
        return this.name + " is flying at " + this.speed + " MPH.";
    }
}
```

Here is an example of code to create new pigeon object can call the fly method:

```javascript
const pigeon = new Pigeon("Percy", "Rock Pigeon", 25);
console.log(pigeon.fly());
```

### OOP Concepts

#### Why use classes?

- To make code easier to reuse.
- To group together methods and variables that are related to eachother so that code is easier to understand.
- To make refactoring easier by reducing dependencies.

#### How are classes and objects related?

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

### Classes that Contain Instances of Other Classes

- An *object* is also called an *instance* of a class.
- When a class contains an instance of a class, this is called I.
- It is the way to build an application using multiple objects where each object represents a "thing" in the application.
- Classes should be "highly coherent" and "loosely coupled".

### Separation of Concerns

In order to make your code easy to test, debug and update (add features), it is good to separate parts of the app that do different things from each other; like i/o and processing. 

#### Example: The Concentration Game

This game can be refactored to have these classes:

- Card
- Board
- Game

The Board class will have Card objects in it and the Game class will have a Board object in it.

In order to follow the principle of separation of concerns, we can separate out the i/o (everything that has to do with the html page) from the processing. In order to do this:

- The Card class will just work with letters that represent suit and value rather than directly using card images.
- The Board class won't have any event listeners or any code that interacts with the html page in it.
- The Game class will be the only class that interacts with the html page.





## Reference

- Tutorials:

  - [JavaScript ES6 Tutorial](https://www.w3schools.com/js/js_es6.asp)&mdash; W3Schools

  - [JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)&mdash;MDN

- Notes from CS 133JS, Beginning JavaScript:

  - [Objects](https://lcc-cit.github.io/CS133JS-CourseMaterials/LectureNotes/CS133JS-LN-W07-D1-Objects.html)
  - [Object Constructors](https://lcc-cit.github.io/CS133JS-CourseMaterials/LectureNotes/CS133JS-LN-W07-D2-ObjectConstructors.html)



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised spring of <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------