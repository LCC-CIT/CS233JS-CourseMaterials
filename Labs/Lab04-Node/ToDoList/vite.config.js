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

      // Obfuscate emitted JS late in the pipeline so source modules remain readable in dev.
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
  // Keep obfuscation opt-in because it slows builds and complicates debugging.
  const isObfuscationEnabled = process.env.OBFUSCATE === 'true';

  return {
    // Root in src to preserve current teaching-lab folder layout without moving files.
    root: 'src',
    publicDir: false,
    server: {
      open: '/index.html',
    },
    build: {
      // Emit outside src to avoid mixing generated artifacts with source files.
      outDir: '../dist',
      emptyOutDir: true,
      // Keep sourcemaps for student debugging and easier grading support.
      sourcemap: true,
      rollupOptions: {
        input: 'src/index.html',
      },
    },
    plugins: [obfuscateBuildPlugin(isObfuscationEnabled)],
  };
});