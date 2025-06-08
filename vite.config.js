import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src', // Entry point is src/index.html
  base: '/goit-advancedjs-hw-04/', // Required for GitHub Pages deployment
  build: {
    sourcemap: true,
    outDir: '../dist', // Output directory relative to project root
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'), // Supports multiple HTML entry points
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames(chunkInfo) {
          return chunkInfo.name === 'commonHelpers'
            ? 'commonHelpers.js'
            : '[name].js';
        },
        assetFileNames(assetInfo) {
          if (assetInfo.name?.endsWith('.html')) {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({
      sort: 'mobile-first',
    }),
  ],
}));

