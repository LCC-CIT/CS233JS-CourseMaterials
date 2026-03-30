---
title: Lab 1, Part 1
description: Review of beginning JavaScript
keywords: review, beginning programming, JavaScript
material: Lab Instructions
generator: MarkText
author: Brian Bird
---
<h1>Lab 1: JavaScript Review</h1>

**CS 233JS, Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## Objective

The objective of this lab is to review what you learned in CS 133JS, Beginning JavaScript.

## Part 1: Exercises

Complete the solutions to the programming challenges in the [Lab 1 JavaScript Review Exercises](https://lcc-cit.github.io/CS233JS-CourseMaterials/Labs/Lab01-Review/CS233JS_Lab01_Part1.html) HTML and JavaScript files. Use a code editor (such as Visual Studio Code) to write and test your code.

## Part 2: Web App

You wil do project A, B or C depending on the lab assignment version group you are in. These web apps can be implemented using the same overall program design as the example Concentration game web app.

### Project A: "Double Trouble" Domino Game

**The Game:**
A board of 15 dominos is shown. The goal is to clear the board. Players can click *one* "Double" domino (a domino where both sides are the same, like `[4|4]`) to remove it instantly, OR they can click *two* standard dominos whose total pip count adds up to 12. 
**How it uses the architecture:**

- **State (`gameLogic`):** Requires logic to determine if a single click resolves a turn, or if it must wait for a second click. 
- **UI (`ui`):** Identical abstraction—shows faces, hides them, disables clicks.
- **Flow:** Click -> if it's a Double, `removeCard` immediately and add to score. If it's a normal domino, set `firstPick`. On second click, sum all four pips across the two dominos. If sum === 12, remove both. If not, `setTimeout` for 2 seconds to show they don't match, then deselect.

### Project B: "Domino Drop" Game

**The Game:**
A grid of face-down dominos is presented, plus one "Target" domino face-up at the top. The player clicks a face-down domino to reveal it. To remove it, its total pip count must be *strictly greater* than the Target domino. If it is, the clicked domino is removed, and the Target domino is updated to become the one they just clicked. If it's lower, the player loses a "life", the domino is flipped back face down, and the Target stays the same. 
**How it uses the architecture:**

- **State (`gameLogic`):** Tracks `currentTargetIndex` and `currentPick`. `tries` becomes `lives` (starting at 3 and counting down).
- **UI (`ui`):** Needs a special designated div for the Target, and the standard grid for the remaining dominos. 
- **Flow:** Click -> reveal domino -> calculate sum of pips vs Target pips. If higher -> `setTimeout` to let player see it, then remove it from grid, update Target UI to match it, update Target logic. If lower -> `setTimeout` to let player see failure, then flip back down and subtract a life.

### Project C: "Boneyard Bluff" Domino Game

**The Game:**
A single domino is dealt face up. Next to it is a face-down domino. The player must guess if the *total pip count* of the face-down domino is "Higher" or "Lower" than the face-up domino. They click a "High" or "Low" button. The face-down domino is revealed. If they are correct, they get a point, the old face-up domino is discarded, the revealed one slides over to become the new face-up domino, and a new face-down one is drawn from the "Boneyard" (deck). The goal is a streak of 10 correct guesses.

**How it uses the architecture:**

- **State (`gameLogic`):** Instead of a 20-item grid, the state holds the full shuffled boneyard (e.g., 28 dominos). It tracks `currentDomino` and `nextDomino` (popping them off the boneyard array). It needs an `evaluateGuess(isHighGuess)` function.
- **UI (`ui`):** Very focused: `showLeftDomino(filename)`, `showRightDominoBack()`, `showRightDominoFace(filename)`, and button click bindings.
- **Flow:** Click "High" button -> `gameLogic.evaluateGuess('high')`. Tell UI to reveal the right domino. `setTimeout` for 2 seconds. Update Score. Shift right domino data to left domino data in logic. Tell UI to update left domino image and show a blank back for the right domino. Wait for next click.

## Submission

### Beta Version and Code Review

- Share your part 2 beta version with a lab partner.
  - Your code  should be at least 75% complete and working.
  - Share the code in your lab partner channel on Discord.
  - On Moodle, submit a report that you shared your beta version.
- Do a code reveiw for your lab partner.
  -  Post the completed review form on Discord.
  - Submit your code reivew to Moodle.

- Revise your code and improve it based in part on feedback from your lab partner.

### Production Version

- Upload your completed part 2 web app to [citstudent.lanecc.edu](http://citstudent.lanecc.edu). Test the app on the web server to verify that it still works there.

  - If you need to refresh your memory on how to use FileZilla, here are the instructions from the web authoring class: [How to upload web sites to citstudent](https://lcc-cit.github.io/CIS195-CourseMaterials/Lessons/UploadingWebSites.html).

- Submit the following to Moodle:

  - Part 1
    - upload a zip file containing the .html and .js files with your completed exercise solutions.

  - Part 2:
    - Upload the code reivew from your lab partner with the "production" column filled with out by you.
    - Upload a zip file containing the source code.
    - Put the citstudent URL for your web app in the online text.




## Old Submission

## Code Review

Do a review of your own code for the part 2 web app using the code review form.

## Submission

### Publish to the CIT web server

Upload your completed web app to [citstudent.lanecc.edu](http://citstudent.lanecc.edu). Test the app on the web server to verify that it still works there.

- If you need to refresh your memory on how to use FileZilla, here are the instructions from the web authoring class: [How to upload web sites to citstudent](https://lcc-cit.github.io/CIS195-CourseMaterials/Lessons/UploadingWebSites.html).

### Upload to Moodle

#### Lab 1 Code review assignment:

- Upload your completed code review form. 

#### Lab 1 Production Version assignment:

- Part 1
  - Upload a zip file containing the .html and .js file with your completed exercise solutions.

- Part 2
  - Upload a screen-shot of your game running in a browser.
  - Upload a zip file containing the source code.
  - Put the citstudent URL for your web app in the online text.


## Assessment

Here is a link to [the grading rubric](https://lcc-cit.github.io/CS233JS-CourseMaterials/Labs/Lab01/CS233JS_Lab01_Rubric.htm).

---

Written by Brian Bird spring  2026.

---
