<h1>Lab 1: Review of Beginning JavaScript</h1>

[TOC]

# Objectives

The objectives of this lab are:

1. Review JavaScript syntax you learned in CS 133JS.
2. Introduce you to Bootstrap, a CSS framework.



# Instructions

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

    **Notes:** Mari did a few things differently than the way I (Brian) would like you to do them:

    - Declare variables using `let` instead of `var`.
    - Don't put mutliple `return` statements in a function.
    - Don't write the `pad` function so that it sometimes returns a *string* and sometimes a *number*. Best practice is to always return the same type.
    - FYI, the global variable `timer` does not actually store an object. It holds the ID number of a timer object created by calling the built-in JavaScript function `setInterval`.

- Test and debug your application.

## Web App 2: Concentration - Version 1

- Download the staring file, `concentrationStart.zip`.
- Add Bootstrap styles (as well as custom styles) to the starting files to create an attractive looking concentration board on the page.
- Add JavaScript code to implement the concentration or memory game functionality as you might have done in CS 133JS.  Test and debug your application.

## Web App 3: TicTacToe - Version 1

- Add Bootstrap styles (as well as custom styles) to the starting files to create an attractive looking tic tac toe board on the page.
- Add JavaScript code to implement the tic tac toe game functionality as you might have done in CS 133JS.  Test and debug your application.



# Submission

- Complete the implementation and testing of all 3 applications.
- Upload completed applications to citstudent.lanecc.edu.  Test all 3 applications on the server.
- Download the evaluation form for lab 1.  Complete the evaluation using the form as a guide.  Include in the evaluation document:
    - One or more screen shots of each of your applications running in at least 2 browsers.
    - The url for each application on citstudent.lanecc.edu.
- Upload the evaluation document you created in moodle.