import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative asset URLs so dist works from subfolders and static file servers.
  base: './',
  build: {
    // Emit source maps so the built app can be debugged in the browser.
    sourcemap: true,
  },
});
