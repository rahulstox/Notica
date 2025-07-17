// React plugin for Vite (renderer ke liye)
import react from '@vitejs/plugin-react'

// electron-vite ke core tools
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

// path resolve karne ke liye
import { resolve } from 'path'

export default defineConfig({
  // Main process config
  main: {
    plugins: [externalizeDepsPlugin()], // Node modules ko external treat karega
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'), // main lib shortcut
        '@shared': resolve('src/shared') // shared code ke liye shortcut
      }
    }
  },

  // Preload script config
  preload: {
    plugins: [externalizeDepsPlugin()] // preload ke liye bhi same plugin
  },

  // Renderer (frontend) config
  renderer: {
    assetsInclude: 'src/renderer/assets/**', // static assets include karne ke liye
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'), // root renderer shortcut
        '@shared': resolve('src/shared'), // shared folder
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/store': resolve('src/renderer/src/store'),
        '@/components': resolve('src/renderer/src/components'),
        '@/mocks': resolve('src/renderer/src/mocks')
      }
    },
    plugins: [react()] // React plugin apply kiya renderer ke liye
  }
})

// Yeh config electron-vite ko setup karta hai — jisme main, preload, aur renderer teeno parts ke aliases, plugins, aur asset settings diye gaye hain. Har ek part modular aur clean banaya gaya hai taaki dev experience smooth ho, imports short ho, aur Electron + React app easily scale ho sake. 