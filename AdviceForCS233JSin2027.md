<h1>Advice for CS233JS in 2027</h1>

**By Brian Bird, spring 2026**

[TOC]

## Overview

These are notes for whoever teches CS 233JS next year. These are things I would consider changing if I teach the course myself.

I made significant changes to the course this term (spring 2026). The course was mostly unchanged from the course developed by Mari Good that I took over in winter of 2024. My goals were to update the course to use modern JavaScript tools and practices (Vite instead of Webpack, Async/Await instead of .then, etc.). Some of the changes need some more fine-tuning. 

## Labs

### Lab01-Review

This assignment was overly difficult because:

- There were new things being done in the code that students weren't familiar with like the `shuffle` method, 
- It was a much larger app than they were used to working with.
- The lab instructions and lecture notes didn't provide enough guidance for the problem solving students  needed to do.

Recommendations:

- Keep the same basic assignment, but:
  - Simplify some of the code in the example app, the Concentration game, and the apps they are completing, the domino games.
  - Provide more explanation of how the example game works.
  - Choose simpler methods to put // TODO comments in.
  - Provide more guidance on how to do the problem solving.

### Lab02-ES6 Feature

I'll add notes later.

### Lab03-Classes

I'll add notes later.

### Lab04-Node.js

I am using a *ToDo List* app from Mari's lab assignment on Node as an example app. I used an AI coding assistant to refactor it and didin't realize that it had added some more advanced features like callbacks, .map, and .foreach. Next time we should consider:

- Refactoring the example app and starter files to use a simpler architecture that doesn't include callbacks for decoupling the view from the controller. But there are complications:
  - Lab instructions and notes will need to be revised
  - Video recordings will need to be redone.
- Add `.map` and `.foreach` to the week's topic on ES6 features.
