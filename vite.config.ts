import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "^/BYG\\d{4}/[^/]+$": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/(BYG\d{4})\/([^/]+)$/, "/preview/$1/$2?format=html"),
      },
    },
  },
})
