# CORS: Cross-Origin Resource Sharing

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a security mechanism enforced by web browsers. It controls which web pages are allowed to make requests to a server at a different *origin* than the one that served the page.

An **origin** is the combination of protocol, domain, and port. For example:

- `http://localhost:5173` — local Vite dev server
- `https://myapp.com` — a deployed production site
- `https://searchupcdata.com` — an external API

When JavaScript running on one origin (e.g. `http://localhost:5173`) tries to `fetch` a resource from a different origin (e.g. `https://searchupcdata.com`), the browser checks whether the target server explicitly permits it. If not, the browser blocks the response — even if the request was sent and a response was received.

CORS is enforced by the **browser**. Server-to-server requests are not subject to it.

---

## The `Access-Control-Allow-Origin` Response Header

When a server wants to allow cross-origin requests, it includes an HTTP response header like:

```
Access-Control-Allow-Origin: *
```

The `*` means any origin is allowed. A server can also restrict access to a specific origin:

```
Access-Control-Allow-Origin: https://myapp.com
```

If the browser makes a cross-origin request and this header is absent from the response, it blocks the response and reports a CORS error — which is exactly what happens when calling `searchupcdata.com` from a browser.

---

## Why API Providers Often Don't Include the Header

Many APIs are intentionally designed to be called from a **server**, not directly from a browser. There are two main reasons providers omit CORS headers:

**1. API key security**
APIs that require a key expect that key to be kept secret on a server. If CORS were allowed, a developer could call the API directly from browser code — but that would expose the API key to anyone who inspects the page's source. Omitting CORS headers forces developers to route requests through a backend, keeping the key hidden.

**2. Design intent**
Some APIs are simply built for server-to-server communication and have no expectation of being called from a browser. Since CORS headers aren't needed for server-to-server calls, the provider doesn't include them.

---

## The Standard Solution: A Backend Proxy

The correct production solution is to route API calls through your own server. Your front-end calls your server, and your server calls the external API. Since server-to-server requests are not subject to CORS, the external API responds normally.

```
Browser  →  Your Server  →  External API (searchupcdata.com)
         ←               ←
```

This approach also keeps any API credentials safely on the server and out of the browser.

A backend proxy can be implemented as:

- A route in a Node.js/Express server
- A serverless function (AWS Lambda, Vercel Function, Netlify Function, etc.)
- Any other server-side environment

The Vite dev server's built-in proxy feature works the same way during **local development only** — Vite acts as the middleman. However, it is not used in production builds, so a real server-side solution is required for deployment.

---

## Browser-Only Workarounds (Development Use Only)

These workarounds bypass CORS restrictions in the browser without changing any code. They are suitable for local development only and should never be used for regular browsing.

### Option 1: Browser Extension

Install a CORS-unblocking browser extension such as **"Allow CORS: Access-Control-Allow-Origin"** (available for Chrome and Firefox). The extension intercepts responses and injects the missing `Access-Control-Allow-Origin` header before the browser evaluates it.

- Enable it only when working locally on a project that needs it.
- Disable it for normal browsing — it removes a real security protection.

### Option 2: Launch Chrome with Web Security Disabled

Chrome can be launched from the terminal with its web security enforcement turned off:

```bash
open -na "Google Chrome" --args --user-data-dir=/tmp/chrome-dev --disable-web-security
```

- `--disable-web-security` turns off CORS enforcement.
- `--user-data-dir` is required — Chrome ignores the security flag without it. Using a temporary directory keeps this profile separate from your normal browsing profile.
- Close this window when done. Do not use it for regular web browsing.
