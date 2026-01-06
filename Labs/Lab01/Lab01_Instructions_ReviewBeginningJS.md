<h1>Lab 1: JavaScript Review + Bootstrap Intro</h1>

**CS 233JS, Intermediate Programming: JavaScript**

<h2>Contents</h2>


[TOC]

## Objectives

The objectives of this lab are:

1. Review what you learned in CS 133JS, Beginning JavaScript.
2. Introduce you to Bootstrap, a CSS framework.



## Part 1: W3 Schools Quizzes and Tutorials

If you don't already have an account on W3 Schools (it's free), create one and sign in so you can track your progress.

	### JavaScript Review

Take the [W3 Schools JavaScript quiz](https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS). There are 25 questions. For any questions you have difficulty answering or answer incorrectly, do the associated tutorial.

You will submit a screen-shot showing your final score after doing any tutorials and retaking the quiz.

### Bootstrap 5 Intro

Do the first three [W3 Schools Bootstrap 5 Tutorials](https://www.w3schools.com/bootstrap5/index.php):

- Get Started
- Containers
- Grid Basic

Be sure to sign in so that you can track your progress and submit a screen shot showing you completed the first three tutorials.



## Part 2: Web App

There are a few things Mari did differently than the way I would like you to do things:

- She hasn't introduced you to`let` and`const` yet, but you have learned about these in CS 133JS, so declare variables using `let` instead of `var`.
  - Use `const` to declare numbers that are used in the code:
    - In the stopwatch app, use a `const` for 60 (used twice).
    - In the concentration app, use a `const` for 20 (used once).
- Don't put multiple `return` statements in a function, for example in the branches of an if-else statement.
- In the Stopwatch app, don't write the `pad` function so that it sometimes returns a *string* and sometimes a *number*. The best practice is for a function to always return the same data type.

### Web App 1: Stopwatch - Version 1

- Download the [stopWatchStart.zip](https://drive.google.com/drive/folders/156k99ByO2jnzu1kkTWECPCTWIex6RT8g?usp=sharing) file and unzip it. The `indexStart.js` file has comments in it to guide you through the process of completing the code. 
- Rename the files by removing the word "start" from each file. In `index.html`, change the `src` attribute in the `script` element to use the new file name. 
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



### Code Review

Do a review of your own code for the stopwatch app using the code review form.



## Submission

### Publish to the CIT web server  
Upload your completed web apps to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test the app on the web server to verify that it still works.  

- If you need to refresh your memory on how to use FileZilla, here are the instructions from the web authoring class: [How to upload web sites to citstudent](https://lcc-cit.github.io/CIS195-CourseMaterials/Lessons/UploadingWebSites.html).

### Upload to Moodle

#### Moodle Lab 1 Code review assignment: 

- Upload your completed code review form. This week you are just reviewing your own code.

#### Moodle Lab 1 Production Version assignment:

- Upload a screen-shot of your final score on the JavaScript Quiz.
- Upload a screen-shot of your Bootstrap tutorial progress.
- Put the citstudent URLs for your web app in the online text.

## Assessment

Here is a link to [the grading rubric](https://lcc-cit.github.io/CS233JS-CourseMaterials/Labs/Lab01/CS233JS_Lab01_Rubric.htm).

  

----

Adapted by Brian Bird in spring 2024 from lab instructions written by Mari Good for winter 2024, revised by Brian Bird winter <time>2026</time>.

---