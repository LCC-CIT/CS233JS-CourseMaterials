---
title: Publish to CloudFlare Pages
description: How to configure and deploy a front-end web app that calls a web service API to CloudFlare Pages and make the API call through a proxy using serverless functions.
generator: Typora
author: Brian Bird
---

<h1>Deploy a Front-End Web App to Cloudflare</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## Introduction

This tutorial guides you through taking a standard frontend web app that exposes its API key in the browser and making it secure by deploying it to [Cloudflare Pages](https://pages.cloudflare.com/).

The approach has two phases:

- **Local development:** Vite's built-in dev server proxy intercepts API calls and injects your API key from a local `.env` file — your key never leaves your machine and is never bundled into the browser.
- **Production (Cloudflare Pages):** A Cloudflare serverless function acts as the proxy, reading the key from Cloudflare's secure environment variables.

This pattern — a `.env` file for local secrets and a dev-server proxy for local API calls — is standard across many frameworks (Next.js, Create React App, Vue CLI). What you learn here transfers to other projects and deployment targets.

## The Goal: Before vs. After

### Before (Insecure)

Your frontend JavaScript sends a request directly to a third-party API. Anyone can open the browser's **Network tab**, see your API key, and steal it.

```javascript
// Insecure client-side call
const apiKey = "SECRET_XYZ123"; 
fetch(`https://api.web-service.com/data?key=${apiKey}`)
  .then(res => res.json());
```

### After (Secure)

Your frontend JavaScript calls a relative URL on your own domain (`/api/web-service`). In local development, Vite intercepts the call and adds the key from your `.env` file. In production, a Cloudflare serverless function intercepts the call, adds the key from Cloudflare's secure environment, and returns the data to your browser.

## Part 1: Set Up and Test the Vite Proxy

This section can be completed and tested independently before setting up Cloudflare.

### Step 1: Set Up Your Project with Vite

Make sure Vite is installed as a dev dependency in your project:

```bash
npm install --save-dev vite
```

You should also have a `vite.config.js` file in the root of your project. You will configure it in Step 3.

### Step 2: Keep Your Local Key Safe with `.env.local`

To test your app on your computer without saving your real API key to GitHub, create a local environment file.

1. Create a file named `.env.local` in the root of your project folder. Vite projects created with `npm create vite` already include `*.local` in `.gitignore`, so this file is automatically excluded from git — no extra `.gitignore` entry needed.

2. Add your secret key inside it:

   ```text
   SECRET_THIRD_PARTY_KEY="your_actual_private_api_key_here"
   ```

3. Optionally create a `.env.example` file (safe to commit) so teammates know which variables to set:

   ```text
   SECRET_THIRD_PARTY_KEY=your_key_here
   ```

### Step 3: Configure the Vite Dev Server Proxy

During local development, Vite's built-in proxy forwards requests from your frontend to the third-party API and injects your secret key — all on the server side.

Open (or create) `vite.config.js` and add the following:

```javascript
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load ALL .env variables (the '' prefix means don't filter to only VITE_-prefixed ones),
  // so API keys are available here in the server config but never bundled into the browser.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    build: {
      sourcemap: true,
    },
    server: {
      // During local development, Vite intercepts requests to /api/web-service/*,
      // strips the /api/web-service prefix, forwards them to the real API server,
      // and injects the API key here on the server — never in the browser.
      proxy: {
        '/api/web-service': {
          target: 'https://api.web-service.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/web-service/, ''),
          headers: {
            Authorization: `Bearer ${env.SECRET_THIRD_PARTY_KEY}`,
          },
        },
      },
    },
  };
});
```

Replace `/api/web-service` and `https://api.web-service.com` with the actual path prefix and base URL for the API you are calling. Replace `SECRET_THIRD_PARTY_KEY` with the variable name you used in your `.env` file.

**Key points:**

- `loadEnv(mode, process.cwd(), '')` — The third argument `''` tells Vite to load *all* `.env` variables, not just `VITE_`-prefixed ones. Using the `VITE_` prefix would expose the key in the browser bundle, which is exactly what we are trying to avoid.
- `changeOrigin: true` — Makes the proxy rewrite the `Host` header to match the target, which most APIs require.
- `rewrite` — Strips the `/api/web-service` prefix before forwarding to the target, so `/api/web-service/search` becomes `/search`.
- `headers` — Adds the Authorization header to every proxied request on the server side.

### Step 4: Update Your Frontend JavaScript

Update your frontend code to call the relative proxy URL instead of the third-party API directly. The browser never sees the API key.

```javascript
// Old insecure line:
// fetch("https://api.web-service.com/data?key=SECRET_XYZ123")

// New secure line — calls your own proxy endpoint:
fetch("/api/web-service/data")
  .then((res) => res.json())
  .then((data) => {
    console.log("Secure data received:", data);
    // Render data to your UI here
  })
  .catch((err) => console.error("Error:", err));
```

The same relative URL (`/api/web-service/...`) works in both environments:

- Locally: Vite's proxy intercepts it (Step 3).
- In production: Cloudflare's function intercepts it (Step 1 in Part 2).

### Step 5: Run and Test Locally

Run your standard Vite development command:

```bash
npm run dev
```

Open your browser to `http://localhost:5173`. When your frontend calls `/api/web-service/...`, Vite intercepts the request, adds your API key from `.env`, and forwards it to the third-party API. Your key never appears in the browser's Network tab.

## Part 2: Deploy to Cloudflare Pages

Once the Vite proxy is working locally, deploy your app to Cloudflare Pages.

