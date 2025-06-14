<h1>Term Project Instructions</h1>
**CS 233JS, Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

Each of the sections below are for a different deliverable as described in the [Term Project Requirements](CS233JS_ProjectRequirements.html).

## 1. Proposal: Description + UI Sketch

The objective of this first step in the project is to allow you to pick a topic and identify the functionality that you would like your application to provide.

- Watch the video that introduces the project.
- Read the [project requirements](CS233JS_ProjectRequirements.html) document.
- Write a paragraph or two describing the application you would like to build.  The application must make an AJAX call and you may find it helpful to look at the lists of free APIs below to get ideas for one to use in your project.
  - [Public APIs Developers Can Use in Their Projects](https://www.freecodecamp.org/news/public-apis-for-developers/) 
  - [Big List of Free and Open Public APIs](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)
- List the web API you plan to use and the other new JS technology introduced in this course (see the project requirements) that you will use in your project.
- Create a diagram of the UI for the application. You may sketch the UI using paper and pencil or any of a number of UI diagramming tools. I often use [Balsalmiq](https://balsamiq.com/) with students and can provide you with a free student account if you're interested.

### Submission

- Create a document that includes each of the requirements listed above.
- Share your document either formally or informally with at least one other student in class. Revise the document based on feedback that you think is relevant.
- Upload the document you created in Moodle.

## 2. API Call Research + Documentation

The objective of this step in the project is to allow you to gather detailed information about the API you'll be using in your project. This should also help you refine the functionality of your application.

- Review the API calls from the bookmarker and weather application lab.
- Review the Sample API Calls Documentation document.
- Read the API documentation for the web API you plan to use. Include a link to this documentation in your submission.
- Practice making the API call you'll make in code in your application. You may need to get an API key for the API. Document a sample URL for the API and any parameters that your application may need to modify.
- Analyze the JSON results from the API call. Document the structure of the JSON object and identify any of the specific data that your application will need. Document the structure of the JSON response when an invalid API call is made too.

### Submission

- Create a word processing document that includes each of the requirements listed above.
- Share your document either formally or informally with your lab partner (or another student if your lab partner is not available). Revise the document based on feedback that you think is relevant.
- Upload the document you created to Moodle.

## 3. Dev Environment + HTML & CSS

The objective of this step in the  project is to allow you to implement a static version of the UI for your project in HTML and CSS. This should also help you refine the look and feel of your application.

- Create the development environment for your application. Generally, this will involve 
  - Creating a folder for your application and a reasonable folder structure to contain your HTML, CSS, JavaScript and image files.
  - Creating a new GitHub repo for your project in that folder. Be sure to include a .gitignore file to exclude the files in the dist folder and other files that don't belong in the source code repository.
  - Adding a package.json and webpack.config.js file to that folder. You may want to copy those files from the weather app or the event app folders from  your labs and revise them to work with your app:
    - In package.json:
      - Change the name of the app to match yours.
      - Add or remove dependencies as needed for your app.
    - In webpack.config.js:
      - Add or remove `const` and `require` statements as needed depending on which loaders onr plugins you are using.
      - Revise the module exports, rules and plugins as needed.
  - Installing node modules that you'll need as you create your application.
- Create an HTML file that contains all of the static elements that make up the UI for your application.
- Add CSS to create a professional-looking UI for your application. The  first version of your look and feel may not be exactly what you  envisioned when you created your UI MockUp. If time permits you can  continue to work on your CSS later in the term.
- Take one or more screen shots of your application on your machine.
- Push your HTML and CSS to your github repository.

### Submission

- Create a word processing document that includes one or more screen shots of  your application as well as the URL for your github repository.
- Share your document either formally or informally with at least one other  student in class. Revise the document based on feedback that you think  is relevant.
- Upload the document you created in moodle.

## 4 Beta Version and Code Review

- When your code is 75% complete, add your lab partner as a collaborator on your GitHub repository (if it is a private repository).
- Let your lab partner know you are ready for a code review via a post to Discord.
- After your lab partner has made you a collaborator on their repository, do a code review for them using the code review form provided on Moodle.
- Give your lab partner a copy of the code review by posting it.

- Submit a copy of the code review you did to the Moodle Code Review assignment.

## 5 Production Version

### Finish the Project

The objective of this step in the project is to allow you to implement a first version of your application in JavaScript. 

- You should have created your JavaScript development environment in the previous deliverable.
- Implement one or more ES6 modules which may each contain an ES6 class that encapsulates the code in that module&mdash;if appropriate.
  - Create the skeleton of the code for your app:
    - For classes, begin by writing the constructor for your application. Identify the data that your application requires and create an instance variable in the constructor for each piece of data. 
    - For modules without classes, identify the event handlers that your application requires. Write a "stub" (the heading and an empty  body or body containing just a console.log statement) for a function that will be called for each of those event handlers. Bind each of those functions. Assign each of those functions to an event.
    - Write stubs for the rest of the functions (or methods) that aren't event handlers. 
  
  - Complete the functions (or methods) one at a time, testing as you go. You may find it helpful to write an algorithm in pseudocode (or English) for any function that is complex. Some functions may be  complex enough to require you to divide the code up into several  "helper" functions.
  - Optional: Document your work as you complete each piece of functionality. You may have sections of your code that you'd like to continue to work on but choose to "set aside" because of time constraints. Your documentation will be essential for your self-evaluation.
  - Add, commit to git and push to GitHub as you complete each piece of functionality as well.
  
- Take one or more screen shots of your application on your machine.
- Create a production build of your application and upload the production build to citstudent.lanecc.net.

### Do a Self-Evaluation

  **Optional**  
The objective of this step in the project is to allow you to reflect  on your progress as well as the process as you build your application. 

Review the [Sample Project Self Evaluation](SampleProjectSelf-Evaluation.html).

### Submission

- Upload a document to Moodle that includes:
  -  One or more screen shots of your application running on your machine.
     Include the same things you did in the screen-shots for the lab assignments:
     -  The folders and terminal in VS Code with the webpack server running.
     -  The URL of the webpack dev server visible in a screen-shot of the app running in a browser.
  -  The URL for your GitHub repository.
  -  The URL for your production code running on [citstudent.lanecc.edu](citstudent.lanecc.edu).
- Upload a document containing your self-evaluation (optional).



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript course materials written by Mari Good and revised by [Brian Bird](https://profbird.dev), in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---

