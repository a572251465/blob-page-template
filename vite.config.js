import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from "@vitejs/plugin-vue-jsx"
import mdx from "./src/plugins/ViteMdxVuejs/index"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx(),
    jsx({
      include: /\.(jsx|tsx|mdx|md)/
    }),
    vue()
  ]
})
