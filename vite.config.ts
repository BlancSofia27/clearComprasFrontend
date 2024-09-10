import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // URL de tu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Reescribe la ruta si es necesario
      },
    },
  },
})
