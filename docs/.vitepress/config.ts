import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Cwgal',
  description: '在网页上用 Galgame 的形式和朋友聊天',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: 'https://img.cdn1.vip/i/6a25242b84915_1780818987.png' }]],
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/start-install' },
      { text: '关于', link: '/other/about' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '安装与运行', link: '/guide/start-install' }
          ]
        }
      ],
      '/other/': [
        {
          text: '了解',
          items: [
            { text: '关于 Cwgal', link: '/other/about' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/smallgudu/Cwgal' }
    ],
    footer: {
      message: 'Made by <a href="https://www.soliar.top">Soliar.</a>，基于 VitePress 构建',
      copyright: 'MIT Licensed'
    }
  }
})