---
title: Web API
description: TBD
keywords: TBD
generator: Typora
author: Brian Bird
---

<h1>Working with Web APIs</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]



# Lab 5

Note that the [linkpreview documentation](https://docs.linkpreview.net/#query-parameters) says the query parameter name `key` is deprecated, but that is only true for HTTP POST requests. We are using a GET request so `key` is the right name for the API key parameter.



# Lab 6

### Home Page

Notice that when you submit the form, the data is saved in the db.json file.

### Status Page

#### Tabs

Tabs are made with Bootstrap (which makes them using fancy CSS) and are actually HTML list item elements, `<li>`.  They get event listeners that listen for click events.

#### `loadExperience` is now `showExperience`

The method `loadExperience` in the video is now named `showExperience` in the `status.js` starter file. The `showExperience` method calls `createExperienceChart`;



# Reference

[Get and Post method using Fetch API](https://www.geeksforgeeks.org/get-and-post-method-using-fetch-api/)&mdash;Geeks for Geeks.

[How to Use JSON Server for Front-end Development](https://www.freecodecamp.org/news/json-server-for-frontend-development/)&mdash;Juliet Ofoegbu, Free Code Camp.

[How to Use Node Environment Variables with a DotEnv File for Node.js and npm](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/)&mdash;Veronica Stork, Free Code Camp.



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 