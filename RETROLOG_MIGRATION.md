# Retrolog 设计迁移说明

## 概述

已成功将 `retrolog` 文件夹中的完整设计系统迁移到 Hexo Aomori 主题中。所有设计元素都已保留，包括：

## ✅ 已迁移的设计元素

### 1. **视觉设计系统**
- ✅ 复古纸质背景（米色 #f4f1ea + 纹理）
- ✅ 硬阴影效果（6px 6px 0px #2c2c2c）
- ✅ 字体系统：
  - 思源宋体（Noto Serif SC）用于正文
  - JetBrains Mono 用于代码和标签
  - Inter 用于辅助文本
- ✅ 颜色方案：深色边框、米色背景、分层的灰度文本

### 2. **布局组件**

#### Header（页眉）
- ✅ 大标题 "复古日志"（4.5rem，hover 时变斜体）
- ✅ 副标题："CHRONICLE & ECHO — 寻找数字生活的留白与深度"
- ✅ 导航栏：存档 / Archive，关于 / About
- ✅ 双语标签样式（中文 / English）

#### Chronicle Card（编年史卡片）
- ✅ 白色卡片 + 硬阴影 + 2px 深色边框
- ✅ 时间轴左侧锚点（圆点）
- ✅ 日期 + 类型标签（深度编年史 / CHRONICLE）
- ✅ 大标题（3rem serif 字体）
- ✅ 引用样式的摘要（左侧 2px 边框）
- ✅ 标签展示
- ✅ "阅读全文 / READ" 按钮
- ✅ 右侧箭头图标
- ✅ Hover 效果：整体上移左移，锚点变色

#### Echo Card（回响卡片）
- ✅ 奶黄色卡片（#fffcf0）
- ✅ 轻微旋转（-0.3deg）
- ✅ 大引号装饰背景
- ✅ 斜体引用样式内容
- ✅ 底部装饰线条
- ✅ Hover 效果：旋转归零，上移

#### Timeline（时间轴）
- ✅ 左侧垂直灰线
- ✅ 侧边旋转日期标签
- ✅ 不同类型文章的锚点样式

#### Footer（页脚）
- ✅ 订阅表单卡片（硬阴影样式）
- ✅ "书信往来" 标题
- ✅ 邮箱输入框 + 订阅按钮
- ✅ 引言："媒介即讯息。"
- ✅ 版权信息："Designed with intention • 2025"

### 3. **文章详情页**
- ✅ "返回归档 / BACK" 按钮
- ✅ 大标题（4.5rem）
- ✅ 标签圆角展示
- ✅ 正文样式：
  - 首字母放大效果
  - 标题左侧 4px 边框
  - 行高 2.0 提升可读性
  - 引用块样式

### 4. **AI 功能集成**

#### Gemini AI 服务
- ✅ `/scripts/gemini-service.js` - AI 服务核心
  - `polishPost()` - 润色文章
  - `generateSummary()` - 生成摘要
  - 支持命令行使用

#### Hexo 插件
- ✅ `/scripts/retrolog-plugin.js` - 自动化插件
  - 自动为标记文章生成摘要
  - 可选的内容润色
  - 辅助函数

### 5. **响应式设计**
- ✅ 移动端适配
- ✅ 时间轴在小屏幕隐藏
- ✅ 字体大小自适应
- ✅ 卡片内边距调整

### 6. **交互动画**
- ✅ 渐入动画（fadeInUp）
- ✅ Hover 过渡效果
- ✅ 按钮状态变化
- ✅ 平滑滚动

## 📁 文件结构

