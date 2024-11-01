// vite.config.js
import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // Add React plugin for JSX support
    inject({
      Buffer: ['buffer', 'Buffer'] // Inject Buffer for browser compatibility
    })
  ],
  resolve: {
    alias: {
      buffer: 'buffer' // Set up alias for buffer compatibility
    }
  }
});
