---
title: Midterm Review
description: Review topics covered in the first half of the term.
keywords: html elements, es6, bootstrap, node.js, webpack, babel
author: Brian Bird
---

<h1>Midtarm Review</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                        |                                                     |
| ----------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review   | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. ES6 Classes and Git                                | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes                                 | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage. | 9. Term Project                                     |
| 5.  <mark>Review and Midterm Quiz</mark>              | 10. Review                                          |
| 11. Final Quiz                                        |                                                     |



<h2>Table of Contents</h2>

[TOC]

These are the topics covered by the midterm quiz.

## Getting References to HTML Elements

Various way of getting a reference to an HTML element

Here are the different ways to get a reference to an HTML element using JavaScript, along with examples:

---

###  **`getElementById`**  
Select an element by its `id` attribute.  
```html
<div id="title">Hello World</div>
```
```javascript
const titleElement = document.getElementById('title');
```

---

###  **`getElementsByClassName`**  
Select elements by their `class` attribute (returns a live `HTMLCollection`).  
```html
<p class="text">Paragraph 1</p>
<p class="text">Paragraph 2</p>
```
```javascript
const textElements = document.getElementsByClassName('text');
const firstText = textElements[0]; // Access first element
```

---

###  **`getElementsByTagName`**  
Select elements by their tag name (e.g., `div`, `p`) (returns a live `HTMLCollection`).  
```html
<span>Item 1</span>
<span>Item 2</span>
```
```javascript
const spans = document.getElementsByTagName('span');
const firstSpan = spans[0]; // Access first span
```

---

###  **`querySelector` and `querySelectorAll`**  
Use CSS-style selectors to find elements:  
- `querySelector`: Returns the **first** matching element.  
- `querySelectorAll`: Returns all matches as a static `NodeList`.  

```html
<div class="box">Box 1</div>
<div class="box">Box 2</div>
```
```javascript
const firstBox = document.querySelector('.box'); // First .box element
const allBoxes = document.querySelectorAll('.box'); // All .box elements
```

---

### **`getElementsByName`**  
Select elements by their `name` attribute (returns a live `NodeList`).  
```html
<input type="checkbox" name="color" value="red">
<input type="checkbox" name="color" value="blue">
```
```javascript
const colorCheckboxes = document.getElementsByName('color');
const firstCheckbox = colorCheckboxes[0];
```

---

## Scope

Here's a list of JavaScript structures that create scopes, along with examples:

---

### **Function Scope**  
Variables declared with `let`/`const` inside a function are scoped to that function (since the function body is a block).
```javascript
function greet() {
  let message = "Hello"; // Scoped to `greet`
  const name = "Alice";    // Also scoped to `greet`
}
greet();
console.log(message); // ❌ ReferenceError
console.log(name);    // ❌ ReferenceError
```

---

### **Block Scope**  
Created by code blocks (`{}` in `if`, `for`, `while`, etc.). Variables declared with `let`/`const` are block-scoped.  
```javascript
if (true) {
  let count = 5;   // Scoped to the block
  const id = "xyz"; 
  var status = "ok"; // ❗ `var` is NOT block-scoped (leaks out)
}
console.log(count); // ❌ ReferenceError
console.log(id);    // ❌ ReferenceError
console.log(status); // ✅ "ok" (var leaks)
```

---

### **Class Body**  
Class declarations create a scope for the class name and static members.  
```javascript
let MyClass = "outer";
class MyClass { // The class name is scoped internally
  static print() {
    console.log(MyClass); // Refers to the class, not the outer variable
  }
}
MyClass.print(); // ✅ Logs the class (not "outer")
```

---

### **Global Scope**  
Variables declared outside all functions/blocks become global.  
```javascript
const globalVar = "I'm global!";
function checkGlobal() {
  console.log(globalVar); // ✅ "I'm global!"
}
checkGlobal();
```

## Event Listeners

Here's a list of ways to assign event listeners to events in JavaScript, including examples:

---

### 1. **`addEventListener` Method**  
The modern/recommended way. Allows multiple listeners for the same event.  
```javascript
const button = document.querySelector('#myButton');

// Add click event listener
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
});

// Add multiple listeners for the same event
button.addEventListener('click', () => console.log('Second handler'));
```

---

### 2. **Inline HTML Event Attributes**  
Directly assign events in HTML (not recommended for complex logic).  
```html
<button onclick="handleClick()">Click Me</button>
```
```javascript
function handleClick() {
  console.log('Inline HTML event');
}
```

---

### 3. **DOM Element Event Properties**  
Assign via event properties like `onclick`, `onmouseover`, etc. (overwrites previous handlers).  
```javascript
const button = document.querySelector('#myButton');

button.onclick = function(event) {
  console.log('Assigned via onclick property');
};

// Overrides the previous handler:
button.onclick = () => console.log('New handler replaces the old one');
```

---

### 4. **Event Delegation**  
Attach a single listener to a parent to handle events from child elements.  
```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```
```javascript
document.getElementById('list').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Clicked on:', event.target.textContent);
  }
});
```

---

### 5. **One-Time Event Listeners**  
Use `{ once: true }` to trigger an event listener only once.  
```javascript
button.addEventListener('click', function() {
  console.log('This runs only once!');
}, { once: true });
```

---

### 6. **`attachEvent` (Legacy Internet Explorer)**  
Deprecated method for older IE versions (pre-IE9).  
```javascript
// Only for IE8 and below:
if (button.attachEvent) {
  button.attachEvent('onclick', function() {
    console.log('Legacy IE method');
  });
}
```

---

### 7. **Using `passive` Events**  
Improve scroll performance with `{ passive: true }` (prevents blocking the main thread).  
```javascript
window.addEventListener('wheel', (event) => {
  console.log('Scrolling');
}, { passive: true });
```

---

### Summary Table
| Method                 | Example                                 | Use Case                                 |
| ---------------------- | --------------------------------------- | ---------------------------------------- |
| `addEventListener`     | `element.addEventListener('click', fn)` | Modern, flexible, multiple listeners     |
| Inline HTML Attributes | `<button onclick="fn()">`               | Quick prototyping (avoid in production)  |
| DOM Event Properties   | `element.onclick = fn`                  | Simple assignments (overwrites)          |
| Event Delegation       | Parent element listener + target check  | Dynamic/efficient child element handling |
| One-Time Listeners     | `{ once: true }`                        | Single-execution events                  |
| Legacy `attachEvent`   | `element.attachEvent('onclick', fn)`    | IE8 compatibility (deprecated)           |
| Passive Events         | `{ passive: true }`                     | Optimize scroll/touch events             |

---

### Key Notes:
- **Prefer `addEventListener`** for better control and compatibility.
- Avoid inline HTML event attributes for maintainability and separation of concerns.
- Use event delegation for dynamically added elements or performance optimization.



Note: Parts of this documnet were drafted using generative AI (DeepSeek R1)

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2025</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---