<h1>Lab 4: ToDo List and Web Bookmarker</h13


<h2>Table of Contents</h2>

[TOC]

# Objectives

The objective of this lab is to give you more practice using the "new"[^1], widely supported version of JavaScript: ES6. You will also be introduced to Node.js, NPM and several other tools that are part of modern JavaScript development. 

# Instructions

Complete the web apps described below. For each problem:

- Accept the invitation to the GitHub Classroom repository containing the starter files. Use Git and GitHub to manage your source code.
  **Important**: Do all your work in the Classroom repository working folder, don't make a different repository.
- Create a JavaScript solution that solves the problem. Test your solution in at least one browser running on your local machine.
- Upload your solution to citstudent.lanecc.edu. Test your solution running on the server in at least one browser.

## 1. ToDo List

- Complete the ToDoList application described in the screencasts. The html and css files for the application have been provided in the starter GitHub repository. Add JavaScript code by following the detailed instructions in the starting .js file. Test and debug your application.
- Use Node, NPM, Webpack and Babel to create a production version of the  application "transpiled" to a version of JavaScript (ES5) that is supported by all browsers.

## 2. Web Page Bookmarker

- Complete the BookMarker application as described in the comments in the starting files for the application. Test and debug your application.

  Note: Here is a version of the createMeme method that uses a different strategy for resizing the images:
  ```javascript
  createMeme() {
    // Clear the previous image from the page
    this.$context.clearRect(0, 0, this.$canvas.width, 
                                    this.$canvas.height);
    // Calculate a canvas height to fit the aspect ratio of the image
    const scaleFactor = this.$canvas.width / this.$image.width;
    this.$canvas.height = this.$image.height * scaleFactor;
  
    // Draw the image and set it's size to match the canvas.
    this.$context.drawImage(this.$image, 0, 0, this.$canvas.width,
                                                this.$canvas.height); 
  ```

- Use Node, Npm, Webpack and Babel to create a production version of the  application "transpiled" to a version of JavaScript that is supported by all browsers.

# Submission

## Beta Version and Code Review

- Post to the Beta Version forum
  - When your code is 75% complete, add your lab partner as a collaborator on your GitHub repository.
  - Make a post in your team's channel on Discord letting your lab partner(s) know you are ready for a code review.
  - After a lab partner has made you a collaborator on their repository, do a code review for them using the code review form provided on Moodle.
  - Give your lab partner a copy of the code review by posting it in the forum.
- Submit your code reivew to Moodle
  - Submit a copy of the code review you did to the Moodle Code Review assignment.

## Production Version

- Publish to the CIT web server  
  - Upload your completed web apps to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test both apps on the web server.  

- Submit the following to Moodle:

  - Code review from your lab partner: 
    - Fill out the "Prod" column, entering yes for anything you fixed or completed.
    - Add screen shots for each web app showing[^2]:
      - Your folders and files in the VS Code file explorer and the terminal showing the webpack dev server running.
      - Each app running on the Webpack dev server with the URL visible. 


  - Moodle Lab 4 Production Version assignment:  put the citstudent URLs for each web app in the online text.



[^1]: ES6, also known as [ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript_version_history#6th_Edition_%E2%80%93_ECMAScript_2015) was finalized in June of 2015.

[^2]: I'm asking for screen shots for this lab so that you can show me that you did use Node.js and the development tools introduced this week.

---

Adapted by Brian Bird, spring 2024, from lab instructions written by Mari Good for winter 2024 and revised winter <time>2025</time>	