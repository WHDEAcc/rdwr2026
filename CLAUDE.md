# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

景观设计工作室 "Verdant Vision" 的作品集网站，由 Google AI Studio 导出。单页应用，包含 AI 设计顾问聊天功能（基于 Gemini API）。

## 技术栈

- React 19 + TypeScript，Vite 构建
- Tailwind CSS 通过 CDN 引入（`<script src="https://cdn.tailwindcss.com">`），**不是 npm 依赖**，自定义主题配置在 `index.html` 的内联 `<script>` 中
- Google Gemini API (`@google/genai`) 用于 AI 聊天功能
- 无路由库、无全局状态管理、无后端

## 常用命令

```bash
npm run dev      # 启动开发服务器 (端口 3000, host 0.0.0.0)
npm run build    # 生产构建 (输出到 dist/)
npm run preview  # 预览生产构建
```

无测试框架、无 linter 配置。

## 架构要点

- **平铺结构**：所有源码文件在根目录，组件在 `components/` 下，无 `src/` 目录
- `App.tsx` 为根组件，按页面区块线性组装：Header → Hero → SocialProof → Services → Portfolio → Philosophy → Testimonials → TrustBadges → LeadCapture → Footer
- 展示数据全部硬编码在 `constants.ts`（`PROJECTS`, `SERVICES`, `PHILOSOPHY`, `TESTIMONIALS`），类型定义在 `types.ts`
- 页内导航使用锚点链接（`#portfolio`, `#services`, `#testimonials`, `#contact`）

### 模态框交互模式

`App.tsx` 管理两个模态框的状态，通过 props 传递开关：
- `DesignConsultant`：AI 聊天对话框，由 Hero 区域按钮触发 `setShowAI(true)`
- `ProjectDetail`：项目详情弹窗（含图片轮播），由 `ProjectCard` 点击触发 `setSelectedProject(project)`

两个模态框均支持 Escape 键关闭、锁定 body 滚动、`aria-modal` 无障碍属性。

### AI 聊天

- 逻辑集中在 `components/DesignConsultant.tsx`，直接实例化 `GoogleGenAI` 调用 Gemini SDK，无 API 抽象层
- 每次发送消息都创建新的 `GoogleGenAI` 实例（无对话上下文保持）
- 使用模型：`gemini-3-flash-preview`
- Gemini API 密钥通过 `.env.local` 中的 `GEMINI_API_KEY` 配置，`vite.config.ts` 通过 `define` 注入为 `process.env.API_KEY` 和 `process.env.GEMINI_API_KEY`

### 模块解析

`index.html` 中有 `importmap`（映射 react/react-dom/@google/genai 到 esm.sh CDN），这是 Google AI Studio 导出的遗留配置。Vite 开发/构建时使用 `node_modules`，importmap 不生效。

## 样式约定

自定义颜色主题定义在 `index.html` 的 `tailwind.config`：
- `sage: #8FA79A`, `earth: #5D4E37`, `warmBeige: #F5F0E8`, `accent: #B8860B`
- 字体：Playfair Display（衬线，用于标题 `font-serif`）+ Inter（无衬线，用于正文 `font-sans`）
- 自定义动画 `fadeInUp` 和滚动条样式定义在 `index.html` 的 `<style>` 标签中

## 路径别名

`@/*` 映射到项目根目录（`tsconfig.json` 和 `vite.config.ts` 均已配置）。
