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
    build: {
      // Keep sourcemaps for student debugging and easier grading support.
      sourcemap: true,
    },
    plugins: [obfuscateBuildPlugin(isObfuscationEnabled)],
  };
});