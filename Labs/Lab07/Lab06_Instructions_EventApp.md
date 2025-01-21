<h1>Lab 5: Web Bookmarker and Weather App</h13
<h2>Table of Contents</h2>

[TOC]

# Objective

The objective of this lab is to allow you to continue to practice using AJAX as a strategy for building applications as well as to continue to use Fetch and Promises to make calls to web APIs. 

# Overall Process

Complete the programming problem described below. For each problem:

1. **Create a JavaScript solution** that solves the problem. Test your solution in at least one browser running on your local machine.
2. **Upload your solution** to citstudent.lanecc.edu. Test your solution running on the server in at least one browser.
3. **Use Git and GitHub** to manage your source code and design documents.
4. **Evaluate your work** using the evaluation form provided.

# Event Application Completion

1. **Setup the webpack development environment** as described in the screencasts.
2. **Complete the Event application** described in the screencasts. The html and css files for the application have been provided. Add JavaScript code by following the detailed instructions in the starting .js file. Test and debug your application.

   Notes:

   - The tabs in the navbar are made using Bootstrap (which does this using fancy CSS) and are actually HTML list item elements, `<li>`.  The list elements get JavaScript event listeners that listen for click events.

   -  The`loadExperience` method is now named `showExperience`.
     The method `loadExperience` in the video is now named `showExperience` in the `status.js` starter file. The `showExperience` method calls `createExperienceChart`;
3. **Improve the application** by designing and implementing a strategy for reusing the navigation code across all 3 pages. Test and debug your implementation.
4. **Use webpack** to bundle all of the resources used by your application into a production version.

## Map API Alternatives

You can use either of these map APIs. the starter files have two versions of the about.js and about.html files, one for each map API, you can choose the one you want to use.

### Azure Maps

[Getting Started with Azure Maps](https://learn.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys)&mdash;Microsoft Blog Post.

- Requires an [Azure for Students](https://azure.microsoft.com/en-us/free/students) account.
  - Free for12 months, no credit card required.
  - Azure is used for other classes in our department.
- 1,000 or more (depending on the type of transaction) free transactions (without using your credit).

### Google Maps

- [Getting Started with Google Maps Platform](https://developers.google.com/maps/get-started)&mdash;GCP  Docs.
  - [Add a Google Map with a Marker using JavaScript](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)&mdash;GCP Docs.

- Requires a [GCP (Google Cloud Platform)](https://cloud.google.com) account.

  - 90 free trial, requires a credit card.
  - Your card could be billed if you use more than $300 in "free" services during the trial period.  
    A notification will be sent if this is about to happen.

  - After the trial period, you get a $200 a month free credit for GCP services, including Google Maps.



# Submission

## Beta Version and Code Review

- Post to the Beta Version forum
  - When your code is 75% complete, add your lab partner as a collaborator on your GitHub repository.
  - Make a post in the Beta forum on Moodle letting your lab partner know you are ready for a code review.
  - After your lab partner has made you a collaborator on their repository, do a code review for them using the code review form provided on Moodle.
  - Give your lab partner a copy of the code review by posting it in the forum.
- Submit your code reivew to Moodle
  - Submit a copy of the code review you did to the Moodle Code Review assignment.

## Production Version

- Publish to the CIT web server  
  - Upload your completed web app to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test the app on the web server[^2].  

- Submit the following to Moodle:

  - Code review from your lab partner: 
    - Fill out the "Prod" column, entering yes for anything you fixed or completed.
    - Add screen shots showing[^1]:
      - Your folders and files in the VS Code file explorer and the terminal showing the webpack dev server running.
      - The app running on the Webpack dev server with the URL visible. 
  
  
    - Moodle Lab 6 Production Version assignment:  put the citstudent URL for the web app in the online text.
  

[^1]: I'm asking for screen shots for this lab so that you can show me that you did use Node.js and the development tools introduced this week.
[^2]: When you connect a browser to your Event app running on citstudent, you will need to use an insecure HTTP connection, not a secure HTTPS  connection. This is because (unfortunately) the web API running on  citweb only provides a HTTP connection. If you  connect to your Event app on citstudent using HTTPS, your browser will  block the POST request that your code sends to citweb with this error  message: "Blocked loading mixed active content". 

---

Adapted by Brian Bird, spring 2024, from lab instructions written by Mari Good for winter 2024.

​              