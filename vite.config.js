import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  base: '/goit-advancedjs-hw-03/',     // <-- додано
  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
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
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']),
    SortCss({
      sort: 'mobile-first',
    }),
  ],
}));

