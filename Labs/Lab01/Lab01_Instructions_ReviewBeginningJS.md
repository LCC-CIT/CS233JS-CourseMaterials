<h1>Lab 1: Review of Beginning JavaScript</h1>

[TOC]

# Objectives

The objectives of this lab are:

1. Review JavaScript syntax you learned in CS 133JS.
2. Introduce you to Bootstrap, a CSS framework.



# Instructions

There are a few things Mari did differently than the way I would like you to do things:

- She hasn't introduced you to`let` and`const` yet, but you have learned about these in CS 133JS, so declare variables using `let` instead of `var`.
  - Use `const` to declare numbers that are used in the code:
    - In the stopwatch app, use a `const` for 60 (used twice).
    - In the concentration app, use a `const` for 20 (used once).
- Don't put multiple `return` statements in a function, for example in the branches of an if-else statement.
- In the Stopwatch app, don't write the `pad` function so that it sometimes returns a *string* and sometimes a *number*. The best practice is for a function to always return the same data type.

## Web App 1: Stopwatch - Version 1

- Download the `stopWatchStart.zip` file and unzip it. The `indexStart.js` file has comments in it to guide you through the process of completing the code. 
- Reaname the files by removing the word "start" from each file. In `index.html`, change the `src` attribute in the `script` element to use the new file name. 
  Complete the code in each of the starting files:
  - `unstyledIndexStart.html`, `indexStart.html`
    You can use either one of these files. 
    - `IndexStart.html` is already styled with Bootstrap, there is nothing you need to add to this file. 
    
    - `unstyledIndexStart.htm` has no Bootstrap styling. If you would like to do your own styling (optional) you can add it to this one.
    
  - `stylesStart.css` 
    There is nothing in this file. If you want to add some CSS styling (optional) to the web app, you can add it here.
  
  - `indexStart.js` 
    Add JavaScript code to implement the stop watch functionality as you might have done in CS 133JS.  
    - FYI, the global variable `timer` does not actually store an object. It holds the ID number of a timer object created by calling the built-in JavaScript function `setInterval`.
    - Read more about the `setInterval` function in [this MDN document](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval). In particular, note that it uses your `incrementTimer` function as a *callback function* (a function that it calls).
- Test and debug your application.
- You can try out a completed version of the web app here: [https://citstudent.lanecc.edu/~brianb/CS233JS/Lab01/stopWatch/](http://citstudent.lanecc.edu/~brianb/CS233JS/Lab01/stopWatch/)

## Web App 2: Concentration - Version 1

- Download the staring file, `concentrationStart.zip`.
- Add JavaScript code to implement the concentration (aka memory) game functionality as you might have done in CS 133JS.  
- Add Bootstrap styles (as well as custom styles) to the starting files to create an attractive looking concentration board on the page. You can add as much or as little as you wish.
- Test and debug your application.
- You can try out a completed version of the web app here: 
  [https://citstudent.lanecc.edu/~brianb/CS233JS/Lab01/concentration/](http://citstudent.lanecc.edu/~brianb/CS233JS/Lab01/concentration/)

## Web App 3: TicTacToe - Version 1

- Download the staring file, `tttStart.zip`.
- Add JavaScript code to implement the tic tac toe game functionality as you might have done in CS 133JS.
- Add Bootstrap styles (as well as custom styles) to the starting files to create an attractive looking tic tac toe board on the page. Again, add as much or little as you wish.
- Test and debug your application.
- You can try out a completed version of the web app here: 
  [https://citstudent.lanecc.edu/~brianb/CS233JS/Lab01/ticTacToe/](http://citstudent.lanecc.edu/~brianb/CS233JS/Lab01/ticTacToe/)



# Code Review

Do a review of your own code using the code review form posted on Moodle.



# Submission

## Publish to the CIT web server  
Upload your completed web apps to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test all 3 apps on the web server.  

- If you need to refresh your memory on how to do this, here are the instructions from the web authoring class: [How to upload web sites to citstudent](https://lcc-cit.github.io/CIS195-CourseMaterials/Lessons/UploadingWebSites.html).

## Upload to Moodle

- Moodle Lab 1 Code review assignment: upload your completed code review form. This week you are just reviewing your own code.
- Moodle Lab 1 Production Version assignment:  put the citstudent URLs for each web app in the online text.

# Assessment

Here is a link to [the grading rubric](https://lcc-cit.github.io/CS233JS-CourseMaterials/Labs/Lab01/CS233JS_Lab01_Rubric.htm).

  

----

Adapted by Brian Bird in spring 2024 from lab instructions written by Mari Good for winter 2024, revised by Brian Bird spring <time>2025</time>.

---