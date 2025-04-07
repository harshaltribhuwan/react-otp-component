import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-otp-component/', // 🔥 Replace with your repo name
  plugins: [react()],
});
