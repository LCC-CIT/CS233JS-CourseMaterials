---
title: More HTML Canvas Features
description: Advanced canvas techniques including filters, clipping, transformations, and interactivity.
keywords: Canvas Filters, Clipping, Transformations, scale, translate, Mouse Events
generator: Typora
author: Brian Bird
---

<h1>More HTML Canvas Techniques</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Canvas Filters

### The `filter` Property

The `filter` property of the canvas context allows you to apply graphical effects like blurring or color shifting to everything drawn on the canvas. It works similarly to the CSS `filter` property.

**Example:**
```javascript
const context = canvas.getContext('2d');
context.filter = 'grayscale(100%) brightness(1.2)';
context.drawImage(image, 0, 0);
```

## Paths and Clipping

### Clipping Shapes

Clipping allows you to define a region of the canvas where drawing is "allowed." Anything drawn outside the clipped region will be hidden (clipped). You define a path and then call `context.clip()`.

#### Circular Clipping
Use the `arc` method to create a circle path, then clip.

**Example:**
```javascript
context.beginPath();
context.arc(100, 100, 50, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
context.clip();
context.drawImage(image, 50, 50, 100, 100); // Image will appear inside the circle
```

#### Oval (Ellipse) Clipping
Use the `ellipse` method to create an oval path.

**Example:**
```javascript
context.beginPath();
context.ellipse(100, 100, 80, 50, 0, 0, Math.PI * 2); // x, y, radiusX, radiusY, rotation...
context.clip();
context.drawImage(image, 20, 50, 160, 100);
```

#### Rounded Rectangles
Use the `roundRect` method to create a rectangle with rounded corners.

**Example:**
```javascript
context.beginPath();
context.roundRect(10, 10, 180, 130, 20); // x, y, width, height, radius
context.clip();
context.drawImage(image, 10, 10, 180, 130);
```

## Transformations

### Scaling and Translating

Transformations allow you to move, rotate, or scale the entire coordinate system of the canvas. This is essential for features like "drag and zoom."

#### `translate` (Dragging)
Moves the origin (0,0) of the canvas to a new location.

**Example:**
```javascript
context.translate(offsetX, offsetY); // Move the "paper" under the pen
context.drawImage(image, 0, 0);
```

#### `scale` (Zooming)
Changes the size of the coordinate system.

**Example:**
```javascript
context.scale(2.0, 2.0); // Everything drawn after this will be twice as big
context.drawImage(image, 0, 0);
```

## Interactivity

### Interactive Stickers and Objects

To make objects "interactive" (like stickers you can drag), you need to keep track of their coordinates in your JavaScript code and redraw the canvas whenever they move.

**Simple Logic Example:**
```javascript
let stickerX = 100;
let stickerY = 100;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(stickerImage, stickerX, stickerY);
}

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        stickerX = event.offsetX;
        stickerY = event.offsetY;
        draw();
    }
});
```

### Freestyle Drawing

Freestyle drawing uses mouse events to create a series of small line segments.

**Example:**
```javascript
canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    }
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
});
```



## References

[Canvas JavaScript API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)&mdash;MDN

[CanvasRenderingContext2D: filter property](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter)&mdash;MDN



***Note: This document was drafted using Gemini CLI and Gemini 3.0***

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2026, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