```
themes/aomori/
├── layout/
│   ├── _partial/
│   │   ├── header-retrolog.ejs       # 新：Retrolog 风格页眉
│   │   ├── footer-retrolog.ejs       # 新：Retrolog 风格页脚
│   │   ├── article-index-retrolog.ejs # 新：Chronicle 卡片
│   │   └── article-tweet-retrolog.ejs # 新：Echo 卡片
│   ├── layout.ejs                    # 已修改：使用新布局
│   ├── index.ejs                     # 已修改：时间轴布局
│   └── post.ejs                      # 已修改：文章详情页
└── source/
    └── stylesheets/
        ├── retrolog.scss             # 新：完整设计系统
        └── retrolog.css              # 新：编译后的 CSS

scripts/
├── gemini-service.js                 # 新：Gemini AI 服务
└── retrolog-plugin.js                # 新：Hexo 自动化插件
```

## 🚀 使用方法

### 基本使用

博客现在会自动使用 Retrolog 设计。无需额外配置。

### 文章类型

1. **Chronicle（编年史）** - 常规文章
   ```markdown
   ---
   title: 文章标题
   date: 2024-05-20
   tags: [设计, 哲学]
   ---
   ```

2. **Echo（回响）** - 短想法/微博
   ```markdown
   ---
   title: 短想法
   date: 2024-05-19
   layout: tweet
   tags: [日常]
   ---
   ```

### AI 功能（可选）

#### 1. 安装依赖
```bash
npm install @google/genai dotenv
```

#### 2. 配置 API 密钥
在项目根目录创建 `.env` 文件：
```bash
GEMINI_API_KEY=your_api_key_here
```

#### 3. 在文章中启用 AI
```markdown
---
title: 我的文章
retrolog: true    # 自动生成摘要
polish: true      # 可选：润色内容
---
```

#### 4. 命令行使用
```bash
# 润色文章
node scripts/gemini-service.js polish "你的文本" chronicle

# 生成摘要
node scripts/gemini-service.js summary "完整文章内容"
```

## 🎨 自定义

### 修改颜色
编辑 `themes/aomori/source/stylesheets/retrolog.scss`：

```scss
:root {
  --retrolog-bg-primary: #f4f1ea;    /* 主背景色 */
  --retrolog-border: #2c2c2c;        /* 边框颜色 */
  --retrolog-text-primary: #2c2c2c;  /* 主文本色 */
  /* ... */
}
```

### 修改字体
```scss
:root {
  --retrolog-font-serif: "Noto Serif SC", serif;
  --retrolog-font-mono: 'JetBrains Mono', monospace;
  --retrolog-font-sans: 'Inter', sans-serif;
}
```

### 重新编译样式
```bash
cd themes/aomori/source/stylesheets
sass retrolog.scss retrolog.css
```

## 🔧 构建和部署

```bash
# 清除缓存
hexo clean

# 生成静态文件
hexo generate

# 本地预览
hexo server

# 部署
hexo deploy
```

## 📝 注意事项

1. **SCSS 编译**：修改 `.scss` 文件后需要重新编译
2. **缓存清理**：设计更新后建议运行 `hexo clean`
3. **AI 功能**：需要 Google Gemini API 密钥，可选功能
4. **兼容性**：已在现代浏览器测试通过

## 🎯 核心特性保留清单

- ✅ 复古纸质美学
- ✅ 硬阴影设计语言
- ✅ 时间轴视觉呈现
- ✅ Chronicle/Echo 双类型
- ✅ 双语界面标签
- ✅ 响应式布局
- ✅ 平滑动画效果
- ✅ AI 内容增强（可选）
- ✅ 首字母放大
- ✅ 引用样式排版
- ✅ Monospace 标签
- ✅ 订阅表单设计
- ✅ 移动端优化

## 📊 设计对比

| 原始 Retrolog | Hexo 迁移版 | 状态 |
|--------------|-----------|------|
| React + Vite | Hexo EJS | ✅ 已转换 |
| Tailwind CSS | 自定义 SCSS | ✅ 已实现 |
| TypeScript | JavaScript | ✅ 已适配 |
| Client-side | Static SSG | ✅ 已优化 |
| Gemini API | Node Script | ✅ 已集成 |

所有视觉设计 100% 保留！

## 🤝 贡献

欢迎提出改进建议和问题报告。

## 📄 许可

遵循原项目许可协议。
