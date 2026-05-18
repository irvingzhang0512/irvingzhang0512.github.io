# 清欢AI知行录

基于 [Hexo](https://hexo.io/) + [NexT](https://theme-next.js.org/) 的 AI 技术博客，自动部署到 GitHub Pages。

> 访问地址：**[https://irvingzhang0512.github.io](https://irvingzhang0512.github.io)**

---

## 项目结构

```
cc_blogs/
├── _config.yml              # Hexo 主配置（站点信息、URL、部署）
├── _config.next.yml         # NexT 主题配置（菜单、暗黑模式、样式）
├── scripts/
│   └── deploy-blogs.js      # 自动化部署脚本
├── source/
│   └── _posts/              # 所有文章（Markdown）
└── public/                  # 生成的静态文件（hexo generate 产生）
```

---

## 发布流程

### 前置条件

- [Node.js](https://nodejs.org/) >= 18
- Git + SSH 密钥已配置（可访问目标 GitHub 仓库）

```bash
# 首次使用需安装依赖
npm install
```

### 自动化发布

由外部程序生成带完整 YAML front-matter 的 .md 文件，脚本负责复制并部署：

```bash
node scripts/deploy-blogs.js <hexo格式化.md文件>

# 示例
node scripts/deploy-blogs.js ./output/hexo/daily_report_20260514.md
```

### 脚本做了什么

1. 接收已包含完整 front-matter 的 .md 文件
2. 复制到 `source/_posts/` 目录（自动添加日期和时间戳前缀）
3. 执行 `hexo clean` 清理旧文件
4. 执行 `hexo generate` 生成静态文件
5. 执行 `hexo deploy` 推送到 GitHub Pages

---

## 本地预览

```bash
npm run server
```

浏览器打开 `http://localhost:4000/` 即可预览。

---

## 部署目标

- **仓库：** `irvingzhang0512/irvingzhang0512.github.io`
- **分支：** `main`
- **认证方式：** SSH (`git@github.com:irvingzhang0512/irvingzhang0512.github.io.git`)

如需修改，编辑 `_config.yml` 中 `deploy` 部分。
