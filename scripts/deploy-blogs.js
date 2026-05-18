/**
 * 将已生成的 Hexo 格式 .md 文件部署到 Hexo + GitHub Pages
 *
 * 此脚本不做任何内容修改 —— 输入的 .md 文件应该已经包含
 * 完整的 YAML front-matter（由 HexoRenderer 生成）。
 * 脚本只负责：复制到 source/_posts/ → hexo g → hexo d
 *
 * 用法:
 *   node scripts/deploy-blogs.js ./output/hexo/daily_report_20260514.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ═══════════════════════════════════════════════════════
// 配置
// ═══════════════════════════════════════════════════════

const HEXO_ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(HEXO_ROOT, 'source', '_posts');

// ═══════════════════════════════════════════════════════
// 参数解析
// ═══════════════════════════════════════════════════════

const filePath = process.argv[2];

if (!filePath) {
  console.error('用法: node deploy-blogs.js <hexo格式化.md文件>');
  console.error('示例: node deploy-blogs.js ./output/hexo/daily_report_20260514.md');
  process.exit(1);
}

const absPath = path.resolve(filePath);
if (!fs.existsSync(absPath)) {
  console.error('[错误] 文件不存在:', absPath);
  process.exit(1);
}

// ═══════════════════════════════════════════════════════
// 复制到 _posts + 部署
// ═══════════════════════════════════════════════════════

const now = new Date();
const today = now.toISOString().split('T')[0];
const timestamp = now.toISOString().split('T')[1].replace(/:/g, '').split('.')[0];
const srcName = path.basename(absPath, path.extname(absPath));
const destName = `${today}-${timestamp}-${srcName}.md`;
const dest = path.join(POSTS_DIR, destName);

// 复制文件（内容不做任何修改）
fs.copyFileSync(absPath, dest);
console.log(`[复制] ${srcName}.md -> source/_posts/${destName}`);

const HEXO_BIN = path.join(HEXO_ROOT, 'node_modules', '.bin', 'hexo');

try {
  console.log('[Hexo] 清理旧文件...');
  execSync(`"${HEXO_BIN}" clean`, { cwd: HEXO_ROOT, stdio: 'inherit' });

  console.log('[Hexo] 构建静态文件...');
  execSync(`"${HEXO_BIN}" generate`, { cwd: HEXO_ROOT, stdio: 'inherit' });

  console.log('[Hexo] 部署到 GitHub Pages...');
  execSync(`"${HEXO_BIN}" deploy`, { cwd: HEXO_ROOT, stdio: 'inherit' });

  console.log('\n部署完成！访问 https://irvingzhang0512.github.io 查看');
} catch (err) {
  console.error('[错误] Hexo 部署失败:', err.message);
  process.exit(1);
}
