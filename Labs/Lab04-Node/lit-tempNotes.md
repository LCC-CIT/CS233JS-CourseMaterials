# Lit-html vs. Standard JavaScript Template Literals

While sharing backtick syntax, **lit-html** and **Standard JS Template Literals** differ fundamentally in how they process, render, and update HTML.

## 1. Core Output

- **Standard JS:** Evaluates to a **flat string**.
  - `const tpl = \`<div>${val}</div>`;`results in`"<div>value</div>"`.
- **Lit-html:** Evaluates to a **TemplateResult object**. The `html` tag function captures static parts and dynamic expressions separately, allowing Lit to map the template's internal structure.

## 2. Rendering & Performance

### Standard Template Literals

Using standard literals with `innerHTML` forces the browser to:

1. Parse the entire string into a DOM tree.
2. Destroy and recreate all existing DOM nodes in the container. This process repeats for every change, even for single characters.

### Lit Templates

With `render(template, container)`, Lit optimizes the workflow:

1. **Initial Pass:** Parses a `<template>` once and clones it.
2. **Mapping:** Pinpoints exactly where dynamic expressions sit in the DOM.
3. **Updates:** Compares new values against old ones, patching **only** the specific nodes or attributes that changed while leaving the rest of the DOM intact.

## 3. Expression Contexts

Standard literals treat all data as strings. Lit-html is **context-aware**:

| Feature             | Standard JS                  | Lit-html                     |
| ------------------- | ---------------------------- | ---------------------------- |
| **Text Content**    | `<div>${val}</div>` (String) | `<div>${val}</div>` (Node)   |
| **Boolean Attrs**   | Manual logic required        | `<input ?disabled="${val}">` |
| **Properties**      | Not supported                | `<input .value="${val}">`    |
| **Event Listeners** | Manual `addEventListener`    | `<button @click="${fn}">`    |

## 4. Security (XSS Protection)

- **Standard JS:** `innerHTML` is vulnerable to script injection via template variables.
- **Lit-html:** Binds expressions as **text content** by default. Values are automatically escaped; script tags in variables render as literal text. Actual HTML rendering requires the explicit `unsafeHTML` directive.

## 5. Summary Table

| Requirement       | Standard JS Template Literal        | Lit-html Template                   |
| ----------------- | ----------------------------------- | ----------------------------------- |
| **Parsing**       | Every time data changes             | Once per structure                  |
| **DOM Stability** | Nodes destroyed/recreated           | Nodes reused and patched            |
| **Efficiency**    | High overhead (string manipulation) | High performance (targeted updates) |
| **Logic**         | String concatenation                | Structural data binding             |

## Reference

[Templates Overview](https://lit.dev/docs/templates/overview/)&mdash;Lit Documentation



*This document generated in Gemini canvas by Brian Bird and revised by B. Bird, spring 2026.*