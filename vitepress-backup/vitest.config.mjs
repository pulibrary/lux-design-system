import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import path from "path"
import { vueDocsPlugin } from "./vite.config.mjs"

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["tests/**/*.spec.js"],
  },
  plugins: [vue(), vueDocsPlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
