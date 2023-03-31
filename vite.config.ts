/// <reference types="vitest" />

import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"

import vue from '@vitejs/plugin-vue'
import * as  path from 'path';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport =>{
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
  base: VITE_PUBLIC_PATH,
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  plugins: [vue()],
  server: {
    /**是否开启HTTPS */
    https: false,
    /**设置host:true 才可以使用Network 的形式,以访问项目 */
    host: true,
    port: 3333,
    /**是否自动打开浏览器 */
    open: false,
    /**跨域允许设置 */
    cors: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    /** 接口代理 */
    proxy: {
      "/do": {
        target: "https://mock.presstime.cn/mock/642451bab5b2340b4ad03db6/do",
        ws: true,
        /** 是否允许跨域 */
        changeOrigin: true,
        rewrite:(path) => path.replace("/do","")
      }
      }
    }
  }
}
