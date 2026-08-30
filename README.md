# 3M-UI 文档

3M-UI 是一个轻量、现代的 Mihomo Web 管理面板。本仓库是官方文档站点，基于 [Docusaurus 3](https://docusaurus.io/) 构建。

## 本地预览

```bash
npm install
npm run start
```

浏览器打开 http://localhost:3000

## 构建

```bash
npm run build
```

静态文件输出到 `build/` 目录。

## 文档结构

| 目录 | 说明 |
|------|------|
| `docs/` | Markdown 文档源文件 |
| `src/` | React 页面与自定义样式 |
| `static/` | 静态资源（图片等） |
| `sidebars.js` | 侧边栏导航配置 |

## 贡献

直接编辑 `docs/` 下的 Markdown 文件，提交 PR 即可。每个页面顶部需要 frontmatter：

```yaml
---
id: page-slug
title: 页面标题
---
```

## 许可证

EPL-2.0
