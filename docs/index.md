---
# 首页使用 VitePress 默认主题的 Hero 布局
layout: home

hero:
  name: "Cwgal"
  text: "在网页上用 Galgame 的形式和朋友聊天"
  tagline: "将日常聊天变成一场视觉小说 —— 立绘,表情,选项，基于onebot v11协议,融入即时通讯。"
  image:
    src: https://img.cdn1.vip/i/6a2526a8a2627_1780819624.png
    alt: Cwgal Logo
  actions:
    - theme: brand
      text: 开始安装
      link: /guide/start-install
    - theme: alt
      text: GitHub
      link: https://github.com/smallgudu/Cwgal

features:
  - title: 🎭 Galgame 式对话气泡
    details: 每个好友单独配置立绘背景，消息以 ADV 文字框形式展现，支持背景 CG 切换。
  - title: 💬 表情与立绘联动
    details: 发送特定表情时自动触发角色立绘变化，让聊天更生动，还原 Galgame 临场感。
  - title: 🎬 多角色 / 多线剧情
    details: 支持创建不同「剧本组」，朋友可以选择角色身份，聊天记录像游戏分支一样回放。
  - title: 🚀 轻量级 Web 前端
    details: 基于 Vue 3 + WebSocket，无需安装客户端，浏览器打开即用，内存占用极低。
  - title: 🔌 开放协议对接
    details: 支持 OneBot 标准，可接入 QQ、Discord 等后端。
  - title: 🛠️ 高度自定义主题
    details: 内置多套 Galgame 风格皮肤（SP,千恋万花），支持用户上传自定背景和立绘。
---

<!-- 额外可以加一段引用或截图区域（NapCat 没有这部分，但可以保持干净） -->
<div style="text-align: center; margin-top: 2rem;">
  <p style="color: var(--vp-c-text-2);">✨ 让每一次「发送」都像按下游戏对话键 ✨</p>
</div>