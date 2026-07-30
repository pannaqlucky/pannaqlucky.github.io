/**
 * build.js — 个人网站数据构建脚本
 *
 * 用法：node build.js
 * 功能：
 *   1. 读取 data/profile.json（个人信息）和 data/blog.json（博客文章）
 *   2. 扫描 Journals/、Conferences/ 文件夹中的 PDF 文件
 *   3. 扫描 Certifications & Awards/ 文件夹中的图片文件
 *   4. 生成 data.js（包含全部结构化数据）
 *
 * 维护方式：
 *   - 新增博客：编辑 data/blog.json
 *   - 新增论文：将 PDF 放入 Journals/ 或 Conferences/ 文件夹，运行 node build.js
 *   - 新增证书：将图片放入 Certifications & Awards/ 文件夹，运行 node build.js
 *   - 修改个人信息：编辑 data/profile.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ============================================================
// 工具函数
// ============================================================

function readJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function listFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith(ext.toLowerCase()))
    .map(f => path.join(dir, f));
}

function parseYYYYMMDD(filename) {
  // 匹配文件名开头的 8 位数字（YYYYMMDD）
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})/);
  if (match) {
    return { year: match[1], month: match[2], day: match[3] };
  }
  // 匹配 6 位数字（YYYYMM）
  const match6 = filename.match(/^(\d{4})(\d{2})(?!\d)/);
  if (match6) {
    return { year: match6[1], month: match6[2], day: null };
  }
  return null;
}

function cleanTitle(filename) {
  // 去掉扩展名
  let title = filename.replace(/\.(pdf|jpg|jpeg|png|gif|svg|webp)$/i, '');
  // 去掉开头的日期前缀（8位或6位数字 + 可能的 _
  title = title.replace(/^\d{6,8}[_\s-]*/, '');
  // 将下划线和连字符替换为空格
  title = title.replace(/[_-]+/g, ' ');
  // 压缩多余空格
  title = title.replace(/\s+/g, ' ').trim();
  // 恢复一些大小写（全大写转成合适的格式）
  if (title === title.toUpperCase() && title.length > 20) {
    // 大面积大写，可能是英文标题，保持原样
  }
  return title;
}

// 已知的期刊简称到全称的映射（用于显示 venue 信息）
const JOURNAL_MAP = {
  'JSCE': 'Journal of JSCE (Japan Society of Civil Engineers)',
  'AIIII': 'AIIII (Advanced Intelligent Information and Informatics International)',
  'Drones': 'Drones',
  'RRA': 'River Research and Applications',
  'Land': 'Land',
  'IAHR': 'IAHR',
  'HIC': 'HIC',
  'Hydroinformatics': 'Journal of Hydroinformatics',
  'Geographies': 'Geographies',
  'Digital Water': 'Digital Water',
  'ISEH': 'ISEH',
  'ISE': 'ISE',
};

function extractVenue(filename) {
  const name = filename.replace(/\.pdf$/i, '');
  for (const [key, full] of Object.entries(JOURNAL_MAP)) {
    if (name.toUpperCase().includes(key.toUpperCase())) {
      return full;
    }
  }
  return '';
}

// ============================================================
// 扫描论文
// ============================================================

function scanPublications(journalsDir, conferencesDir) {
  const journals = [];
  const conferences = [];

  // 扫描期刊论文
  const journalFiles = listFiles(journalsDir, '.pdf');
  journalFiles.forEach(filePath => {
    const filename = path.basename(filePath);
    const dateInfo = parseYYYYMMDD(filename);
    const title = cleanTitle(filename);
    const venue = extractVenue(filename);

    journals.push({
      title,
      year: dateInfo ? dateInfo.year : '',
      month: dateInfo ? dateInfo.month : '',
      venue: venue,
      file: filename
    });
  });

  // 按年份降序排列
  journals.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    if (a.month && b.month) return b.month.localeCompare(a.month);
    return 0;
  });

  // 扫描会议论文
  const conferenceFiles = listFiles(conferencesDir, '.pdf');
  conferenceFiles.forEach(filePath => {
    const filename = path.basename(filePath);
    const dateInfo = parseYYYYMMDD(filename);
    const title = cleanTitle(filename);
    const venue = extractVenue(filename);

    conferences.push({
      title,
      year: dateInfo ? dateInfo.year : '',
      month: dateInfo ? dateInfo.month : '',
      venue: venue || 'Conference',
      file: filename
    });
  });

  conferences.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    if (a.month && b.month) return b.month.localeCompare(a.month);
    return 0;
  });

  return { journals, conferences };
}

// ============================================================
// 扫描证书图片
// ============================================================

function scanCertifications(certDir) {
  const images = [];
  if (!fs.existsSync(certDir)) return images;

  const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const files = fs.readdirSync(certDir);

  files.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    if (exts.includes(ext)) {
      images.push({
        file: f,
        path: 'Certifications & Awards/' + f
      });
    }
  });

  return images;
}

// ============================================================
// 主程序
// ============================================================

function main() {
  console.log('🔧 正在构建网站数据...\n');

  // 读取 JSON 配置文件
  let profile, blog;
  try {
    profile = readJSON(path.join(ROOT, 'data', 'profile.json'));
    console.log('✓ 已读取 data/profile.json');
  } catch (e) {
    console.error('✗ 读取 data/profile.json 失败:', e.message);
    process.exit(1);
  }

  try {
    blog = readJSON(path.join(ROOT, 'data', 'blog.json'));
    console.log('✓ 已读取 data/blog.json');
  } catch (e) {
    console.error('✗ 读取 data/blog.json 失败:', e.message);
    process.exit(1);
  }

  // 扫描文件夹
  const journalsDir = path.join(ROOT, 'Journals');
  const conferencesDir = path.join(ROOT, 'Conferences');
  const certDir = path.join(ROOT, 'Certifications & Awards');

  const publications = scanPublications(journalsDir, conferencesDir);
  console.log(`✓ 已扫描 ${publications.journals.length} 篇期刊论文`);
  console.log(`✓ 已扫描 ${publications.conferences.length} 篇会议论文`);

  const certImages = scanCertifications(certDir);
  console.log(`✓ 已扫描 ${certImages.length} 张证书/荣誉图片`);

  // 构建完整数据对象
  const data = {
    profile,
    blog,
    publications,
    certImages,
    generatedAt: new Date().toISOString()
  };

  // 生成 data.js
  const jsContent = `/**
 * 此文件由 build.js 自动生成，请勿手动编辑。
 * 生成时间：${data.generatedAt}
 *
 * 维护方式：
 *   - 博客文章：编辑 data/blog.json，运行 node build.js
 *   - 个人信息：编辑 data/profile.json，运行 node build.js
 *   - 新增论文：将 PDF 放入 Journals/ 或 Conferences/ 文件夹，运行 node build.js
 *   - 新增证书：将图片放入 Certifications & Awards/ 文件夹，运行 node build.js
 */
window.SITE_DATA = ${JSON.stringify(data, null, 2)};
`;

  fs.writeFileSync(path.join(ROOT, 'data.js'), jsContent, 'utf-8');
  console.log('\n✓ 已生成 data.js');
  console.log('✅ 构建完成！现在可以打开 index.html 查看网站。');
}

main();
