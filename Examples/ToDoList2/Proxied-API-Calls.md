# Single-Origin API Calls: Keeping API Keys Secret in a Browser-Only Front-End

## The Problem

A browser-only web app that calls an external API faces two problems:

1. **API key exposure.** If your JavaScript calls `https://api.some-service.com` directly, the API key appears in the browser's Network tab and is visible to anyone who inspects the page source or bundled JS. This is true even when you use Vite environment variables (`import.meta.env.VITE_*`), because those values are inlined at build time — they become plain strings in the shipped JavaScript.

2. **CORS.** Many API providers deliberately omit `Access-Control-Allow-Origin` headers so that browsers block cross-origin requests. A server-to-server call would work fine, but the same call from `fetch()` in a browser gets blocked.

Both problems have the same fix: **never call an external API from the browser.** Instead, call your own origin and relay the request server-side.

```
Browser  ──→  Your Proxy (same origin)  ──→  External API
  ↑               no CORS check                ↑
  └── api key never leaves the server ──────────┘
```

This tutorial shows how to set up that proxy in two environments — Vite for development and Cloudflare Pages Functions for production — with examples drawn from the ToDo app in this directory.

---

## Architecture Overview

The ToDo app uses two external APIs:

| API | Requires key | Called when |
| --- | :---: | --- |
| DummyJSON (`dummyjson.com/quotes/random`) | No | App loads |
| Tavily Search (`api.tavily.com/search`) | Yes | User adds a task |

DummyJSON is a public, CORS-friendly API — the app calls it directly and that is fine. Tavily requires an API key, so it is the one we need to proxy.

The app's service modules currently call external URLs directly:

```js
// src/js/tavilyService.js (current — key exposed in browser)
const TAVILY_API_URL = 'https://api.tavily.com/search';
const TAVILY_API_KEY = import.meta.env.VITE_TAVILY_API_KEY;  // inlined at build time

export async function fetchHowToLink(taskDescription) {
  const response = await fetch(TAVILY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TAVILY_API_KEY}`,  // visible in Network tab
    },
    body: JSON.stringify({ query: `How do I ${taskDescription}`, ... }),
  });
  // ...
}
```

We will change this module to call **our own origin** (`/api/tavily`), and the proxy will forward the request to `api.tavily.com` with the key attached server-side. We will also rename the environment variable from `VITE_TAVILY_API_KEY` to `TAVILY_API_KEY` — the `VITE_` prefix tells Vite to inline variables into bundled browser code, which is exactly what we are trying to avoid.

---

## Part 1: Vite Proxy (Development)

### Update `.env`

Copy `.env.example` to `.env` (if you haven't already) and rename the key variable:

```
# .env
TAVILY_API_KEY=your_tavily_api_key_here
```

> **Why no `VITE_` prefix?** Variables prefixed with `VITE_` are automatically inlined into your bundled browser JavaScript by Vite. Since this key is only needed server-side by the proxy, omitting the prefix ensures Vite will never expose it to the browser.

### Configure the dev server proxy

Vite's dev server includes a built-in proxy. Vite also provides a `loadEnv` helper to read `.env` variables inside `vite.config.js`. Use both together:

```js
// vite.config.js
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Third argument '' means: load all variables, not only VITE_-prefixed ones.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    build: { sourcemap: true },
    server: {
      proxy: {
        '/api/tavily': {
          target: 'https://api.tavily.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tavily/, ''),
          // The rewrite strips /api/tavily so /api/tavily/search → /search
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${env.TAVILY_API_KEY}`);
            });
          },
        },
      },
    },
  };
});
```

What this does:

- The browser calls `http://localhost:5173/api/tavily/search`. This is **same-origin**, so CORS does not apply.
- Vite receives the request, rewrites the path, adds the `Authorization` header from `.env`, and forwards everything to `https://api.tavily.com/search`.
- The response flows back through Vite to the browser.
- The API key is read from `.env` **server-side** and never reaches the browser.

No additional packages are needed — `loadEnv` is built into Vite.

---

## Part 2: Cloudflare Pages Functions (Production)

A Cloudflare Pages project can include a `functions/` directory. Each file exports an `onRequest` handler that runs as a serverless function on Cloudflare's edge. These functions are **same-origin** relative to your deployed Pages site.

### Step 1: Create the function

```
mkdir -p functions/api/tavily
```

Create `functions/api/tavily/[[path]].js`:

```js
// functions/api/tavily/[[path]].js
// The [[path]] catch-all means /api/tavily/search, /api/tavily/anything all route here.

export async function onRequest(context) {
  const { request, env } = context;

  // The incoming URL looks like https://your-app.pages.dev/api/tavily/search
  // We forward everything after /api/tavily to the actual Tavily API.
  const url = new URL(request.url);
  const tavilyPath = url.pathname.replace('/api/tavily', '');
  const tavilyUrl = `https://api.tavily.com${tavilyPath}`;

  // Build a new request to forward — copy headers, strip host so fetch sets the correct one.
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('Authorization', `Bearer ${env.TAVILY_API_KEY}`);
  headers.set('Content-Type', 'application/json');

  const proxyRequest = new Request(tavilyUrl, {
    method: request.method,
    headers,
    body: request.method === 'GET' ? undefined : await request.text(),
  });

  const response = await fetch(proxyRequest);
  return response;
}
```

### Step 2: Set the secret in Cloudflare

The API key must be set as a Cloudflare Pages **secret** (not in `.env` — `.env` files are for local dev and must not be deployed):

```bash
npx wrangler pages secret put TAVILY_API_KEY
```

The function reads it from `context.env.TAVILY_API_KEY`.

### Step 3: Deploy

Your `dist/` directory gets deployed alongside the `functions/` directory. Cloudflare automatically deploys functions when you push or run:

```bash
npx wrangler pages deploy dist
```

---

## Part 3: Unified Service Module

Now the service module needs to call a relative URL that resolves to the same origin in both environments:

```js
// src/js/tavilyService.js (after proxy setup)
const TAVILY_API_URL = '/api/tavily/search';  // same-origin path — no key needed here

export async function fetchHowToLink(taskDescription) {
  try {
    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `How do I ${taskDescription}`,
        include_answer: 'basic',
        search_depth: 'basic',
      }),
    });
    if (!response.ok) throw new Error(`Tavily API returned ${response.status}`);
    const { results } = await response.json();
    if (!results?.length) return null;
    const { url, title } = results[0];
    return { url, title };
  } catch (error) {
    console.error('Could not fetch how-to link:', error);
    return null;
  }
}
```

Key differences from the original:

- The URL is `/api/tavily/search` — a **relative path** on the same origin. No CORS, no key.
- The `Authorization` header is gone from the browser code — the proxy attaches it server-side.
- `import.meta.env.VITE_TAVILY_API_KEY` is no longer imported or used in the browser.

For the quote service (`quoteService.js`), nothing changes. DummyJSON is a public CORS-friendly API — calling it directly is fine.

---

## How to Verify It's Working

Run `npm run dev`, open DevTools → **Network**, and add a task. You should see:

- A POST to `/api/tavily/search` (relative URL, same origin) — **not** to `https://api.tavily.com`.
- The request headers in DevTools should show **no `Authorization` header** — the proxy adds it after the browser hands off the request.
- The response should contain `results` data just as before.

