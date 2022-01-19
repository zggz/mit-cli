import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import visualizer from 'rollup-plugin-visualizer'
import checker from 'vite-plugin-checker'
import viteSvgIcons from 'vite-plugin-svg-icons'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig(async (configEnv) => {
  console.log(configEnv)

  return {
    base: '/',
    define: {
      __APP_VERSION__: "'0.0.1'"
    },
    publicDir: './static',
    envDir: 'env',
    plugins: [react(),reactRefresh(), visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }), checker({
      typescript: true,
      eslint: {
        files: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx']
      }
    }), viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    })],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import \'./src/assets/styles/index.scss\';'
        }
      }
    },
    server: {
      https: false, // 是否开启 https
      open: true, // 是否自动在浏览器打开
      port: 3000, // 端口号
      host: '0.0.0.0',
      hmr: {
        overlay: true // 是否开启错误的阴影层
      },
      proxy: {}
    },
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        // 生产环境移除 console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: { // 分包
            react: ['react', 'react-dom']
          }
        }
      }
    }
  }
})
