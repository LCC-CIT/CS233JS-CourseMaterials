<h1>Lab 1: Review of Beginning JavaScript</h1>

[TOC]

# Objectives

The objectives of this lab are:

1. Review JavaScript syntax you learned in CS 133JS.
2. Introduce you to Bootstrap, a CSS framework.



# Instructions

There are a few things Mari did differently than the way I would like you to do things:

- She hasn't introduced you to `let` and`const`yet, but I have so declare variables using `let` instead of `var`.
  - Use `const` to declare numbers that are used in the code:
    - In the stopwatch app, use a `const` for 60 (used twice).
    - In the concentration app, use a `const` for 20 (used once).
- Don't put mutliple `return` statements in a function, for example in the brances of an if-else statement.
- In the Stopwatch app, don't write the `pad` function so that it sometimes returns a *string* and sometimes a *number*. Best practice is to always return the same type.

## Web App 1: Stopwatch - Version 1

- Download the `stopWatchStart.zip` file and unzip it. The starting files have comments that guide you in completing the code. 

- Reanme the files by removing the word "start" from each file. 
  Complete the code in each of the starting files:

  - unstyledIndexStart.html, indexStart.html
    You can use either of thse files. `IndexStart.html` is already styled with Bootstrap. If you would like to do your own styling (optional) you can start with `unstyledIndexStart.html` which does not have styling.

  - stylesStart.css 
    There is nothing in this fiile. If you want to add some CSS styling (optional) to the web app, you can add it here.

  - indexStart.js 
    Add JavaScript code to implement the stop watch functionality as you might have done in CS 133JS.  
    - FYI, the global variable `timer` does not actually store an object. It holds the ID number of a timer object created by calling the built-in JavaScript function `setInterval`.
  
- Test and debug your application.

## Web App 2: Concentration - Version 1

- Download the staring file, `concentrationStart.zip`.
- Add JavaScript code to implement the concentration or memory game functionality as you might have done in CS 133JS.  
- Add Bootstrap styles (as well as custom styles) to the starting files to create an attractive looking concentration board on the page. You can add as much or as little as you wish.
- Test and debug your application.

## Web App 3: TicTacToe - Version 1

- Download the staring file, `tttStart.zip`.
- Add JavaScript code to implement the tic tac toe game functionality as you might have done in CS 133JS.
- Add Bootstrap styles (as well as custom styles) to the starting files to create an attractive looking tic tac toe board on the page. Again, add as much or little as you wish.
- Test and debug your application.



# Code Review

Do a review of your own code using the code review form posted on Moodle.



# Submission

## Publish to the CIT web server  
Upload your completed web apps to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test all 3 apps on the web server.  

- If you need to refresh your memory on how to do this, here are the instructions from the web authoring class: [How to upload web sites to citstudent](https://lcc-cit.github.io/CIS195-CourseMaterials/Lessons/UploadingWebSites.html).

## Upload to Moodle



- Moodle Lab 1 Code review assignment: upload your completed code review form.
- Moodle Lab 1 Production Version assignment:  put the citstudent URLs for each web app in the online text.

# Assessment

Here is a link to [the grading rubric](https://lcc-cit.github.io/CS233JS-CourseMaterials/Labs/Lab01/CS233JS_Lab01_Rubric.htm).

  

----

Adapted by Brian Bird, spring 2024, from lab instructions written by Mari Good for winter 2024.

---