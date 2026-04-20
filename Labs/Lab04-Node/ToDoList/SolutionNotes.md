# Solution Notes for the ToDoList Lab Project

## Revision History

### Winter 2025

- package.json: modified script for watch to use Firefox dev edition browser
- webpack.config.js; removed unneded items, removed extra/stray commas  
   fixed bug for building without obfuscation
- index.html: removed script element that loaded the index.js file. The index.js is bundled and should not be loaded from this web page.

## Debugging notes

This console error was occuring before removing the script element that loaded index.js:  
The resource from “http://localhost:8080/js/index.js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff). 2 localhost:8080  
Loading failed for the `<script>` with source “http://localhost:8080/js/index.js”.


[Brian Bird](https://profbird.dev)