### Step 1: Create the Cloudflare Functions Proxy

The Vite proxy only runs during local development. In production on Cloudflare Pages, a serverless function plays the same role: it intercepts requests, injects the API key, and forwards the call.

1. In the root of your project, create a folder named `functions`.
2. Inside that, create a subfolder named `api`.
3. Inside `api`, create a subfolder named after your web service, and inside that create a file named `[[path]].js` — for example, `functions/api/web-service/[[path]].js`.

**About the `[[path]]` filename:** Cloudflare Pages uses file-based routing, meaning the folder and file structure under `functions/` determines which URLs trigger which functions. A filename with double brackets like `[[path]]` is a catch-all wildcard — it matches any sub-path at any depth under that folder. So `functions/api/web-service/[[path]].js` handles all of these with a single file. Here are some hypothetical examples:

| Browser requests…              | Cloudflare runs…                        |
| ------------------------------ | --------------------------------------- |
| `/api/web-service/search`      | `functions/api/web-service/[[path]].js` |
| `/api/web-service/news`        | `functions/api/web-service/[[path]].js` |
| `/api/web-service/data/recent` | `functions/api/web-service/[[path]].js` |

If your API only has one endpoint, you could instead create a file with a simple name (e.g., `functions/api/web-service/search.js`) and skip the URL-rewriting line entirely.

Paste the following code into the file described above and adapt it to your API:

```javascript
// functions/api/web-service/[[path]].js
//
// Catch-all proxy: /api/web-service/* → https://api.web-service.com/*
//
// The [[path]] filename matches any sub-path under this folder, so one file
// handles all endpoints (/api/web-service/search, /api/web-service/news, etc.).
//
// The pathname.replace() strips the /api/web-service prefix so the path forwarded
// to the API is what it expects — e.g., /api/web-service/search becomes /search.
//
// SECRET_THIRD_PARTY_KEY is set in the Cloudflare Pages dashboard (see Step 3).

export async function onRequest(context) {
  const { request, env } = context;

  // Strip the /api/web-service prefix: /api/web-service/search → https://api.web-service.com/search
  const url = new URL(request.url);
  const targetUrl = `https://api.web-service.com${url.pathname.replace('/api/web-service', '')}`;

  try {
    return await fetch(targetUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${env.SECRET_THIRD_PARTY_KEY}`,
        'Content-Type': 'application/json',
      },
      body: request.method === 'GET' ? undefined : await request.text(),
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

Adapt the following for your actual web service:

- **Folder and file path** — Rename the `web-service` folder to match your API (e.g., `functions/api/openweather/[[path]].js`). The folder name becomes part of the URL your frontend calls.
- **`/api/web-service` prefix** — Replace every occurrence of `/api/web-service` with the path prefix you chose above (e.g., `/api/openweather`). There are two occurrences: the `pathname.replace()` call and the `targetUrl` template literal.
- **`https://api.web-service.com`** — Replace with the actual base URL of the third-party API (e.g., `https://api.openweathermap.org`).
- **`SECRET_THIRD_PARTY_KEY`** — Replace with the variable name you used in your `.env.local` file (e.g., `OPENWEATHER_API_KEY`). Use the same name when adding the secret in the Cloudflare dashboard (Step 3).
- **`Authorization: \`Bearer ${...}\``** — Change the header name and format to match what your API requires. Some APIs use `Authorization: Bearer <token>`, others use a custom header like `X-Api-Key`, and others expect the key as a query-string parameter. Check your API's documentation.

**Note:** The `context.env` object is how Cloudflare Functions access environment variables. In production, `env.SECRET_THIRD_PARTY_KEY` is the value you set in the Cloudflare dashboard (Step 3). There is no `.env` file on the server — Cloudflare manages secrets securely.

### Step 2: Deploy to Cloudflare Pages via GitHub

Once everything works locally, publish your app.

1. Commit your project code and push it to your GitHub repository.
2. Log into your Cloudflare Dashboard.
3. Navigate to *Workers & Pages* → *Create Application* → *Pages* tab → *Connect to Git*.
4. Select your GitHub repository.
5. In the Build Settings configuration window:
   - Framework Preset: Select `None`.
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click *Save and Deploy*.

### Step 3: Save Your Production Key in Cloudflare

Your app is live, but the proxy function will fail until you give Cloudflare your real API key.

1. Inside your Cloudflare Pages project dashboard, click the *Settings* tab.
2. Select *Environment Variables* from the left-hand sidebar.
3. Under the *Production* section, click *Add variables*.
4. Add your key:
   - Variable name: `SECRET_THIRD_PARTY_KEY`
   - Value: *your actual API key*
5. Click *Save*.
6. **Important:** Go back to the *Deployments* tab and trigger a fresh deployment (or push a small change to GitHub). This forces Cloudflare to rebuild and bind your new environment variable to the function.

## Success!

Your frontend app is now hosted on a secure CDN. Users interact with your UI normally, but your API key is locked away — first behind your local `.env` file during development, and then behind Cloudflare's secure environment variables in production.



## References

[Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)

[Cloudflare Functions](https://developers.cloudflare.com/pages/functions/)

[Env Variables and Modes](https://vite.dev/guide/env-and-mode)&mdash;Vite

[Server Options: server.proxy](https://vite.dev/config/server-options#server-proxy)&mdash;Vite



*Note: This tutorial was drafted usiing Claude Sonnet 4.6 and Gemini Flash 3.5*

---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript course materials by [Brian Bird](https://profbird.dev), written spring <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---

