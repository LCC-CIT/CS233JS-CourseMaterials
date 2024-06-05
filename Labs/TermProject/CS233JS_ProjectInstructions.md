<h1>Term Project Instructions</h1>

<h2>Table of Contents</h2>

[TOC]

Each of the sections below are for a different deliverable as described in the [Term Project Requirements](CS233JS_ProjectRequirements.html).

# Proposal: Description + UI MockUp

The objective of this first step in the project is to allow you to pick a topic and identify the functionality that you would like your application to provide.

- Watch the video that introduces the project.
- Read the project overview document.
- Write a paragraph or two describing the application you would like to build.  The application must make an AJAX call and you may find it helpful to  look at [Public APIs Developers Can Use in Their Projects](https://www.freecodecamp.org/news/public-apis-for-developers/) to get an idea of some of the web APIs that are available to use in your project.
- Create a diagram of the UI for the application. You may sketch the UI using paper and pencil or any of a number of UI diagramming tools. I often use Balsalmiq with students and can provide you with a free student account if you're interested.

## Submission

- Create a document that includes each of the requirements listed above.
- Share your document either formally or informally with at least one other student in class. Revise the document based on feedback that you think is relevant.
- Upload the document you created in Moodle.

# API Call Research + Documentation

The objective of this step in the project is to allow you to gather detailed information about the API you'll be using in your project. This should also help you refine the functionality of your application.

- Review the API calls from the bookmarker and weather application lab.
- Review the Sample API Calls Documentation document.
- Read the API documentation for the web API you plan to use. Include a link to this documentation in your submission.
- Practice making the API call you'll make in code in your application. You may need to get an API key for the API. Document a sample URL for the API and any parameters that your application may need to modify.
- Analyze the JSON results from the API call. Document the structure of the JSON object and identify any of the specific data that your application will need. Document the structure of the JSON response when an invalid API call is made too.

## Submission

- Create a word processing document that includes each of the requirements listed above.
- Share your document either formally or informally with your lab partner (or another student if your lab partner is not available). Revise the document based on feedback that you think is relevant.
- Upload the document you created to Moodle.

# Dev Environment + HTML & CSS

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

## Submission

- Create a word processing document that includes one or more screen shots of  your application as well as the URL for your github repository.
- Share your document either formally or informally with at least one other  student in class. Revise the document based on feedback that you think  is relevant.
- Upload the document you created in moodle.

# Production Version

The objective of this step in the project is to allow you to implement a first version of your application in JavaScript. 

- You should have created your JavaScript development environment in the previous deliverable.
- Implement one or more ES6-style classes that encapsulate the dynamic functionality of your application in JavaScript.
  - Begin by writing the constructor for your application. Identify the data  that your application requires and create an instance variable in the  constructor for each piece of data. Identify the event handlers that  your application requires. Write a "stub" (the heading and an empty  body or console.log statement) for a function that will be called for  each of those event handlers. Bind each of those functions. Assign  each of those functions to an event. 
  - Write the function for one event at a time, testing as you go. You may find it helpful to write  an algorithm for any function that is complex. Some functions may be  complex enough to require you to divide the code up into several  "helper" functions.
  - Document your work as you complete each  piece of functionality. You may have sections of your code that you'd  like to continue to work on but choose to "set aside" because of time  constraints. Your documentation will be essential in your  self-evaluation and my evaluation of your work.
  - Add, commit and push as you complete each piece of functionality as well.
- Take one or more screen shots of your application on your machine.
- Create a production build of your application and upload the production build to citstudent.lanecc.net.

## Submission

- Create a word processing document that includes one or more screen shots of  your application running on your machine as well as the URL for your  github repository and the URL for your production code running on citstudent.lanecc.net.
- Share your document either formally or  informally with at least one other student in class. Revise the document based on feedback that you think is relevant.
- Upload the document you created in moodle.
