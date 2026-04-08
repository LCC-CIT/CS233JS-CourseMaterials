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

## 1. `git clone`

**The Starting Point.** Before you can do anything, you need a local copy of the project. This command copies an existing repository from a remote server (like GitHub) onto your computer.

- **Usage:** `git clone <url>`

## 2. `git add`

**The Staging Area.** Once you’ve edited your files, Git needs to know which changes you want to include in your next "snapshot." This command moves changes from your working directory to the **Staging Area**.

- **Usage:** `git add <file-name>` or `git add .` (to add everything).

## 3. `git commit`

**The Snapshot.** This permanently records the changes you "added" in the previous step to your local history. Every commit requires a message explaining what you changed.

- **Usage:** `git commit -m "Brief description of changes"`

## 4. `git push`

**Sharing Your Work.** Your commits are currently only on your machine. To share them with your team or back them up online, you "push" them from your local repository to the remote server.

- **Usage:** `git push origin main`

## 5. `git pull`

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



*Note: These notes were drafted using Gemini 3.*

------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

