import { defineConfig } from 'vite';
import JavaScriptObfuscator from 'javascript-obfuscator';

function obfuscateBuildPlugin(enabled) {
  return {
    name: 'obfuscate-build-output',
    apply: 'build',
    generateBundle(_, bundle) {
      if (!enabled) {
        return;
      }

      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.fileName.endsWith('.js')) {
          continue;
        }

        chunk.code = JavaScriptObfuscator.obfuscate(chunk.code, {
          rotateStringArray: true,
        }).getObfuscatedCode();
      }
    },
  };
}

export default defineConfig(() => {
  const isObfuscationEnabled = process.env.OBFUSCATE === 'true';

  return {
    root: 'src',
    publicDir: false,
    server: {
      open: '/index.html',
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        input: 'src/index.html',
      },
    },
    plugins: [obfuscateBuildPlugin(isObfuscationEnabled)],
  };
});