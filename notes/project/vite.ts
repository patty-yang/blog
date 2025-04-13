// prefetchPlugin.ts

import { type Plugin, ResolvedConfig, ViteDevServer } from 'vite'

export interface IPrefetchPluginOption {
  excludeFn?: (assetName: string) => boolean // 排除函数，接受资源名称,并返回 bool
}

const prefetchPlugin: (option?: IPrefetchPluginOption) => Plugin = (option) => {
  let config: ResolvedConfig // 存储解析后到配置
  return {
    name: 'vite-plugin-bundle-prefetch', // 插件名称
    apply: 'build', // 只在构建阶段应用
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig
    },
    transformIndexHtml(
      html: string,
      ctx: {
        path: string
        filename: string
        server?: ViteDevServer
        bundle?: import('rollup').OutputBundle
        chunk?: import('rollup').OutputChunk
      }
    ) {
      const bundles = Object.keys(ctx.bundle ?? {}) // 获取所有打包文件的名称
      const isLegacy = bundles.some((bundle) => bundle.includes('legacy')) // 判断是否为老旧浏览器的构建
      if (isLegacy) {
        // 如果是老旧浏览器，则不添加 prefetch
        return html
      }
      // 移出 .map 文件
      let modernBundles = bundles.filter(
        (bundle) => bundle.endsWith('.map') === false
      )

      const excludeFn = option?.excludeFn
      if (excludeFn) {
        // 如果存在排除函数,则过滤掉需要排除的文件
        modernBundles = modernBundles.filter((bundle) => !excludeFn(bundle))
      }

      //   移出已存在的文件,并将他们拼接成 link 标签
      const prefetchBundlesString = modernBundles
        .filter((bundle) => html.includes(bundle) === false)
        .map((bundle) => `<link rel="prefetch" href="${config.base}${bundle}">`)
        .join('')

      //   使用正则表达式获取 head 内容的数据
      const headContent = html.match(/<head>([\s\S*])<\/head>/)?.[1] ?? ''
      //   将 prefetch 内容插入到 head 中
      const newHeadContent = `${headContent}${prefetchBundlesString}`
      //   替换原是的 head
      html = html.replace(
        /<head>([\s\S]*)<\/head>/,
        `<head>${newHeadContent}</head>>`
      )
      return html
    }
  }
}

export default prefetchPlugin
