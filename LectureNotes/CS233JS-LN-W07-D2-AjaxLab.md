---
title: AJAX
description: How to use AJAX to update data in web pages.
keywords: AJAX, fetch, JSON, promise
generator: Typora
author: Brian Bird
---

<h1>Lab 6 Notes</h1></h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                            |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review, lab 1   | 6. HTML5 Canvas, CSS Flexbox, lab 4                        |
| 2. ES6 Classes and Git, lab 2                                | 7. <mark>AJAX, ES6 promises, fetch API, lab 5</mark>       |
| 3. More about Classes                                        | 8. Making API calls, graphs and charts, Google maps, lab 6 |
| 4. More time to finish the dice games, lab 2b (XC)           | 9. Term Project                                            |
| 5. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. lab 3, Midterm Quiz | 10. Review                                                 |
| 11. Final Quiz                                               |                                                            |

<h2>Table of Contents</h2>

[TOC]

# Lab 6

## Web Bookmarker Completion

### Missing .gitignore

The .gitignore file was missing from the GitHub Classroom repository I gave you. You can add one from any of the previous labs. 

If you have already done a commit, then just adding and committing the .gitignore file won't remove the extra files that got committed (like those in the dist folder).

To make git stop tracking files (meaning stop including them in commits), you can do this:

#### Make Git untrack files

To untrack a single file, use `git rm`.

```
git rm --cached <filename>
```

And if you need untrack more that one file, simply list more files:

```
git rm --cached <filename>  <filename2>  <filename3>
```

Both of the commands above will make git untrack files without deleting them. This is because of the cached option. Removing the cached option will delete them from your drive.

```
git rm <filename>
```

To untrack an entire folder (aka directory), use this command:

```
git rm -r --cached <folder>
```

After running any of these commands, you need to commit the changes. 

(This section was adapted from [Commit Mistake: How to untracked files in Git](https://sufiyanyasa.com/blog/git-untrack-file/).)

### Getting Open Graph data

The project uses the opengraph web API to get web site data. The free plan for this service limits you to 100 requests per month. Alternatively you can use [LinkPreview](https://www.linkpreview.net/), which has a limit of 60 requests per hour on the free plan!

You will need to make these changes to your code:

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



## Weather App

### Forecast Date Object

The openweather web API now returns a JavaScript Date object for forecast.dt. It is no longer necessary to convert from *epoch time* to a Date object. I modified the getDate method to return a date string from the JS Date object.

```javascript
// ruturn a string with the month, day and year from a JS Date object
export function getDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

```



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 