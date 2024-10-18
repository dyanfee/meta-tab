/*
 * @Author: yanfee dyanfee@gmail.com
 * @Date: 2023-07-17 15:14:56
 * @LastEditors: yanfee dyanfee@gmail.com
 * @LastEditTime: 2023-08-16 15:51:14
 * @Description: 
 */
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack';
import manifest from './manifest'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const production = mode === 'production'

  return {

    build: {
      emptyOutDir: true,
      outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[hash].js',
          assetFileNames: 'css/[hash][extname]'
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), //设置别名
        '@tab': path.resolve(__dirname, 'src/newtab') //设置别名
      }
    },
    plugins: [crx({ manifest }), vue(),
      //  插件 打包
      // zipPack({
      //   outDir: `dist_zip`,
      //   inDir: 'dist',
      //   // @ts-ignore
      //   outFileName: `${manifest.short_name ?? manifest.name.replaceAll(" ", "-")}-extension-v${manifest.version}.zip`,
      // }),
    ],


    server: {
      proxy: {
        // 选项写法
        '/bing': {
          target: 'https://cn.bing.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bing/, '')
        },
        '/su': {
          target: 'https://suggestion.baidu.com/',
          changeOrigin: true,
          //rewrite: (path) => path.replace(/^\/api/, '')
          // configure: (proxy, options) => {
          //   // proxy 是 'http-proxy' 的实例
          //   console.log(proxy, options)
          // }
        },
        '/sentence': {
          target: 'https://v1.hitokoto.cn/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sentence/, '')
        },
        '/bing_run': {
          target: 'https://bing.img.run/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bing_run/, '')
        },
        '/tab': {
          target: 'https://api.wetab.link/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tab/, '')
        },
      }
    }

  }
})
