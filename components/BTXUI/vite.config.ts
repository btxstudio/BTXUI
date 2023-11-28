import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    //浏览器兼容性  "esnext"|"modules"
    lib: {
      entry: fileURLToPath(new URL("./index.js", import.meta.url)),
      name: "btxui",
      fileName: "index"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "vue"
        }
      }
    },
    //指定输出路径
    outDir: "btxui/dist",
    assetsInlineLimit: 10240,
    // 打包环境移除console.log, debugger
    minify: "terser",
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
}));
