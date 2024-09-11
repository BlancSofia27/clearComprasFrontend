import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Configura la base para el despliegue en la subcarpeta
  build: {
    sourcemap: true, // Opcional: genera mapas de origen para depuración
  },
})
