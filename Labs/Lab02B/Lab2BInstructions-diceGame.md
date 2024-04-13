<h1>Lab 2B – Dice Game</h1>

<h4>CS233JS, Intermediate Programming: JavaScript</h4>

<h2>Contents</h2>

[TOC]

# Objectives

Learn how to design and build a web app that employs *separation of concerns* by separating i/o code from the processing code and by using classes and *encapsulation*.

# Instructions

## Clone the GitHub Classroom Repo

Clone the Lab 2B repository from the GitHub classroom invitation. It won't have anything in it. You will write all the code.

## Write a Dice Game Web App

Using the Bunco dice game as an example, write a dice game of your own. Your dice game should have these files:

- index.html&mdash;the web page that the players interact with. The dice will be shown on this page using images from an images folder.
- index.js&mdash;will contain all the i/o code which will primarily be event handler funcitons.
- game.js&mdash;will contain a class named `Game` with the game-play logic for the game.
- player.js&mdash;will contain a class named `Player` which holds the instance variables and methods related to a player.
- Die.js&mdash;will contain a class named `Die` which holds the instace variables and methods related to the die.

You will need to make all instance variables private and use *getters* and *setters* for any instance variables that need to be accessed from outside the class.

Please do not copy and then edit my whole Bunco game to make your game. I would like you to write yours from scratch. You can however use methods from my code and revise them as needed, but start by making your own files and skeletal code.

Do the appropriate version depending on which lab version group you are in.

### Version A

Design and code the dice game of 10,000. Here are [instructions for playing the game](https://www.dice-play.com/Games/TenThousand.htm).

### Version B

Design and code the dice game of ship, captain, crew. Here are [instructions for playing the game](https://en.wikipedia.org/wiki/Ship,_captain,_and_crew).

### Version C

Design and code the dice game of sevens. Here are the [instructions for playing the game](https://www.dicegamedepot.com/sevens-dice-game-rules/).

# Review and Submission

## Beta Version and Code Review

- When your code is at least 75% done for all three web apps add your lab partner as a collaborator to your GitHub repository and post a meesge in the Beta Version Forum with a link to your repository. You won't able to view your lab partner's post until you have posted in the forum.  

  This is what 75% done means: all the code is there and 75% of it is working. There could still be a  few errors that show up in the console and a few things that don't work  yet.

- Do a code review for your lab partner and post the code review in the beta version forum as well as uploading it to the code review Moodle assignment. Use a .docx file for the code review form (not a pdf) so your lab partner can edit the  "prod." column.

## Production Version

- Upload your web app to citstudent.

- Submit your lab to the Moodle assignemnt

  - In the "online text" for the Moodle assignment:

    - Paste a link to your GitHub repository.

    - Paste a link to your web app running on citstudent.

  - Upload the code review your lab partner did for you with the "prod." column completed by you.



------

Written by Brian Bird, Lane Community College, spring 2024

------

