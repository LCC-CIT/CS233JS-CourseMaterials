// Catch-all proxy: /api/tavily/search → https://api.tavily.com/search
// TAVILY_API_KEY is set via: npx wrangler pages secret put TAVILY_API_KEY

export async function onRequest(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const tavilyPath = url.pathname.replace('/api/tavily', '');
  const tavilyUrl = `https://api.tavily.com${tavilyPath}`;

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('Authorization', `Bearer ${env.TAVILY_API_KEY}`);
  headers.set('Content-Type', 'application/json');

  const proxyRequest = new Request(tavilyUrl, {
    method: request.method,
    headers,
    body: request.method === 'GET' ? undefined : await request.text(),
  });

  return fetch(proxyRequest);
}
