---
title: More ES6
description: localStorage and JSON
keywords: local storage, json, parse, stringify
generator: Typora
author: Brian Bird
---

<h1>localStorage and JSON</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Table of Contents</h2>

[TOC]

### Local Storage

`localStorage` is an HTML5 feature that allows data storage in a user’s browser with no expiration. It’s part of the Web Storage API and unlike cookies, data isn’t sent to the server and can hold up to 5MB of data per domain. The data persists even after the browser is closed.

- localStorage["key"]
- localStorage.getItem("key")
- localStorage.setItem("key", "value")
- delete localStorage["key"]

```javascript
// Store data with the key "userName"
localStorage["userName"] = "Juan Gonzalez";

// Retrieve data, expected output: "Juan Gonzalez"
console.log(localStorage["userName"]);

// Change data
localStorage["userName"] = "Olivia Medina";

// Another way to retrieve data, expected output: "Oliva Medina"
console.log(localStorage.getItem("userName"));

// Another way to set or change data
localStorage.setItem("userName", "Jules Torres");

// Expected output: "Jules Torres"
console.log(localStorage.getItem("userName"));

// Remove data
delete localStorage["userName"];

// Expected output: undefined
console.log(localStorage["userName"]);
```

All data stored in localStorate is converted to strings, so even if you store a number or a boolean value, when you retrieve the value it will be a string.

Local storage is used in the ToDoList app tasks are stored in local storage in `loadTasks` and retrieved in the `constructor`, 



## JSON 

JSON is an acronym for JavaScript Object Notation and is a data formatting standard. The most common uses of JSON formatted data are: data storage, data interchange and configuration files.

### JSON Format

 JSON is formatted as a collection of key-value pairs where the keys are strings and the values can be various types such as strings, numbers, booleans, arrays, or objects.

Here is an example:

```javascript
''{
  "name": "Jason Lindsey",
  "age": 46,
  "isStudent": false,
  "interests": ["Math", "Science"],
  "address": {
    "street": "123 Main St",
    "city": "Sometown",
    "state": "KY",
  },
}'
```

#### JavaScript Object Format

Here is a standard JavaScript object literal for comparison:

```javascript
let mrScience = {
  name: "Jason Lindsey",
  age: 46,
  isStudent: false,
  interests: ["Math", "Science"],
  address: {
    street: "123 Main St",
    city: "Sometown",
    state: "KY"
  }
}
```

**Q:** What differences do you notice between the two formats?

### JSON.stringify()

This method is used to convert a JavaScript object or value into a string. It’s commonly used when storing data (perhaps in localStorage) or sending it somewhere (such as to a web API), since the data usually needs to be string type for these kinds of operations.

Here’s an example using the mrScience object in the previous example:

```javascript
let jsonString = JSON.stringify(mrScience);

// Expected output: {"name":"Jason Lindsey","age":46,"isStudent":false,"interests":["Math","Science"],"address":{"street":"123 Main St","city":"Sometown","state":"KY"}}
console.log(jsonString);
```

### JSON.parse()

This method is used to convert a JSON string into a JavaScript object. It’s commonly used when retrieving data from storage or receiving data sent from a web API, since the data is normally in JSON format.

Here’s an example:

```javascript
let mrScience = JSON.parse(jsonString);

// Expected output: Jason Lindsey
console.log(mrScience.name);
```



## Reference

[Template Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)&mdash;MDN

[Using the Web storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)&mdash;MDN

[Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)&mdash;MDN

[Client Side Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)&mdash;MDN

[Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)&mdash;MDN



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 