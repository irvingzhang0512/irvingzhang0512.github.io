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

## 内容分类与标签

### 分类（两级）

所有文章归入父分类 `AI自动生成`，标识自动化产出内容：

```
AI自动生成          ← 父分类
├── AI中文日报      ← 中文 AI 资讯聚合
├── AI英文日报      ← 英文 AI 资讯聚合
└── AI论文日报      ← 论文速递（预留）
```

Hexo 实现方式：`categories: [AI自动生成, AI中文日报]`

### 标签（内容类型）

标签只标注内容类型，不标注语言和主题：

| 标签 | 适用 |
|------|------|
| `AI资讯` | 中英文日报（资讯聚合类） |
| `AI论文` | 论文日报（预留） |

设计原则：分类负责层级归属（产出方式 + 语言），标签只区分内容形态。语言由子分类承载，不做重复标注。

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
