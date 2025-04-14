---
title: More OOP
description: Why using classes and encapsulation makes your code better.
keywords: OOP, class, encapsulation, getter, setter
generator: Typora
author: Brian Bird
---

<h1>More About Classes and OOP&mdash;Finishing the Dice Games</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Contents</h2>

[TOC]

# Guidance for Finishing the Dice Games

## Review

- Review of how to use multiple classes.
  - One class declaration per file.
  - Objects get instantiated where the code will be used.
    - Array of Die in Game.
    - Array of Players in Game.
    - Game object in index.js.
  - All of the files are linked in HTML script elements in index.html.
- Review getter and setters.
  - Look at the getters and setters in Player and see how they are used in Game. They are used as if they were public fields.

## Designing the Game

- Start by understanding the requirements.
  - What is the goal of the game (how do you win?)
  - How do players take turns?
  - How is scoring done?
  - What other rules are there?
- Look at the Bunco game and see which methods you can just use as-is without change. Copy them into your project.
- See what code you can use or modify from the Going to Boston game. Copy that into your project.
- For the things that still need to be done, make a list of what they are, then write method stubs for those in each class where they fit. 
- Look at which methods will be the ones that won't depend on other stub methods and write and test those first.

## Testing and Debugging

Write a simple function that you can run from the console that you can use to test each method as you write it. You will create an object for the class that contains the method you want to test.



# Examples

[Bunco source code on GitHub](https://github.com/LCC-CIT/CS233JS-BuncoGame)

[Bunco running on the citstudent web server](http://citstudent.lanecc.edu/~brianb/CS233JS/Examples//Bunco)

[Goinog to Boston code on GitHub](https://github.com/LCC-CIT/CS233JS-Going2Boston)

[Going to Boston running on citstudent](https://citstudent.lanecc.edu/~brianb/CS233JS/Examples/Going2Boston/)

# Reference

[Using Classes Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) on MDN



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2025</time> are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------