import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// GitHub Pages wird unter https://<user>.github.io/<repo>/ ausgeliefert.
// BASE_PATH wird im Deploy-Workflow gesetzt, lokal ist die Basis '/'.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
