# Retrolog 设计迁移 - 快速开始

## 🎉 迁移完成！

所有 retrolog 的设计元素已成功迁移到你的 Hexo 博客中。

## 🚀 立即使用

### 1. 查看效果

开发服务器已启动，访问：
```
http://localhost:4000
```

### 2. 创建新文章

#### 普通文章（Chronicle - 编年史）
```bash
npx hexo new "文章标题"
```

在 markdown 文件中：
```markdown
---
title: 数字时代的慢生活艺术
date: 2025-12-21
tags: [设计, 哲学]
---

你的文章内容...
```

#### 短想法（Echo - 回响）
```bash
npx hexo new tweet "今天的想法"
```

在 markdown 文件中：
```markdown
---
title: 今天的想法
date: 2025-12-21
layout: tweet
tags: [日常]
---

这是一段简短的思考，就像Twitter或微博一样...
```

### 3. 常用命令

```bash
# 清理缓存
npx hexo clean

# 生成静态文件
npx hexo generate

# 启动开发服务器
npx hexo server

# 部署到 GitHub Pages
npx hexo deploy
```

## ✨ 核心特性

### 已迁移的设计元素

✅ **视觉设计**
- 复古纸质背景（米色 + 纹理）
- 硬阴影效果（6px 黑色阴影）
- 思源宋体 + JetBrains Mono 字体
- 双语标签（中文 / English）

✅ **布局组件**
- 大标题页眉（hover 变斜体）
- Chronicle 卡片（白色 + 硬阴影）
- Echo 卡片（奶黄色 + 轻微旋转）
- 时间轴视觉效果
- 订阅表单页脚
- 文章详情页（首字母放大效果）

✅ **交互效果**
- 卡片 hover 动画
- 平滑过渡效果
- 响应式设计

## 🎨 自定义设计

### 修改颜色

编辑文件：`themes/aomori/source/stylesheets/retrolog.scss`

```scss
:root {
  --retrolog-bg-primary: #f4f1ea;    /* 背景色 */
  --retrolog-border: #2c2c2c;        /* 边框色 */
  --retrolog-text-primary: #2c2c2c;  /* 文字色 */
}
```

重新编译：
```bash
cd themes/aomori/source/stylesheets
sass retrolog.scss retrolog.css
```

### 修改标题

编辑文件：`themes/aomori/layout/_partial/header-retrolog.ejs`

```html
<a href="/">你的博客名</a>
<p class="header-subtitle">
    你的副标题
</p>
```

### 修改页脚引言

编辑文件：`themes/aomori/layout/_partial/footer-retrolog.ejs`

```html
<p class="footer-quote">"你的引言。"</p>
```

## 🤖 启用 AI 功能（可选）

### 1. 安装依赖
```bash
npm install @google/genai dotenv
```

### 2. 获取 API 密钥
访问：https://ai.google.dev/

### 3. 配置密钥
创建 `.env` 文件：
```bash
GEMINI_API_KEY=your_api_key_here
```

### 4. 使用 AI
在文章 front-matter 中添加：
```markdown
---
title: 我的文章
retrolog: true    # 自动生成摘要
polish: true      # 可选：AI 润色内容
---
```

### 5. 命令行工具
```bash
# 润色文本
node scripts/gemini-service.js polish "你的文本" chronicle

# 生成摘要
node scripts/gemini-service.js summary "文章内容"
```

## 📁 文件结构

```
themes/aomori/
├── layout/
│   ├── _partial/
│   │   ├── header-retrolog.ejs       # Retrolog 页眉
│   │   ├── footer-retrolog.ejs       # Retrolog 页脚
│   │   ├── article-index-retrolog.ejs # Chronicle 卡片
│   │   └── article-tweet-retrolog.ejs # Echo 卡片
│   ├── layout.ejs                    # 主布局
│   ├── index.ejs                     # 首页
│   └── post.ejs                      # 文章页
└── source/stylesheets/
    ├── retrolog.scss                 # 设计系统源文件
    └── retrolog.css                  # 编译后的样式

scripts/
├── gemini-service.js                 # AI 服务
└── retrolog-plugin.js                # 自动化插件
```

## 🐛 故障排除

### 样式未生效
```bash
# 1. 清理缓存
npx hexo clean

# 2. 重新编译 SCSS
cd themes/aomori/source/stylesheets
sass retrolog.scss retrolog.css

# 3. 重新生成
npx hexo generate
```

### AI 功能报错
如果不需要 AI 功能，忽略警告即可。
需要使用时：
```bash
npm install @google/genai dotenv
```

### 时间轴未显示
时间轴在小屏幕（< 768px）上会隐藏。
在桌面浏览器中查看效果。

## 📚 更多信息

详细文档：[RETROLOG_MIGRATION.md](RETROLOG_MIGRATION.md)

## ✅ 检查清单

- [x] Retrolog 设计已迁移
- [x] 样式文件已编译
- [x] 布局文件已更新
- [x] AI 插件已集成
- [x] 服务器已启动

享受你的 Retrolog 风格博客吧！🎊
