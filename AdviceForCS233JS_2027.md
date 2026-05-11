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

- I had AI add comments to all the functions and it used JS Doc comments that include types. I actually like this, but hadn't taught the students about it.
  - Consider either removing the JS Doc comments or teaching about this.
- The Boneyard Bluff domino game needs to be refactored to make it more winnable:
  - The target needs to keep decreasing as wins are made (the version in my solutions repo does this)
  - The boneyard needs to be made up of dominos that are not too low in value.

### Lab03-Classes

I'll add notes later.

### Lab04-Node.js

I am using a *ToDo List* app from Mari's lab assignment on Node as an example app. I used an AI coding assistant to refactor it and didin't realize that it had added some more advanced features like callbacks, .map, and .foreach. Next time we should consider:

- Use a NPM package that is simpler to understand than `lit-html`. Maybe use `lodash` instead.

- Refactoring the example app and starter files to use a simpler architecture that doesn't include callbacks for decoupling the view from the controller. But there are complications:
  - Lab instructions and notes will need to be revised
  - Video recordings will need to be redone.
  
- Add `.map` and `.foreach` to the week's topic on ES6 features.

- Vite doesn't need to use a source-map file with the dev server, it only is needed if you want to debug files that are deployed to a web server.

- The image files need special attention to be included in the dist folder. 

  **`bookmark.png` is NOT in the dist folder** — and that's a bug.

  **Why `background.jpeg` gets bundled but `bookmark.png` doesn't:**

  - `background.jpeg` is referenced in [styles.css:5](vscode-webview://19uie7hr89j4f8rn69h8vg707sikn057cau7883savovu5mgromt/styles.css#L5) as `url('./images/background.jpeg')` inside a CSS file that Vite processes. Vite parses CSS `url()` references and copies those assets into `dist/assets/` (renamed with a hash).

  - `bookmark.png` is referenced in [src/view.js:59](vscode-webview://19uie7hr89j4f8rn69h8vg707sikn057cau7883savovu5mgromt/src/view.js#L59) as a plain string inside a JavaScript template literal:

    ```js
    style="background-image:url('./images/bookmark.png')"
    ```

    Vite has no way to see this as an asset reference — it's just a string. So it never gets copied to `dist/`, and the path `./images/bookmark.png` will be a broken link in the built app.

  **The fix** is to import the image as an ES module at the top of `view.js` so Vite tracks it:

  ```js
  import bookmarkIcon from '../images/bookmark.png';
  // then use: style="background-image:url('${bookmarkIcon}')"
  ```

  This tells Vite to include the image and gives you the correct hashed path in the bundle.

  index.html

  Would another alternative be to add directions to copy the image to a vite.config.js file? Which would be better?

  Yes, that's a valid alternative — Vite has a built-in `public/` directory concept. You'd move `bookmark.png` into a `public/images/` folder and reference it with an absolute path (`/images/bookmark.png`). Files in `public/` are copied to `dist/` as-is, no config needed.

  **ES module import is better here**, for two reasons:

  1. **Cache busting** — the import approach gives the file a hashed name (`bookmark-Xk3j9abc.png`) in dist, so browsers automatically pick up updates. The `public/` approach copies it with the original filename, so browsers may serve a stale cached version after a redeploy.
  2. **No extra work or plugin needed** — there's no `vite.config.js` at all in this project. Using `public/` is zero-config for static assets, but `vite-plugin-static-copy` (the config-based copy approach you're likely thinking of) would require creating a config file and installing a plugin just to copy one image.

  The `public/` folder approach is the right call for truly static assets that need a stable, predictable URL — favicons, `robots.txt`, OpenGraph images linked from external sites. A UI icon that's only used internally is exactly what the import approach is designed for.
