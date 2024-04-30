import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:'public',
  server: {
    // Set the MIME type for JavaScript files
    mimeTypes: {
      '.js': 'application/javascript',
    }},
})
