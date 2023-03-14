import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const _dirname = path.resolve('')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: path.join(path.resolve(_dirname), '/env'),
})
