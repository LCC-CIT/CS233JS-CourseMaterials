---
title: Bundlers + Vite
description: Module bundlers and Vite in the JavaScript development eco-system.
keywords: Vite, bundlers, NPM
generator: Typora
author: Brian Bird
---

<h1>JavaScript Bundlers and Vite</h1>

**CS233JS Intermediate Programming: JavaScript**



<h2>Table of Contents</h2>

[TOC]

## Module Bundlers

A *module bundler* is a tool that takes all the separate files that make up a web application — JavaScript modules, CSS stylesheets, images, fonts, and other assets — and combines ("bundles") them into one or a small number of optimized output files that a browser can efficiently load.

### Why Bundlers Are Needed

Modern JavaScript applications are typically written as many small, focused modules that import from one another. Browsers need to fetch every individual file over the network, and historically they were not efficient at loading dozens or hundreds of small files (due to the overhead of multiple HTTP requests). Bundlers solve this by:

- **Combining files** — merging many source files into fewer output files, reducing the number of network requests.
- **Resolving dependencies** — automatically following `import`/`require` statements to pull in everything the app needs.
- **Optimizing assets** — minifying (removing whitespace and shortening variable names) JavaScript and CSS to reduce file sizes.
- **Transpiling modern code** — converting cutting-edge JavaScript syntax into older syntax that a wider range of browsers can understand.

### How Bundlers Replace Older Approaches

Before bundlers, developers had to manage dependencies manually. The older approach typically involved:

- Adding multiple `<script>` tags to HTML, one for each JavaScript file or library, and carefully ordering them so each script loaded before the code that depended on it.
- Downloading third-party libraries (like jQuery or Bootstrap) and storing copies of them in the project folder, then updating them by hand.
- Concatenating and minifying files manually (or with ad-hoc shell scripts) before deploying.

Bundlers automate all of this. You simply `import` what you need in your code, run the bundler, and it produces a deployment-ready output with everything included and optimized — no manual `<script>` tag management or library copying required.

## Vite

Vite (pronounced "veet", French for *fast*) is a modern front-end build tool and development server. Unlike older bundlers that must process your entire project upfront, Vite serves source files to the browser during development using native ES modules, so it only processes the files the browser actually requests — making startup nearly instant. For production, it bundles everything into optimized static files that browsers can load efficiently.

### Installing Vite

You install Vite using NPM:

```bash
npm install vite --save-dev
```

The flag `--save-dev` means that Vite will be recorded in the `package.json` file under the `devDependencies` section, since it is a tool used during development rather than a package shipped with your app.

### Vite Dev Server

Vite includes a built-in development server that "watches" your source files for changes and instantly reflects them in the browser without a full page reload — a feature called *Hot Module Replacement (HMR)*. This makes for a very fast development experience.

The `package.json` file in the starter files for your project includes a script for running the Vite dev server. You run it by typing this on the command line:

```bash
npm run dev
```

Node.js is required to run Vite.

### Vite and package.json

#### devDependencies section

Each Node project has a package.json file. One of the things it contains is a list of all the node modules the project needs, aka the project's *dependencies*. 

```json
"devDependencies": {
    "vite": "^5.0.0"
  }
```

#### scripts section

 The scripts section of package.json allows you to create "macros" that run command line tools for you.

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

To run a script type `npm run scriptName` on the command line. For example, to start the development server:

```bash
npm run dev
```

Or to build a production-ready bundle:

```bash
npm run build
```

### Vite Configuration File

`vite.config.js` is an optional file at the project root that exports a configuration object. You use it when you need to change dev-server behavior, build output, path aliases, or add *plugins* (small extensions that hook into Vite’s pipeline). 

Below, `resolve.alias` maps `@` to your `src` folder so imports like `import { utils } from '@/utils.js'` stay short and readable; `server.open` tells Vite to open the browser when you start the dev server; and `build.sourcemap` controls whether Vite *emits source maps* for the production build. None of these require installing an extra plugin — they are ordinary config options.

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
  build: {
    sourcemap: true,
  },
})
```

`defineConfig`: A helper from Vite that does not change how your app runs; it helps editors and TypeScript (if you ever rename the file to `.ts`) validate option names. Plain `export default { /* … */ }` would behave the same.

If this optional file is omitted, Vite uses defaults: project root is where you run the CLI, entry is `index.html` in that root, the dev server listens on `http://localhost:5173`, and the production build writes to `dist/`. 

#### Source maps 

After running `npm run build`, the output JavaScript is usually minified and bundled, which makes errors hard to read in the browser source code. *Source maps* are companion files (for example `main.js` plus `main.js.map`) that map the built code back to your original source files. With `sourcemap: true`, browser developer tools can show stack traces and breakpoints against your real line numbers and filenames instead of the minified bundle. That helps when you are debugging a deployed site. 



### Vite Workflow

Here is the typical sequence of CLI commands you will use when working on a Vite project from start to finish.

#### 1. Install Project Dependencies

When you first clone or download a project (or any time you add a new package), install all dependencies listed in `package.json`:

```bash
npm install
```

This reads the `devDependencies` (and `dependencies`) from `package.json` and downloads everything into a `node_modules` folder. You only need to run this once per machine, or after `package.json` changes.

> **Note:** Never commit the `node_modules` folder to Git — it is large and can be recreated at any time with `npm install`. A `.gitignore` file in Vite projects already excludes it by default.

#### 2. Start the Development Server

While you are writing and testing code, run the Vite dev server:

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) to the terminal. Open that URL in a browser to see your app. The dev server:

- **Watches** your source files and instantly updates the browser whenever you save a change (Hot Module Replacement).
- **Serves files as native ES modules** — no bundling step is needed, so startup is nearly instant.

Press `Ctrl + C` in the terminal to stop the dev server.

#### 3. Build for Production

When your app is complete and ready to deploy, generate an optimized production bundle:

```bash
npm run build
```

Vite compiles and bundles all your source files into a `dist/` folder. The output files are minified and optimized for fast browser loading. The `dist/` folder is what you upload to a web server.

#### 4. Preview the Production Build (Optional)

Before deploying, you can serve the `dist/` folder locally to verify the production build works correctly:

```bash
npm run preview
```

This starts a simple static file server for the `dist/` folder (typically at `http://localhost:4173`). It is **not** a dev server — file changes will not be reflected until you run `npm run build` again.



## Reference

- [Vite official site](https://vitejs.dev/)
  - [Vite Getting Started Guide](https://vitejs.dev/guide/)
- [Getting Started with Vite: Beginners Guide](https://www.freecodecamp.org/news/get-started-with-vite/)&mdash;Free Code Camp
- [What Is Vite: The Guide to Modern and Super-Fast Project Tooling](https://www.telerik.com/blogs/whats-vite-guide-modern-super-fast-project-tooling)&mdash;KendoReact




*Note: Parts of these lecture notes were drafted using Claude Sonnet 4.6.*

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2024, revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 
