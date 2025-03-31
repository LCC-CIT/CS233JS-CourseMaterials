<h1>Lab 6: Web Bookmarker and Weather App</h13




<h2>Table of Contents</h2>

[TOC]

# Objectives

The objective of this lab is to introduce AJAX as a strategy for building web applications as well as modern approaches to making AJAX calls.

# Instructions

Complete the programming problems described below. For each problem:

- Create a JavaScript solution that solves the problem. Test your solution running on your local machine.
- Upload your solution to citstudent.lanecc.edu. Test your solution running on the server.
- Use Git and GitHub to manage your source code and design documents. 
  **Important**: Do all your work in the working folders of your GitHub Classroom repositories. Don't make new repositories.
- Exchange code reviews of your work using with your lab partner.

## Web App 1: Bookmarker Version 2

- The starting files are the solution files from your previous version of this application. Copy the folder containing the first version of your bookmarker project into the working folder of the GitHub repository for this lab, use git to add it, commit it, and push it to your GitHub Classroom repository.
- Register for a free account on [opengraph.io](https://www.opengraph.io) or [linkpreview.net](http://www.linkpreview.net/).
- Add an image as well as a title to each bookmark by accessing data about each url from opengraph.io, or linkpreview.net. The concepts, skills and syntax that you need to make this change to your original application are discussed in the lecture notes and videos. Test and debug your application.
- Use webpack to bundle all of the resources used by your application into one .js file.

### Alternative Way to Get Open Graph data

The project uses the opengraph.io web API to get web site data. The free plan for this service limits you to 100 requests per month. Alternatively you can use [LinkPreview](https://www.linkpreview.net/), which has a limit of 60 requests per hour on the free plan!

You will need to make these changes to your code[^1]:

```javascript
// In the constructor:
this.apiUrl = "https://api.linkpreview.net";
this.apiId = "fd3f9a0c9fafe271af5bd823cf3f0c02"; // Brian's key, use your own key

// In addBookmark, the first call to fetch:
fetch(`${this.apiUrl}?key=${this.apiId}&q=${url}`)

// In addBookmark, when creating the bookmark object:
const newBookmark = {
                    title: data.title,
                    image: data.image,
                    link: urlForHref,
                    description: description
                };
```



## Web App 2: Weather Application

- Accept the GitHub Classroom invitation and Clone the github repository to get the starting files for the application. Use git and github to manage your work.
- Setup the development environment for the application. package.json and webpack.config.js have been provided. Run npm install from the  command line.
- Complete the application as described in the comments in the  starting files for the application. Test and debug your application.
- Use webpack to bundle all of the resources used by your application into ONE (development version) js file.

### Forecast Date Object

The openweather web API now returns a JavaScript Date object for forecast.dt. It is no longer necessary to convert from *epoch time* to a Date object. I modified the getDate method to return a date string from the JS Date object.

```javascript
// ruturn a string with the month, day and year from a JS Date object
export function getDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

```



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
  - Upload your completed web apps to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test both apps on the web server.  

- Submit the following to Moodle:

  - Code review from your lab partner: 
    - Fill out the "Prod" column, entering yes for anything you fixed or completed.
    - Add screen shots for each web app showing[^2]:
      - Your folders and files in the VS Code file explorer and the terminal showing the webpack dev server running.
      - Each app running on the Webpack dev server with the URL visible. 


  - Moodle Lab 6 Production Version assignment:  put the citstudent URLs for each web app in the online text.



[^1]: Note that the [linkpreview documentation](https://docs.linkpreview.net/#query-parameters) (as of spring 2024) says the query parameter name `key` is deprecated, but that is only true for HTTP POST requests. We are using a GET request so `key` is the right name for the API key parameter.
[^2]: I'm asking for screen shots for this lab so that you can show me that you did use Node.js and the development tools introduced this week.

---

Adapted by Brian Bird, spring 2024, revised winter 2025, from lab instructions written by Mari Good for winter 2024.