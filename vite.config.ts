/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import del from 'rollup-plugin-delete'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'dragon-drop-vue',
      fileName: 'dragon-drop-vue',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [del({ targets: ['dist/dragon.png', 'dist/dragon.svg'], hook: 'generateBundle' })],
    },
  },
  test: {
    browser: {
      enabled: true,
      name: 'chrome',
      provider: 'webdriverio',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['lib/**/*.ts'],
      exclude: ['lib/**/*.spec.ts'],
      all: true,
      reportsDirectory: 'coverage-unit',
    },
    typecheck: {
      enabled: true,
    },
  },
})
