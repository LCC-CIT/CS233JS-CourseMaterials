---
title: Style Standards
description: JavaScript coding style and best practices for CS 233JS
keywords: style, best practices
material: Coding standards
generator: Typora
author: Brian Bird

---

<h1>JavaScript Coding Conventions</h1>

**For CS 233JS, Intermediate JavaScript Programming**

<h2>Table of Contents</h2>

[TOC]

## Style Conventions

There are a few "best practices" mixed in with these style conventions where they are relevant.

- Indentation: use standard indentation.

- Variables

  - Names should be descriptive.
  - Names should use camelCase.
  - Should be declared with `let`.

- Constants

  - Names should be descriptive.
  - Named constants should be used instead of repeated literal strings or numbers.
    - These constant names should be in ALL_CAPS.
    - When constants are used for arrays or objects they should be in camel case.

- Functions

  - Names should be descriptive and in camelCase.

  - Should have at most one return statement.

  - Should have a single purpose.

- Classes

  - Names should be in PascalCase (aka TitleCase).
  - Instance variables should be private.
  - Getters and Setters should be used to access instance variables in objects created from the class.

  

## Best Practices

- Use strict mode (`"use strict";`).

- Old code: any unused code should be removed rather than just being commented out.

- Comments: explanatory comments should be included for all functions and blocks of code whre their purpose isn't obvious. Comments should explain <u>why</u>, not <u>what</u> is being done.

- Code should be DRY&mdash;Don't Repeat Yourself.

  (No duplicated blocks of code).

- Event handlers should be assigned to HTML elements in JavaScript rather than in an an HTML attribute.

- Code that interacts with a web page should be separated from code that does logical processing. 
  It should be in a separate module (file), or at least in separate functions.

- JavaScript, CSS and HTML should all be in separate files.

- When arrays or objects are created, they should be constants.

- Use `===` whenever possible since `==` does *type coercion* which can lead to unexpected results. 

-  Always handle errors in promises and callbacks.

- Minimize the use of global variables. They can cause conflicts in large codebases.

  

## References

### Widely Recognized Style Guides

These coding standards were developed by specific companies but have been widely adopted by developers everywhere.

[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)&mdash;Google, 2025

- The source for all Google style guides is in this [GitHub repository](https://github.com/google/styleguide).  
- There is a note at the top of the page saying this guide is no longer being updated and that you should see the Typescript guide instead. Which of course would only apply if you have switched from JavaScript to Typescript&mdash;which apparently devs at Google think you should do!

[Airbnb JavaScriptStyle Guide](https://javascript.airbnb.tech/)

This is the default style and best practices guide for the widely used [ESLint](https://eslint.org/) JavaScript code checker.



### More Style Guides

[JavaScript guidelines](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/JavaScript)&mdash;MDN

[JavaScript Style Guide](https://www.w3schools.com/js/js_conventions.asp)&mdash;W3Schools

[JavaScript Best Practices](https://www.w3schools.com/js/js_best_practices.asp)&mdash;W3Schools

[Code Quality](https://javascript.info/code-quality)&mdash;The Modern JavaScript Tutorial

[javaScript Best Practices](https://blog.jetbrains.com/webstorm/2024/10/javascript-best-practices-2024/)&mdash;JetBrains Blog, Webstorm, 2024





------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Beginning JavaScript course materials by [Brian Bird](https://profbird.dev), written 2020, revised <time>2026</time> are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 
