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
      // During local development, Vite intercepts requests to /api/tavily/*,
      // strips the /api/tavily prefix, forwards them to api.tavily.com,
      // and injects the API key here on the server — never in the browser.
      proxy: {
        '/api/tavily': {
          target: 'https://api.tavily.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tavily/, ''),
          headers: {
            Authorization: `Bearer ${env.TAVILY_API_KEY}`,
          },
        },
      },
    },
  };
});
