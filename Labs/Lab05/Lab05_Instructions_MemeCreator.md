<h1>Lab 5: Meme Creator</h1>

<h2>Table of Contents</h2>

[TOC]

# Objectives

The objective of this lab is to continue giving you more practice with JS dev tools and learn more about Webpack.  You will also get practice with CSS Flexbox (covered in CIS 195) and have your first experience with the HTML5 Canvas.  

# Instructions

Complete the Meme Creator web app:

- Accept the invitation to the GitHub Classroom repository containing the starter files. 
  **Important**: Do all your work in the Classroom repository working folder, don't make a different repository.

- Complete the Meme Creator application described in the screencasts and comments in the starter files.
  - Part 6 of the comments describes possible added functionality. Choose two features to add:
    - Allow the user to add text to the top of the meme
    - Allow the user to pick a font
    - Allow the user to pick a font color
    - Save the meme to local storage so that the last meme loads when the page loads
    -  Or something of your choice, but get approval from your instructor before implementing it.

  - For each of the 2 additional features:
    - Add html to the web page for the user to interact with.
    - Change the JS class to add event handlers to your new UI elements
    - Change the createMeme method to add your features to the canvas.

- Use Node, NPM, Webpack and Babel to create a production version of the  application "transpiled" to a version of JavaScript (ES5) that is supported by all browsers.

# Notes

## Dependencies

This project has the following dependencies:

- [Bootstrap](https://getbootstrap.com) CSS and JS bundles.
- [Bootstrap Icons](https://icons.getbootstrap.com/)  
  The [trash](https://icons.getbootstrap.com/icons/trash/) font icon is used in this projct.

## The Default Image

There is an `<img>` element in the HTML file that has the attribute ` style="display:none"` which means it isn't displayed. This image element is just used as a means to load the default image so it can be rendered in the canvas element.

If you add a feature to use the last image the user uploaded as the new default image; by saving that image in local storage; you won't be able to assign that image to the `src` attribute of the `<img>` element and then imediately call `createMeme`, instead, you will need to set the `onload` event of the `<img>` element to call `createMeme` after the image has been loaded. Read about the [onload event on W3Schools](https://www.w3schools.com/tags/att_onload.asp).

## Resizing the Image

Here is an alternative way to resize images that you upload. Instead of using the `resizeCanvas` method in Mari's starting code, you can modify the `createMeme` method by replacing this code:

```javascript
/* Draw the image--Mari's code
this.$canvas.height = this.image.height;
this.$canvas.width = this.image.width;
this.resizeCanvas(this.image.height, this.image.width);
this.$context.drawImage(this.image, 0, 0);
*/
```

with this code which will resize the image to fit the canvas:

```javascript
// Draw the image--Brian's code
// Clear the previous image from the page
this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
// Calculate a canvas height to fit the aspect ratio of the image
const scaleFactor = this.$canvas.width / this.$image.width;
this.$canvas.height = this.$image.height * scaleFactor;
// Draw the image in the top left corner. Set height and width to that of the canvas.
this.$context.drawImage(this.$image, 0, 0, this.$canvas.width, this.$canvas.height);
```



# Submission

## Beta Version and Code Review

- Share your repository with your lab partner
  - When your code is 75% complete, add your lab partner as a collaborator on your GitHub repository.
  - Let your lab partner know you are ready for a code review by posting your lab partner team's Discord channel.
  - After your lab partner has made you a collaborator on their repository, do a code review for them using the [code review form](Lab05_CodeReviewForm.docx) provided.
  - Give your lab partner a copy of the code review by posting in your team's Discord channel.
- Submit your code reivew to Moodle
  - Submit a copy of the code review you did to the Moodle Code Review assignment.

## Production Version

- Publish to the CIT web server  
  - Upload your completed web apps to [citstudent.lanecc.edu](http://citstudent.lanecc.edu).  Test the app on the web server by opening it in a browser.  

- Submit the following to Moodle:

  - Upload the code review from your lab partner: 
    - Fill out the "Prod" column, entering yes for anything you fixed or completed.
    - Add screen shots for the web app showing[^1]:
      - Your folders and files in the VS Code file explorer and the terminal showing the webpack dev server running.
      - The app running on the Webpack dev server with the URL visible. 
  
  
    - Put the citstudent URLs for the web app in the online text.
  

## Assessment

[Grading Rubric for this lab](CS233JS_Lab05_Rubric.htm)




[^1]: I'm asking for screen shots for this lab so that you can show me that you did use Node.js and the development tools introduced this week.

---

Adapted by Brian Bird, spring 2024 from lab instructions written by Mari Good for winter 2024. Revised by Brian Bird winter 2025.