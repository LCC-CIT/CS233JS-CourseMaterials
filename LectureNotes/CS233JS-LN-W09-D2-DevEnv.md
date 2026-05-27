---

title: Store secrets in .env
description: How to use .env files with Vite to manage environment variables in development and production.
keywords: .env, Vite, environment variables, CloudFlare Pages
generator: Typora
author: Brian Bird
---

<h1>More on Web APIs, Dev Environment and Modules</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## .env File

Have you seen GitDefender alerts about web api keys in your source code? This is a solution to that problem.

A .env file stores configuration information for the app. 

- Why shouldn't configuration information like the api key for Google Maps OR the URL for the service that processes the registration information go in our source code?
- JS developers generally put this kind of information in a .env file (that's gitignored) and create an .env.example file (that's not ignored) so that other developers know what technical information the app needs.

### Example .env File

```
VITE_SERVER_URL=http://localhost:3000/participants
VITE_AMAP_KEY=PUT_YOUR_AZURE_API_KEY_HERE
# VITE_GMAP_KEY=YOUR_API_KEY_GOES_HERE
```

### How Vite Handles .env Files

Vite has built-in support for .env files — no extra packages or configuration required.

**Important rule:** Any variable you want accessible in your browser-side JavaScript *must be prefixed with `VITE_`*. Variables without that prefix are kept private and are never included in the built output. This prevents accidentally leaking server-side secrets into client code.

Vite loads different .env files depending on the current mode:

| File | When it loads | Committed to git? |
|---|---|---|
| `.env` | Always | Yes (only non-secret defaults) |
| `.env.local` | Always, overrides `.env` | No — add to `.gitignore` |
| `.env.development` | `vite dev` (development mode) | Yes (only non-secret values) |
| `.env.production` | `vite build` (production mode) | Yes (only non-secret values) |

**Typical practice:** Put real API keys and secrets in `.env.local` (gitignored). Put non-secret defaults and example values in `.env` or `.env.example` (committed).

### Accessing .env Variables in Your Code

In Vite projects, environment variables are accessed through `import.meta.env` . At build time, Vite replaces each `import.meta.env.VITE_*` reference with the actual value from your .env file.

```javascript
// Access the server URL
const serverUrl = import.meta.env.VITE_SERVER_URL;

// Use it in a fetch call
fetch(`${import.meta.env.VITE_SERVER_URL}/api/data`)
  .then(response => response.json())
  .then(data => console.log(data));

// Use an API key
const mapOptions = {
  apiKey: import.meta.env.VITE_AMAP_KEY,
};
```

Vite also provides a few built-in values on `import.meta.env`:

- `import.meta.env.MODE` — `"development"` or `"production"`
- `import.meta.env.DEV` — `true` when running `vite dev`
- `import.meta.env.PROD` — `true` when running `vite build`

You can use these to write code that behaves differently in development and production:

```javascript
if (import.meta.env.DEV) {
  console.log("Running in development mode");
}
```

**Note:** If you change any values in your .env file while the dev server is running, restart it (`Ctrl+C`, then `npm run dev`) for the changes to take effect.

## .env in Production Deployments

When you deploy your app, you no longer have a local .env file — you're running a pre-built bundle on a hosting platform. Secrets need to be set somewhere else.

### The General Pattern

Most hosting platforms (CloudFlare Pages, Netlify, Vercel, GitHub Pages + Actions, etc.) let you define environment variables in their dashboard or configuration. During the build step, those variables are injected into the build process exactly as if they were in a .env file.

The workflow looks like this:

1. **Put variables and secrets in .env.local.** Your `.env.local` with real API keys is only used on your development machine and stays out of git.
2. **Set variables on the production web host.** Enter each `VITE_*` variable in the hosting platform's environment variable settings.
3. **Build with those variables for production.** When the hosting platform runs `vite build`, Vite reads the platform-injected variables and bakes them into the output bundle.
4. **Deployed bundle has the values embedded.** The built JavaScript files contain the actual values — no runtime lookup needed.

### On CloudFlare Pages

In CloudFlare Pages, you set environment variables under:  
*Settings* → *Environment variables*

You can set different values for Production and Preview environments, which is useful for pointing preview deployments at a test API and production deployments at the real one.

For example:

| Variable | Preview value | Production value |
|---|---|---|
| `VITE_SERVER_URL` | `http://localhost:3000/participants` | `https://api.example.com/participants` |
| `VITE_AMAP_KEY` | `(dev key)` | `(production key)` |

When CloudFlare runs `vite build` during deployment, those variables are available exactly as if you had a `.env.production` file locally — no changes needed in your code.

### Non-secret Production Config via .env.production

If a production setting is <u>not</u> secret (like a public API endpoint URL), you can put it directly in `.env.production`:

```
VITE_SERVER_URL=https://api.example.com/participants
```

Vite automatically uses `.env.production` when building (`vite build`), so this value will be used in the deployed app without needing to set it in the platform dashboard. Reserve the platform dashboard for actual secrets like API keys.



## Reference

[Vite: Env Variables and Modes](https://vite.dev/guide/env-and-mode)&mdash;Vite documentation.

[CloudFlare Pages: Environment Variables](https://developers.cloudflare.com/pages/configuration/build-configuration/)&mdash;CloudFlare documentation.



 *Note: Claude Sonnet 4.6 was used to revise some parts of this document.*

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript Lecture Notes by [Brian Bird](https://profbird.dev), written in 2025 and revised in <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 
