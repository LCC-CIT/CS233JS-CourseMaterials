<h1>Lab 3 – Dice Game</h1

<h4>CS233JS, Intermediate Programming: JavaScript</h4>

<h2>Contents</h2>

[TOC]

# Objectives

Learn how to design and build a web app that employs *separation of concerns* by separating i/o code from the processing code and by using classes and *encapsulation*.

# Instructions

## Clone the GitHub Classroom Repo

- Accept the invitation to the GitHub Classroom repository containing the starter files.
- Clone the Lab 3 repository from the GitHub classroom invitation. It won't have much in it, just the images for the six sides of a die (and just for those doing the 10,000 game, the scoring method). You will write the code (and use some from my examples).
- **Important**: Do all your work in the Classroom repository working folder, don't make a different repository.
-  Use Git and GitHub to manage your source code.

## Write a Dice Game Web App

Using the [Bunco](https://github.com/LCC-CIT/CS233JS-BuncoGame) and [Going to Boston](https://github.com/LCC-CIT/CS233JS-Going2Boston) dice games as examples, write a dice game of your own. Your dice game should have the following files:

- index.html&mdash;the web page that the players interact with. The dice will be shown on this page using images from an images folder.
- index.js&mdash;will contain all the i/o code which will primarily be event handler funcitons.
- game.js&mdash;will contain a class named `Game` with the game-play logic for the game.
- player.js&mdash;will contain a class named `Player` which holds the instance variables and methods related to a player.
- Die.js&mdash;will contain a class named `Die` which holds the instace variables and methods related to the die.

You will need to make all instance variables private and use *getters* and *setters* for any instance variables that need to be accessed from outside the class.

The best approach is to using the examples is to <u>not</u> copy an entire example game into your project. It usually works better to create the files you need and then copy over just the methods you know you can re-use from the example. 

Use the appropriate version below depending on which lab version group you are in.

### Version A

Design and code the dice game of 10,000 (aka Farkle). Here are [instructions for playing the game](https://www.dice-play.com/Games/TenThousand.htm).

Some of the things that will be different from the Bunco game are:

- 6 dice instead of 3.

- Different rules for scoring.

- Different socres to track.

- Different rules for determining when a turn is over.

  

### Version B

Design and code the dice game of ship, captain, crew. Here are [instructions for playing the game](https://en.wikipedia.org/wiki/Ship,_captain,_and_crew).

- 5 dice instead of 3.

- Different rules for scoring.

- Different socres to track.

- Different rules for determining when a turn is over.

  

### Version C

Design and code the dice game of sevens. Here are the [instructions for playing the game](https://www.dicegamedepot.com/sevens-dice-game-rules/).

Some of the things that will be different from the Bunco game are:

- 6 dice instead of 3.

- Different rules for scoring.

- Different socres to track.

- Different rules for determining when a turn is over.

  

# Review and Submission

## Beta Version and Code Review

- When your code is at least 75% done, [add your lab partner as a collaborator to your GitHub repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository) and make a post in the Beta Version Forum with a link to your repository and a message to your lab partner letting them know you are ready for a code review.. You won't able to view your lab partner's post until you have posted in the forum yourself.  

  This is what 75% done means:  
  All the code is there and 75% of it is working. There could still be a  few errors that show up in the console and a few things that don't work yet.

- Do a code review for your lab partner using the code reveiw form for this lab and post the it in the Beta Version Forum for your lab partner as well as uploading it to the Moodle Code Review assignment. Use the provided .docx file for the code review (not a pdf) so your lab partner can edit the  "prod." column.

## Production Version

- Publish your web app to the [citstudent web server](https://citstudent.lanecc.edu/).

- Submit your lab to the Moodle Production Version assignemnt.

  - In the online text box, paste a link to your web app running on citstudent.

  - Upload the code review your lab partner did for you with the "prod." column completed by you.

# Assessment

Here is a link to [the grading rubric](https://lcc-cit.github.io/CS233JS-CourseMaterials/Labs/Lab03/CS233JS_Lab03_Rubric.htm).



------

Written by Brian Bird, Lane Community College, spring 2024, revised <time>2025</time>

------

