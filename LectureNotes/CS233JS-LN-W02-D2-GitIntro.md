---
title: Git
description: Intro to Git
keywords: Git, GitHub
generator: Typora
author: Brian Bird
---

<h1>Intro to Git</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Table of Contents</h2>

[TOC]

## Git Commands

### `git clone`

**The Starting Point.** Before you can do anything, you need a local copy of the project. This command copies an existing repository from a remote server (like GitHub) onto your computer.

- **Usage:** `git clone <url>`

### `git add`

**The Staging Area.** Once you’ve edited your files, Git needs to know which changes you want to include in your next "snapshot." This command moves changes from your working directory to the **Staging Area**.

- **Usage:** `git add <file-name>` or `git add .` (to add everything).

### `git commit`

**The Snapshot.** This permanently records the changes you "added" in the previous step to your local history. Every commit requires a message explaining what you changed.

- **Usage:** `git commit -m "Brief description of changes"`

### `git push`

**Sharing Your Work.** Your commits are currently only on your machine. To share them with your team or back them up online, you "push" them from your local repository to the remote server.

- **Usage:** `git push origin main`

### `git pull`

**Staying Up to Date.** If you are working in a team, others will be pushing their own changes. This command fetches those changes from the server and merges them into your local files so you aren't working on an outdated version.

- **Usage:** `git pull origin main`

------

### The Workflow at a Glance

| **Command** | **Action**       | **Location Impacted**                   |
| ----------- | ---------------- | --------------------------------------- |
| **Clone**   | Download project | Remote $\rightarrow$ Local              |
| **Add**     | Track changes    | Working Directory $\rightarrow$ Staging |
| **Commit**  | Save snapshot    | Staging $\rightarrow$ Local History     |
| **Push**    | Upload changes   | Local History $\rightarrow$ Remote      |
| **Pull**    | Download updates | Remote $\rightarrow$ Local History      |



## Intro to GitHub

While Git is the tool that tracks your changes locally, GitHub is a cloud-based platform that hosts your Git repositories. It provides a central location for teams to collaborate and back up code.



### Forking an Existing Repository

- Creates a personal copy of someone else's project under your GitHub account.
- Use Case: When you want to contribute to an open-source project or use a template for your own work.

### Creating a Repository from Scratch

- Start a new project from scratch on GitHub.
- Setup: You can initialize it with a `README.md` (to describe the project) and a `.gitignore` (to tell Git which files to ignore, like `node_modules`).

To clone a repository from GitHub using the command line, you are essentially downloading a full copy of the project’s files and its entire version history to your local machine.

### Cloning a Remote Repository

#### How to Get the URL from GitHub

Before running a command, you need the unique address of the repository:

1. Navigate to the main page of the repository on GitHub.
2. Click the green **"<> Code"** button located above the file list.
3. Under the **HTTPS** tab (which is the most common for beginners), click the **copy icon** (two overlapping squares) to copy the URL to your clipboard.

#### Cloning via the Command Line

Once you have the URL, open your terminal or command prompt and follow these steps:

- Use `cd` to move into the folder where you want the project to live.
- Type `git clone` followed by a space and then paste the URL.
  -  Example: `git clone https://github.com/username/repository-name.git`.

After the process completes, Git will have created a new directory named after the repository, linked it to the "origin" server on GitHub, and downloaded all the project data.



*Note: These notes were drafted using Gemini 3.*

------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in spring <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

