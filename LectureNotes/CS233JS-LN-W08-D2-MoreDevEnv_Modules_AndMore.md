---

title: Web API
description: Example of making calls to JSON server. How to use DotEnv to hide secrets.
keywords: .env, json-server
generator: Typora
author: Brian Bird
---

<h1>More on Web APIs, Dev Environment and Modules</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## .env File

Have you seen GitDefender alerts about web api keys in your source code? This is a solution to that problem.

A .env file stores configuration information for the app. 

- Why shouldn’t configuration information like the api key for google 
  maps OR the url for the service that processes the registration 
  information go in our source code?
- JS developers generally put this kind of information in a .env file (that’s 
  gitignored) and create an .env.example file (that’s not ignored) so that 
  other developers know what technical information the app needs.

### Example .env File

```json
NODE_ENV=dev
SERVER_URL=http://localhost:3000/participants
AMAP_KEY=PUT_YOUR_AZURE_API_KEY_HERE
# GMAP_KEY=YOUR_API_KEY_GOES_HERE

# NODE_ENV=production
# SERVER_URL=http://citweb.lanecc.net:5000/participants
```

### Making the .env settings available in your code

- via `process.env`  
  `process.env` is a global object in Node.js where the environment variables for the current process can be stored.
  
  The `dotenv` module gets added to webpack.config.js by the statement:
  `require('dotenv').config();`
  
   When you build the project, `dotenv` loads all of the variables in the .env file and stores them in the `process.env` object for use when building the app. In your code you can also access them via `process.env`.
  
- Via global variables  
  In addition, you can use the webpack `DefinePlugin` to create global variables for the settings that were loaded from the .env file:  

  ```javascript
  new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          SERVER_URL: JSON.stringify(process.env.SERVER_URL),
          GMAP_KEY: JSON.stringify(process.env.GMAP_KEY),
          AMAP_KEY: JSON.stringify(process.env.AMAP_KEY)
        })
  ```

These global variables can then be accessed anywhere in the source code of your project. This is how it is done in lab 7, the event app.

## Modules

 You can use ES6 module (import and export) syntax to make a function available in other js files.

This code is in src/services/validateRegistrationForm.js:

```javascript
export default function validateRegistrationForm(formValues) { … } 
```

This code is in src/home.js:
```javascript
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';
```

You can review importing and exporting modules in the [week 6 lecture notes](CS233JS-LN-W06-D2-NodeDevToolSetup.html)

### json-server

The NPM module, `json-server`, allows storing data and getting data by id. `json-server` is frequently used to “mock” a data store web API during the development process. Some of you may want to use it for your term project.

For lab 7, production version, this service is running at  http://citweb.lanecc.net:5000/participants

## Production vs. Development Builds

Ways that production builds in lab 7 could be different from development builds:

- CSS is extracted from JS files and bundled into separate CSS files.
- Possible use: the local dev json-store could be used automatically instead of the one running on a web server.



## Reference

[Get and Post method using Fetch API](https://www.geeksforgeeks.org/get-and-post-method-using-fetch-api/)&mdash;Geeks for Geeks.

[How to Use JSON Server for Front-end Development](https://www.freecodecamp.org/news/json-server-for-frontend-development/)&mdash;Juliet Ofoegbu, Free Code Camp.

[How to Use Node Environment Variables with a DotEnv File for Node.js and npm](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/)&mdash;Veronica Stork, Free Code Camp.



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 