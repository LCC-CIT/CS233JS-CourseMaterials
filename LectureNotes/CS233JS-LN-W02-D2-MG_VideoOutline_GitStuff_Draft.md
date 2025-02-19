---
title: Intro to Bootstrap
description: Quick intro to Bootstrap 
keywords: Bootstrap
generator: Typora
author: Brian Bird
---

<h1>New JS Features in ES6</h1>

**CS233JS Intermediate Programming: JavaScript**

| Topics by Week                                       |                                                     |
| ---------------------------------------------------- | --------------------------------------------------- |
| 1. Intro to Course, Bootstrap and JavaScript Review  | 6. HTML5 Canvas, CSS Flexbox                        |
| 2. <mark>ES6 Classes and Git</mark>                  | 7. AJAX, ES6 promises, fetch API                    |
| 3. More about Classes **<== New topic!**             | 8. Making API calls, graphs and charts, Google maps |
| 4. JS Dev Tools: Node.js, NPM, Webpack, LocalStorage | 9. Term Project                                     |
| 5. Midterm Review and Quiz                           | 10. Review                                          |
| 11. Final Quiz                                       |                                                     |



<h2>Table of Contents</h2>

[TOC]

# Introduction

This week you are refactoring the three web apps from last week to use classes as well as some other "new" (as of 2015) features added in ES6.

# Mari Good's Videos and Examples

These are ES6 fetures Mari covered in her teaching. I've highlighted the things that you will use in your lab assignment

## Objects

All of this was covered in CS 133JS except JSON

- Object literals and object literal syntax
  - Adding properties
  - Accessing properties using [] operator
  - Arrays of objects 
- JSON

## Variable Scope

This was covered in CS 133JS

- Function vs block scope 
- Var, let and const

## Other Stuff

- Arrow functions
- The keyword this
  - The bind operator
- Destructuring
- Template literals
- Classes



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

# Reference



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------