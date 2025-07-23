/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    reporters: ['default'],
    coverage: {
      reporter: ['html'],
    },
    setupFiles: './src/setupTests.ts'
  }
})
