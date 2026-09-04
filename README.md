# Bullshit Practice

基于 [Hugo](https://gohugo.io/) 和 [Stacknote](https://github.com/myimilo/hugo-theme-stacknote) 的个人博客。

## 本地预览

需要 Hugo Extended 0.160.0 或更高版本：

```bash
git clone --recurse-submodules https://github.com/MarkRushB/markrushb.github.io.git
cd markrushb.github.io
hugo server -D
```

文章放在 `content/articles/`。新建文章：

```bash
hugo new content articles/my-post.md
```

推送到 `main` 后，GitHub Actions 会自动构建并部署 GitHub Pages。
