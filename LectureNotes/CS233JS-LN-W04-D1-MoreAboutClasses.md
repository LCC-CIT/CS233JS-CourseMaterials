---
title: More OOP
description: Why using classes and encapsulation makes your code better.
keywords: OOP, class, encapsulation, getter, setter
generator: Typora
author: Brian Bird
---

<h1>More About Classes and Object Oriented Programming</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                     |
| ------------------------------------------------------------ | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review          | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                       | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes **<== New topic!**                     | 8. Making API calls, graphs and charts, Google maps |
| 4. <mark>More time to finish the dice games</mark>           | 9. Term Project                                     |
| 5. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. Midterm Quiz | 10. Review                                          |
| 11. Final Quiz                                               |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Announcements

- Due dates pushed out one week.
  - You can start on next week's topic whenever you are done with the dice game.
- Some people are making their own GitHub repo. Please just use the one that you got via GitHub Classroom. I use GitHub Classroom tools to manage and grade those. If you clone a different repository, then it won't work with my tools.
- MIdterm is next week (week 5).



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

- [Using Classes Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) on MDN

  



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------