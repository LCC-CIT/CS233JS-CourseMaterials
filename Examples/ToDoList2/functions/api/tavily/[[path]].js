// Catch-all proxy: /api/tavily/* → https://api.tavily.com/*
//
// The [[path]] filename is Cloudflare's catch-all route convention. Double brackets
// match any sub-path at any depth under this folder, so one file handles all endpoints:
// /api/tavily/search, /api/tavily/news, etc.
//
// The pathname.replace() strips the /api/tavily prefix so the path forwarded to Tavily
// is what Tavily expects — e.g., /api/tavily/search becomes /search.
//
// TAVILY_API_KEY is set in the Cloudflare Pages dashboard under Settings > Environment Variables.

export async function onRequest(context) {
  const { request, env } = context;

  // Strip the /api/tavily prefix: /api/tavily/search → https://api.tavily.com/search
  const url = new URL(request.url);
  const targetUrl = `https://api.tavily.com${url.pathname.replace('/api/tavily', '')}`;

  try {
    return await fetch(targetUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${env.TAVILY_API_KEY}`,
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
