---
title: Publish to CloudFlare Pages
description: How to configure and deploy a front-end web app that calls a web service API to CloudFlare Pages and make the API call through a proxy using serverless functions.
generator: Typora
author: Brian Bird
---

<h1>Deploy a Front-End Web App to Cloud Flare</h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## Introduction

This tutorial will guide you step-by-step through taking a standard frontend web application that exposes its API key in the browser and moving it to [Cloudflare Pages](https://pages.cloudflare.com/).

By the end of this guide, your app will use Cloudflare’s file-based Functions to safely proxy requests to a third-party API. 

- Your API key will be hidden securely on the server side. 
- Your local development will run entirely inside a standard Vite pipeline.

## The Goal: Before vs. After

### Before (Insecure)

Your frontend JavaScript code sends a request directly to a third-party API. Anyone can open the browser’s **Network tab**, see your API key, and steal it.

```javascript
// Insecure client-side call
const apiKey = "SECRET_XYZ123"; 
fetch(`https://api.web-service.com/data?key=${apiKey}`)
  .then(res => res.json());
```

### After (Secure)

Your frontend JavaScript calls a relative URL on your own domain (`/api/web-service`). Cloudflare catches this call, securely injects the hidden API key on the backend, fetches the data from the third-party service, and passes the clean data back to your browser.

## Step 1: Set Up Your Project with Vite

To get the benefits of modern local environment testing without extra command-line tools, we will use **Vite** along with Cloudflare's official Vite emulation plugin.

1. In your project folder, make sure you have installed the required Cloudflare development plugin:

   ```bash
   npm install --save-dev @cloudflare/vite-plugin
   ```

2. Open your `vite.config.js` file and add the Cloudflare plugin to your setup:

   ```javascript
   // vite.config.js
   import { defineConfig } from "vite";
   import { cloudflare } from "@cloudflare/vite-plugin";
   
   export default defineConfig({
     plugins: [cloudflare()],
   });
   ```

3. Create a bare-minimum `wrangler.toml` file in the root directory of your project. This file is just a configuration blueprint that tells Cloudflare's build engine how to behave:

   ```toml
   name = "student-api-proxy"
   compatibility_date = "2026-05-01"
   ```

## Step 2: Keep Your Local Key Safe with `.env`

To test your app on your computer without saving your real API key to GitHub, create a local environment file.

1. Create a file named `.env` in the root of your project folder.

2. Add your secret key inside it:

   ```text
   SECRET_THIRD_PARTY_KEY="your_actual_private_api_key_here"
   ```

3. **Crucial:** Ensure your `.gitignore` file includes `.env` so this file is never uploaded to public GitHub repositories!

## Step 3: Create the Secure API Proxy Function

Instead of writing a complex Node.js or Express server, Cloudflare allows you to create serverless files using standard browser JavaScript syntax (`Request` and `Response` objects).

1. In the root of your project, create a new folder named `functions`.
2. Inside that folder, create a subfolder named `api`.
3. Create a file named `web-service.js` inside that subfolder. Replace web-service with the name of the web service api you are calling .

Paste the following code into it:

```javascript
// functions/api/weather.js

export async function onRequest(context) {
  // 1. Grab the hidden API key from the environment context
  // (In local development, this pulls from your .env file)
  const apiKey = context.env.SECRET_THIRD_PARTY_KEY;

  // 2. Safely call the third-party API behind the scenes
  const targetUrl = `https://api.web-service.com/data?key=${apiKey}`;

  try {
    const apiResponse = await fetch(targetUrl);
    const data = await apiResponse.json();

    // 3. Return the data to your frontend using standard Web Response syntax
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

## Step 4: Update Your Frontend JavaScript

Now update your frontend application code (e.g., your `main.js` or component file) to stop targeting the third-party URL directly. Instead, hit your brand new relative endpoint.

```javascript
// Old Insecure Line: 
// fetch("https://api.weather-service.com/data?key=SECRET_XYZ123")

// New Secure Line:
fetch("/api/weather")
  .then((res) => res.json())
  .then((data) => {
    console.log("Successfully fetched secure data:", data);
    // Render data to your UI DOM elements here
  })
  .catch((err) => console.error("Error:", err));
```

## Step 5: Run and Test Locally

You do not need to install any custom Cloudflare command-line interfaces to view your work locally.

Simply run your standard Vite development command in your terminal:

```bash
npm run dev
```

Open your browser to `http://localhost:5173`. When your frontend code fires `fetch('/api/web-service')`, the `@cloudflare/vite-plugin` seamlessly intercepts the call, maps it to your local `functions/api/web-service.js` file, injects the key out of your local `.env`, and satisfies the request.

## Step 6: Deploy to Cloudflare Pages via GitHub

Once everything runs flawlessly on your local machine, it is time to publish your secure app to the web.

1. Commit your project code and push it to your **GitHub** repository.
2. Log into your **Cloudflare Dashboard**.
3. Navigate to **Workers & Pages** -> **Create Application** -> **Pages** tab -> **Connect to Git**.
4. Select your GitHub repository.
5. In the Build Settings configuration window:
   - **Framework Preset:** Select `Vite`.
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click **Save and Deploy**.

## Step 7: Save Your Production Key in Cloudflare

Your application is now live on the web, but your proxy function will fail until you provide Cloudflare with your real production API key.

1. Inside your Cloudflare Pages project dashboard, click on the *Settings* tab at the top.
2. Select *Environment Variables* from the left-hand sidebar menu.
3. Under the *Production* section, click *Add variables*.
4. Set up your production key:
   - Variable name: `SECRET_THIRD_PARTY_KEY`
   - Value: *[Paste your actual secret API provider token here]*
5. Click *Save*.
6. **Important:** Go back to your *Deployments* tab and trigger a fresh deployment (or push a tiny change to GitHub). This forces Cloudflare to rebuild the project and securely bind your newly added production environment keys to your API proxy code.

## Success!

Your frontend app is now hosted globally on a secure CDN. Browser users can see your UI and interact with your app seamlessly, but your API key remains securely locked away behind Cloudflare's serverless infrastructure.

*Note: This tutorial was drafted usiing Gemini Flash 3.5*



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript course materials by [Brian Bird](https://profbird.dev), written winter 2025, revised spring <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---

