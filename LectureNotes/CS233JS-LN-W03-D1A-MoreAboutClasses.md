---
title: Intro to Bootstrap
description: Quick intro to Bootstrap 
keywords: Bootstrap
generator: Typora
author: Brian Bird
---

<h1>More About Classes and Object Oriented Programming</h1>

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

Last week you learned how to create ES6 classes. This week you will learn more about OOP (Object Oriented Programming) and why you would want to use classes and objects.

# Object Oriented Programming

Last week you learned how to create ES6 classes. This week you will learn more about OOP (Object Oriented Programming) and why you would want to use classes and objects. We will be looking at a web app for playing the dice game  [Bunco](https://en.wikipedia.org/wiki/Bunco) as an example.

### Why use classes?

-  To make code easier to reuse.  

  For example, imagine you are making a dice game like Bunco. The game uses three dice and can have multiple players, so it makes sense to have separate classes for die and player&mdash;then we can make multiple die and player objects

- To group together methods and variables that are related to eachother so that code is easier to understand.  
  In our Bunco game, we group methods and instace variables together in these classes:

  - Die

  - Player

  - Game&mdash;this class will contain the code for managing the game-play logic.

- To make refactoring easier by reducing dependencies.  

  One of the dependecies that can really complcate our code is the code related to web page i/o (input/output). We can move that code out of the Game class and either put it in a sparate, special i/o  class, or just have a separate file containing i/o functions.



## Encapsulation

Last week you learned that putting code into a class is called *encapsulation*. There is more to encapsulation that just putting code into a class. It also means that the class becomes a boudary that prevents other code from directly using the instance variables inside our class. This is a way of reducing dependencies and makes code easier to refactor. 

#### Access Control

- Instance variables (fields) are public by default. (The opposite of most other programming languages.)
- Use # to make them private.

For example:

```javascript
class Player
{
    // declare private instance variables
    #name
    #number // player number
    #totalScore
    #roundScore
    #roundsWon

    constructor(name)
    {
        // Initialize instance variables.
        this.#name = name;
        this.#number = 0;
        this.#totalScore = 0;
        this.#roundScore = 0;
        this.#roundsWon = 0;
    }
```



#### getters and setters

If code outside a class need to access instance variables inside a class, we create special methods to do that. These special methods use the keywords `get` or `set`  and work like properties when accessed by code outside the class. For example, this is code from inside the Player class:

```javascript
// Getters and Setters
    get name() {return this.#name; }
    get number() { return this.#number; }
    get roundScore() { return this.#roundScore; }
    get totalScore() { return this.#totalScore; }
    get roundsWon() { return this.#roundsWon; }

    set number(value) { this.#number = value; }
    set roundScore(value) { this.#roundScore = value; }
    set totalScore(value) { this.#totalScore = value; }
    set roundsWon(value) { this.#roundsWon = value; }
```

Here is code that accesses some of the Player instance variables on a player object:

```javascript
startNewGame() {
        this.#round = 1;
        this.#currentPlayerIndex = 0;
        for (const player of this.#players) {
            player.totalScore = 0;
            player.roundScore = 0;
            player.roundsWon = 0;
        }
    }
```

# Example

[Bunco source code on GitHub](https://github.com/LCC-CIT/CS233JS-BuncoGame)

[Bunco running on the citstudent web server](http://citstudent.lanecc.edu/~brianb/CS233JS/Examples//Bunco)



# Reference

- [Using Classes Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) on MDN

  



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------