If you still see a direct request to `https://api.tavily.com`, the proxy is not applied — double-check that `vite.config.js` exports a function (not a plain object) and that `npm run dev` was restarted after editing the config.

---

## End-to-End Flow

Here is what happens when the user adds a task "bake a cake":

### Development (`npm run dev`)

```
Browser (localhost:5173)
  │  fetch('/api/tavily/search', { body: { query: "How do I bake a cake" } })
  │  Same origin → no CORS preflight to worry about
  ▼
Vite dev server (localhost:5173)
  │  Rewrites /api/tavily → /
  │  Adds Authorization: Bearer <key-from-.env>
  │  Forwards to api.tavily.com
  ▼
api.tavily.com
  │  Returns search results
  ▼
Vite → Browser  (response with { results: [...] })
```

### Production (Cloudflare Pages)

```
Browser (your-app.pages.dev)
  │  fetch('/api/tavily/search', { body: { query: "How do I bake a cake" } })
  │  Same origin → no CORS preflight
  ▼
Cloudflare Pages Function functions/api/tavily/[[path]].js
  │  Reads env.TAVILY_API_KEY (set via wrangler secret)
  │  Adds Authorization header
  │  Forwards to api.tavily.com
  ▼
api.tavily.com
  │  Returns search results
  ▼
Cloudflare Function → Browser  (response with { results: [...] })
```

---

## Adding More APIs

This pattern scales to any number of proxied APIs. For a second proxied API, you would:

1. Add another entry under `server.proxy` in `vite.config.js`.
2. Add a corresponding function in `functions/api/<name>/[[path]].js`.
3. Add its secret with `wrangler pages secret put`.

The `/api/` prefix convention keeps all proxied routes namespaced and easy to find:

```
/api/tavily/search     → api.tavily.com
/api/openai/chat       → api.openai.com
/api/supabase/rest     → <project>.supabase.co
```

Each gets its own proxy rule and its own function file.

---

## Alternatives to Cloudflare Functions

The same pattern works with any hosting platform that offers serverless functions:

| Platform | Proxy mechanism |
| --- | --- |
| Vercel | `api/*.js` files in the project root |
| Netlify | `netlify/functions/*.js` |
| AWS Amplify | `amplify/backend/function/*` |

If you use a different host, the concept is identical: a serverless function on the same origin that attaches the secret and forwards the request.

---

## Summary

1. **Rename the env variable** to `TAVILY_API_KEY` (no `VITE_` prefix) so Vite never inlines it into browser code. Copy `.env.example` to `.env` and fill in your key.
2. **Browser calls same origin** (`/api/tavily/search`) — no CORS, no key in the request.
3. **Vite proxy** (`loadEnv` + `configure`) forwards it in dev with the key from `.env`.
4. **Cloudflare Pages Function** forwards it in prod with the key from `wrangler secret`.
5. **The API key never reaches the browser.**
6. **The service module** (`tavilyService.js`) is simpler — no `Authorization` header, no `import.meta.env`, just a relative URL.
