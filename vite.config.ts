/// <reference types="vitest" />

import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import path, { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import svgLoader from "vite-svg-loader"
import UnoCSS from "unocss/vite"
import DefineOptions from "unplugin-vue-define-options/vite"

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
    build: {
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: "terser",
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      /** 打包后静态资源目录 */
      assetsDir: "static"
    },
  server: {
    /**是否开启HTTPS */
    https: false,
    /**设置host:true 才可以使用Network 的形式,以访问项目 */
    host: true,
    port: 3333,
    /**开启热更新*/
    hmr : true,
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
    },
  /** Vite 插件 */
  plugins: [
    vue(),
    vueJsx(),
    /** 将 SVG 静态图转化为 Vue 组件 */
    svgLoader({ defaultImport: "url" }),
    /** SVG */
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    }),
    /** UnoCSS */
    UnoCSS(),
    /** DefineOptions 可以更简单的注册组件名称 */
    DefineOptions()
    /** 自动按需引入 (已更改为完整引入，所以注释了) */
    // AutoImport({
    //   dts: "./types/auto-imports.d.ts",
    //   /** 自动按需导入 Element Plus 相关函数，比如 ElMessage */
    //   resolvers: [ElementPlusResolver()],
    //   /** 根据自动按需导入的相关 API，生成 .eslintrc-auto-import.json 文件供 Eslint 识别 */
    //   eslintrc: {
    //     enabled: true, // 默认 false
    //     filepath: "./types/.eslintrc-auto-import.json", // 默认 "./.eslintrc-auto-import.json"
    //     globalsPropValue: true // 默认 true (true | false | "readonly" | "readable" | "writable" | "writeable")
    //   }
    // }),
    // Components({
    //   dts: "./types/components.d.ts",
    //   /** 自动按需导入 Element Plus 组件 */
    //   resolvers: [ElementPlusResolver()]
    // })
  ],
  }
}
