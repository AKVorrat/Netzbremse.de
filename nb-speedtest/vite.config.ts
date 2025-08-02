import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    solidPlugin(),
    tailwindcss(),
    visualizer({
      filename: './dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    }
  },
});
