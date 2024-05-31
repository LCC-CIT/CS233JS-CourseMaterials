---
title: NPM FAQ
description: TBD
keywords: package.json, npm, dependency
generator: Typora
author: Brian Bird
---

<h1>NPM and package.json FAQs</h1>

<h2>Table of Contents</h2>

[TOC]

# FAQs

## 1. What is npm?

`npm` stands for Node Package Manager, and it’s a tool that allows developers to install, share, and manage dependencies in their JavaScript projects.

## 2. What is package.json?

The `package.json` file is a manifest for your project. It contains metadata such as the project’s name, version, description, and lists of dependencies and scripts.

Note that you only need to list the packages (modules) that your project uses. The packages used by those packages will be loaded automatically.

## 3. How do I create a package.json file?

You can create a `package.json` file by running `npm init` in your project directory and answering a series of prompts.

## 4. What are dependencies and devDependencies?

Dependencies are libraries required in order for your application to run (both for development and production). The devDependencies are only needed for development purposes, like testing or building your application.

## 5. How do I install a package?

Use `npm install <package-name>` to install a package. Add `--save` to include it in your `package.json` dependencies or `--save-dev` for devDependencies.

## 6. Can I specify package versions?

Yes, you can specify versions using version ranges.

Versions in `package.json` are specified using a simple object that maps a package name to a version range. The version range is a string which has one or more space-separated descriptors. Here are some ways you can specify the package version within `package.json` file:

- `"1.0.0"`: This will install the package of the specified version every time.
- `"^1.0.0"`: This will install the latest minor (middle number) or patch (last number) version that is compatible with version 1.0.0. The major version is fixed.
- `"~1.0.0"`: This will install the latest patch version that is compatible with version 1.0.0. The major and minor versions are fixed.

## 7. What is the purpose of the `scripts` section?

The `scripts` section defines task aliases that you can run with `npm run <script-name>`, such as `npm run test` for running tests.

## 8. How do I update packages?

Run `npm update` to update all packages, or `npm update <package-name>` to update a specific package.

## 9. What is the `main` field for?

The `main` field specifies the entry point file of your package, which is the first file that gets executed.

## 10. How do I uninstall a package?

Use `npm uninstall <package-name>` to remove a package from your project and update the `package.json` file.

## 11. What is a lockfile?

A lockfile (`package-lock.json` or `npm-shrinkwrap.json`) ensures that the same versions of packages are installed across different environments. If you wish to change the versions of the files in package.json, first delete the lockfile. The lockfile should not be committed to git.

## 12. What is the difference between global and local installation of npm packages?

When you install an npm package locally using `npm install <package-name>`, it gets installed in the `node_modules` directory inside the current folder, and it can be required by the files inside that folder. When you install a package globally using `npm install -g <package-name>`, it gets installed in a global directory and can be accessed by all projects on your system. Global installations are typically used for command-line tools.



# Example

Here is an example package.json file:

```javascript
{
  "name": "going2boston",
  "version": "0.9.0",
  "description": "Going to Boston dice game",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/LCC-CIT/CS233JS-Going2Boston.git"
  },
  "keywords": [
    "dice",
    "boston"
  ],
  "author": "Brian Bird",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/LCC-CIT/CS233JS-Going2Boston/issues"
  },
  "homepage": "https://github.com/LCC-CIT/CS233JS-Going2Boston#readme",
  "dependencies": {
    "babel-loader": "^9.1.3",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4"
  },
  "devDependencies": {
    "@babel/cli": "^7.24.6",
    "@babel/core": "^7.24.6",
    "@babel/preset-env": "^7.24.6",
    "copy-webpack-plugin": "^12.0.2",
    "css-loader": "^7.1.2",
    "html-webpack-plugin": "^5.6.0",
    "style-loader": "^4.0.0",
    "webpack-dev-server": "^5.0.4"
  }
}
```



# References

- [npm Docs](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)
  This is the official documentation for npm. It provides a detailed explanation of package.json.
- [Using ^ and ~ in Package.json Version Specifiers - A Complete Guide](https://www.freakyjolly.com/using-and-in-package-json-version-specifiers-a-complete-guide/)&mdash;FreakyJolly
- [How To Use Node.js Modules with npm and package.json](https://www.digitalocean.com/community/tutorials/how-to-use-node-js-modules-with-npm-and-package-json)&mdash;DigitalOcean
- [How To Use Node Modules with npm and package.json](https://www.geeksforgeeks.org/how-to-use-node-modules-with-npm-and-package-json/)&mdash;GeeksForGeeks



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript course materials by [Brian Bird](https://profbird.dev), written in <time>2024</time> with assistance from GPT4.0, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

---