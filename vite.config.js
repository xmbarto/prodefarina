import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_NODE_ENV === "production" ? "/prodefarina/" : "/",
  server: {
    proxy: {
      '/__/auth': {
        target: 'http://localhost:5173', // Asegúrate de que el puerto coincida con el de Firebase
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
