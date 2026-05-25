import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Third argument '' means: load all variables, not only VITE_-prefixed ones.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    build: {
      sourcemap: true,
    },
    server: {
      proxy: {
        '/api/tavily': {
          target: 'https://api.tavily.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tavily/, ''),
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
