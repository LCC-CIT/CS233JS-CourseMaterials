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
const ctx = canvas.getContext('2d');
ctx.filter = 'grayscale(100%) brightness(1.2)';
ctx.drawImage(image, 0, 0);
```

## Paths and Clipping

### Clipping Shapes

Clipping allows you to define a region of the canvas where drawing is "allowed." Anything drawn outside the clipped region will be hidden (clipped). You define a path and then call `ctx.clip()`.

#### Circular Clipping
Use the `arc` method to create a circle path, then clip.

**Example:**
```javascript
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2); 
ctx.clip();
ctx.drawImage(image, 50, 50, 100, 100); 
```

**Parameters for `arc`:**

`arc(x, y, radius, startAngle, endAngle)`

- `x, y`: The x and y coordinates of the arc's center.
- `radius`: The distance from the center to any point on the arc.
- `startAngle`: The angle at which the arc starts, measured clockwise from the positive x-axis (in radians).
- `endAngle`: The angle at which the arc ends (in radians).

**Parameters for `drawImage`:**

`drawImage(image, x, y, width, height)`

- `image`: The element (image, video, or another canvas) to draw.
- `x, y`: The x and y coordinates in the destination canvas to place the top left of the image.
- `width, height`: The width and height to draw the image in the destination canvas (scales the image).

#### Oval (Ellipse) Clipping
Use the `ellipse` method to create an oval path.

**Example:**
```javascript
ctx.beginPath();
ctx.ellipse(100, 100, 80, 50, 0, 0, Math.PI * 2);
ctx.clip();
```

**Parameters for `ellipse`:**

`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)`

- `x, y`: The  coordinates of the ellipse's center.
- `radiusX`: The ellipse's major-axis radius (width).
- `radiusY`: The ellipse's minor-axis radius (height).
- `rotation`: The rotation of the ellipse, expressed in radians.
- `startAngle`: The angle at which the ellipse starts (in radians).
- `endAngle`: The angle at which the ellipse ends (in radians).

#### Rounded Rectangles
Use the `roundRect` method to create a rectangle with rounded corners.

**Example:**
```javascript
ctx.beginPath();
ctx.roundRect(10, 10, 180, 130, 20); 
ctx.clip();
```

**Parameters for `roundRect`:**

`roundRect(x, y, width, height, radii)`

- `x, y`: The coordinates of the rectangle's upper-left corner.
- `width, height`: The width and height of the rectangle.
- `radii`: A number or list of numbers specifying the radii of the circular arcs used for the corners.

## Transformations

### Scaling and Translating

Transformations allow you to move, rotate, or scale the entire coordinate system of the canvas. This is essential for features like "drag and zoom."

#### `translate` (Dragging)
Moves the origin (0,0) of the canvas to a new location.

**Example:**
```javascript
ctx.translate(offsetX, offsetY); 
```

**Parameters for `translate`:**

- `x`: Distance to move in the horizontal direction.
- `y`: Distance to move in the vertical direction.

#### `scale` (Zooming)
Changes the size of the coordinate system.

**Example:**
```javascript
ctx.scale(scaleX, scaleY); 
```

**Parameters for `scale`:**

The scaling factors below are positive float numbers.

- `scaleX`: Scaling factor in the horizontal direction.
- `scaleY`: Scaling factor in the vertical direction.

## Interactivity

### Interactive Stickers and Objects

To make objects "interactive" (like stickers you can drag), you need to keep track of their coordinates in your JavaScript code and redraw the canvas whenever they move.

**Simple Logic Example:**
```javascript
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(stickerImage, stickerX, stickerY);
}
```

**Parameters for `clearRect`:**

`clearRect(x, y, width, height)`

- `x, y`: The coordinates of the top-left corner of the rectangle to clear.
- `width, height`: The width and height of the rectangle to clear.

### Freestyle Drawing

Freestyle drawing uses mouse events to create a series of small line segments.

**Example:**
```javascript
// Inside a mousemove event handler:
ctx.lineTo(event.offsetX, event.offsetY);
ctx.stroke();

// Inside a mousedown event handler:
ctx.beginPath();
ctx.moveTo(event.offsetX, event.offsetY);
```

**Parameters for `lineTo`:**
- `x`: The x-coordinate of the end of the line.
- `y`: The y-coordinate of the end of the line.

**Parameters for `moveTo`:**
- `x`: The x-coordinate of the point to move to.
- `y`: The y-coordinate of the point to move to.



## References

[Canvas JavaScript API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)&mdash;MDN

[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)&mdash;MDN

[Canvas 2D Rendering Context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)&mdash;MDN



***Note: This document was drafted using Gemini CLI and Gemini 3.0***

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2026, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
