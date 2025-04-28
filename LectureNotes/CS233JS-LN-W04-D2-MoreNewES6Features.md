---
title: More ES6
description: More about new ES6 features.
keywords: local storage, json, array methods
generator: Typora
author: Brian Bird
---

<h1>More about New ES6 Features</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                               |                                                     |
| ------------------------------------------------------------ | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review          | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                       | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                        | 8. Making API calls, graphs and charts, Google maps |
| 4.<mark> JS Dev Tools: Node.js, NPM, Webpack, LocalStorage.</mark> | 9. Term Project                                     |
| 5.  Midterm Quiz                                             | 10. Review                                          |
| 11. Final Quiz                                               |                                                     |



<h2>Table of Contents</h2>

[TOC]

## New ES6 Syntax/Features

These are "new" ES6 features that Mari introduced you to and that you are using in this week's lab assignment[^1]. 

### Template Strings (template literals)

Template strings allow you to create strings with embedded expressions, which are evaluated and then concatenated into the resulting string. It uses backticks (``) instead of single or double quotes.

Example:

```javascript
let name = "Jordan";
let greeting = `Hello, ${name}!`; // "Hello, Jordan!"
```

In the ToDoList app, the `generateTaskHTML` function uses this.

### Local Storage

An HTML5 feature that allows data storage in a user’s browser with no expiration. It’s part of the Web Storage API and unlike cookies, data isn’t sent to the server and can hold up to 5MB of data per domain. The data persists even after the browser is closed.

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

## Arrays

### `reduce`
The `Array.reduce()` method in JavaScript is used to call a function for each element in an array to *reduce* the array to a single value&mdash;meaning to get a result that is a single value. It executes the callback function for each value of the array starting at index 0 and going to the highest index number of the array.

Here's an example that calculates the sum of numbers in an array:

```javascript
let numbers = [1, 2, 3, 4, 5];

let sum = numbers.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);  // 0 is the initial value

// Expected output: 15, the sum of numbers in the array
console.log(sum);
```

The variable `accumulator` is the accumulated total previously returned in the last call to the callback function, or on the first call, the initial value. The `currentValue` is the current element being processed in the array. The `0` after the callback function is the initial value assignmed to `accumulator`. 
(You can omit the  initial value parameter in which case the first element of the array will be used as an initial value.)

### `forEach`

This method is used to execute a callback function once for each array element. It’s a way to iterate over the elements of an array. It is an alternative to using a `for of` loop.

Here is an example where `forEach` is used to iterate over the array and multiply the value stored in each element by 10.

```javascript
let array = [1, 3, 4, 7];

array.forEach(function(value) {
  console.log(value * 10);
});

// Expected output:
// 10
// 30
// 40
// 70
```

In this example an anonymous function is provided to `forEach` that takes one argument, the current array element being processed, multiplies it by 10, and returns the result.

This method is used in the ToDoList app in the `addEventHandlers` method.

## HTML Form Validation Styling

In the ToDoList `addTask` method there is code to check to see if the "Task Description" input is valid and add or remove the `is-invalid` Bootstrap style from the HTML input element. 

```javascript
const textBox = document.getElementById('addTask');  // get the input element
    const taskDescription = textBox.value;  // get the task description
    if (taskDescription === '') {
      textBox.classList.add('is-invalid');  // Bootstrap style for invalid input
    } else {
      textBox.classList.remove('is-invalid');
			// the rest of the code omitted...
    };
```

The way this code works is that `textBox.classList` is a special DOM object that contains a list of all the classes in the I attribute of an HTML element, in this case, an `<input>` element. The `classList` object  has `add` and `remove` methods that allow CSS classes to be dynamically added to, or removed from, an HTML element.



## JSON 

JSON is an acronym for JavaScript Object Notation and is a data formatting standard. The most common uses of JSON formatted data are: data storage, data interchange and configuration files.

### JSON Format

 JSON is formatted as a collection of key-value pairs where the keys are strings and the values can be various types such as strings, numbers, booleans, arrays, or objects.

Here is an example:

```javascript
{
  "name": "Jason Lindsey",
  "age": 46,
  "isStudent": false,
  "interests": ["Math", "Science"],
  "address": {
    "street": "123 Main St",
    "city": "Sometown",
    "state": "KY",
  }
}
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



# Reference

[Template Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)&mdash;MDN

[Using the Web storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)&mdash;MDN

[Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)&mdash;MDN

[Client Side Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)&mdash;MDN

[Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)&mdash;MDN



[^1]: Mari's list of "new" features is a little longer than mine because she included some features we already covered in my CS 133JS class.

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 