import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages では https://abetkc-alc.github.io/task-board/ で配信されるため
  base: '/task-board/',
})
