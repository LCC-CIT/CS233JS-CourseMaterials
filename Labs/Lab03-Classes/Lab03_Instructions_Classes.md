<h1>Lab 3 Instructions: ES 6 Classes and Git</h1>

[TOC]

## Objectives

The objectives of this lab are:

1. Practice using Git and GitHub.
2. Learn to write ES6 style classes and create objects from them.



## Part 1: GitHub and Domino Classes

### Set Up a GitHub Account

If you don’t already have a GitHub account, create one now. As a student, you can get a free pro account plus other benefits by joining [GitHub Education](https://github.com/education).

If you haven’t already installed Git on your computer, [download it](https://git-scm.com/downloads) and install it now.

### Create a New GitHub Repository for Lab 3

1. Log In: Sign in to your GitHub account at [github.com](https://github.com/).
2. Start New Repository: Click the "+" icon in the top-right corner of any page and select "New repository".
3. Name the Project: Enter a short, memorable name for your repository in the Repository name field.
4. Set Visibility: Choose between Public (anyone can see it) or Private (only you and invited collaborators can see it).
5. Initialize (Optional): Check the boxes to add a README.md file for a project description or a .gitignore file to specify which files Git should ignore.
6. Finalize: Click the "Create repository" button.

### Clone the Repository 

*Clone* the repository to your local computer:

1. Click on the green "Code" button.
2. Copy the HTTPS address for cloning your repository. (This address ends in `.git`)
3. On your computer, in a terminal app (or GitBash, PowerShell, etc.). At the folder where you want to clone the repository, type:  
   `git clone addressofyourrepository` 
   (Using the address you copied above.)
4. 


### Refactor your Domino App

1. Add the latest version of your domino app to the local repository.
2. Modify your domino app to use classes.

### Commit the Changes and Push them to GitHub

1. Stage Your Changes: Use `git add` to move your edited files into the Staging Area so Git knows which changes to include in your next snapshot.
   - Usage: `git add <file-name>` or `git add .` to stage all changes in the directory.
2. Commit the revised code: Use `git commit` to permanently record those staged changes to your Local History.
   - Usage: `git commit -m "Your descriptive message"`.
   - Note: Every commit requires a message explaining the update.
3. Push to the Remote: Use `git push` to upload your local commits to the Remote Server (GitHub).
   - Usage: `git push origin main`, or simply `git push` to push back to the default origin.
   - Impact: This moves your work from Local repository$\rightarrow$ Remote so others can see it.

After pushing, check your files on GitHub to make sure everything is there.  
You can also check the status of your local repository with the command:
 `git status`



## Part 2: A Dice Game with Classes

Your instructor has provided you with a simplified version of the dice game "Ship, Captian, Crew". The source code can be downloaded here



*Note, some parts of these instructions were drafted using Gemini 3.*

----

Written by Brian Bird, spring  <time>2026</time>.

---

