---
title: CORS and web security
description: Why web browsers have a Same Origin Policy, what CORS is and how using a server-side proxy for web API calls avoids CORS response blocking and keeps API keys secure.
keywords: HTTP, SOP, CORS
generator: Typora
author: Brian Bird
---

<h1>Web Security and Cross-Origin Resource Sharing/h1>

**CS233JS Intermediate Programming: JavaScript**

<h2>Contents</h2>

[TOC]

## Web Security and the *Same Origin Policy*

The *Same-Origin Policy* (SOP) is a foundational security mechanism implemented by web browsers to prevent a malicious website from stealing sensitive data from another legitimate website. 

requests, they must strictly isolate the data environment of every website you connect to. The *Same-Origin Policy* acts as a digital firewall, ensuring that code running on one web site domain (origin) can only interact with resources from that  same domain. This preserves user privacy and security.

**Example of what SOP prevents**
In browsers didn't have SOP and you logged into your online bank in one browser tab and accidentally opened a malicious website in another, the malicious site's JavaScript could freely read your bank account data, steal your browser session cookies, or execute unauthorized transactions on your behalf. 
Because browsers automatically attach your saved credentials and active session cookies to outgoing HTTP 



## What is CORS?

*Cross-Origin Resource Sharing* (CORS) is a security mechanism enforced by web browsers. It controls which web pages are allowed to make requests to a server at a different *origin* than the one that served the page.

An *origin* is the combination of protocol, domain, and port. For example:

- `http://localhost:5173` — local Vite dev server
  - Protocol: http, domain: localhost, port: 5173

- `https://citstudent.lanecc.edu` — a deployed production site
  - Protocol: https, domain: citstudent.lanecc.edu, default port: 80

- `https://searchupcdata.com` — an external API
  - Protocol https, domain searchupcdata.com, defualt port: 80


When JavaScript running on one origin (e.g. `http://localhost:5173`) tries to `fetch` a resource from a different origin (e.g. `https://searchupcdata.com`), the browser checks whether the target server permits it. If not, the browser blocks the response — even if the request was sent and a response was received.

CORS is enforced by the <u>browser</u>. Server-to-server requests are not affected by it.

---

## The `Access-Control-Allow-Origin` Response Header

When a server wants to allow cross-origin requests, it includes an *HTTP response header* like:

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

Many APIs are intentionally designed to be called from a <u>server</u>, not directly from a browser. There are two main reasons providers omit CORS headers:

**1. API key security**
APIs that require a key expect that key to be kept secret on a server. If CORS were allowed, a developer could call the API directly from browser code — but that would expose the API key to anyone who inspects the page's source or uses the developer tools network tab to view the HTTP request. Omitting CORS headers forces developers to route requests through a backend on the server, keeping the key hidden.

**2. Design intent**
Some APIs are simply built for server-to-server communication and have no expectation of being called from a browser. Since CORS headers aren't needed for server-to-server calls, the provider doesn't include them.

---

## The Standard Solution: A Backend Proxy

The correct production solution is to route API calls through the server. Your front-end app calls a proxy on the server which calls the external API. Since server-to-server requests are not subject to CORS, the external API responds normally.

```
Browser  →  Your Server  →  External API (searchupcdata.com)
         ←               ←
```

This approach also keeps any API credentials safely on the server and out of the browser.

A backend proxy on the server can be implemented as:

- A route in a Node.js/Express server.
- A serverless function (AWS Lambda, Vercel Function, Netlify Function, etc.).
- Any other server-side environment.

The Vite dev server's built-in proxy feature works the same way during, but local development only.

---

## Browser-Only Workarounds (Development Use Only)

These workarounds bypass CORS restrictions in the browser without the need to change any code or set up a proxy. They are suitable for development only and should not be used for regular browsing.

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



---

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript course materials by [Brian Bird](https://profbird.dev), written winter 2025, revised spring <time>2026</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

---

