/**
 * build.js — 个人网站数据构建脚本
 *
 * 用法：node build.js
 * 功能：
 *   1. 读取 data/profile.json（个人信息）和 data/blog.json（博客文章）
 *   2. 扫描 Journals/、Conferences/ 文件夹中的 PDF 文件
 *   3. 扫描 Certifications & Awards/ 文件夹解析证书荣誉信息
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
  const exts = Array.isArray(ext) ? ext : [ext];
  return fs.readdirSync(dir)
    .filter(f => exts.some(e => f.toLowerCase().endsWith(e.toLowerCase())))
    .map(f => path.join(dir, f));
}

function parseYYYYMMDD(filename) {
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})/);
  if (match) return { year: match[1], month: match[2], day: match[3], full: `${match[1]}-${match[2]}-${match[3]}`, display: `${match[1]}年${match[2]}月${match[3]}日` };
  const match6 = filename.match(/^(\d{4})(\d{2})(?!\d)/);
  if (match6) return { year: match6[1], month: match6[2], day: null, full: `${match6[1]}-${match6[2]}`, display: `${match6[1]}年${match6[2]}月` };
  return null;
}

function cleanTitle(filename) {
  let title = filename.replace(/\.(pdf|jpg|jpeg|png|gif|svg|webp)$/i, '');
  title = title.replace(/^\d{6,8}[_\s-]*/, '');
  title = title.replace(/[_-]+/g, ' ');
  title = title.replace(/\s+/g, ' ').trim();
  return title;
}

const JOURNAL_MAP = {
  'JSCE': 'Journal of JSCE',
  'AIIII': 'AIIII',
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
    if (name.toUpperCase().includes(key.toUpperCase())) return full;
  }
  return '';
}

// ============================================================
// 扫描论文
// ============================================================

function scanPublications(journalsDir, conferencesDir) {
  const journals = [];
  const conferences = [];

  listFiles(journalsDir, '.pdf').forEach(filePath => {
    const filename = path.basename(filePath);
    const dateInfo = parseYYYYMMDD(filename);
    journals.push({
      title: cleanTitle(filename),
      year: dateInfo ? dateInfo.year : '',
      month: dateInfo ? dateInfo.month : '',
      venue: extractVenue(filename),
      file: filename
    });
  });
  journals.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    if (a.month && b.month) return b.month.localeCompare(a.month);
    return 0;
  });

  listFiles(conferencesDir, '.pdf').forEach(filePath => {
    const filename = path.basename(filePath);
    const dateInfo = parseYYYYMMDD(filename);
    conferences.push({
      title: cleanTitle(filename),
      year: dateInfo ? dateInfo.year : '',
      month: dateInfo ? dateInfo.month : '',
      venue: extractVenue(filename) || 'Conference',
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
// 扫描并解析证书荣誉
// ============================================================

const ORG_MAP = {
  'SUT': '沈阳工业大学',
  'OU': '冈山大学',
  'GKR': 'GKR',
  'DeepLearning.AI': 'DeepLearning.AI',
  'JSCE': 'JSCE (日本土木学会)',
  'AIIII': 'AIIII',
  'OpenEurope': 'OpenEurope',
  'Nature': 'Nature',
  'TOEIC': 'TOEIC',
  'JLPT': 'JLPT',
  'CET4': 'CET-4',
  'CET6': 'CET-6',
  'NCRE': 'NCRE',
  'CEAC': 'CEAC',
  'ZHC': 'ZHC',
  'PSH': 'PSH',
  'CSCSE': '教育部留学服务中心',
  'PLC': 'PLC',
  'MIT': 'MIT (冈山大学联合课程)',
  'TU Delft': 'TU Delft',
  'IEEE': 'IEEE',
  'ARCI': 'ARCI',
};

const CERT_TITLE_MAP = {
  // Degree & Education
  'Ph.D': 'Ph.D. 博士学位',
  'PhD': 'Ph.D. 博士学位',
  'MS_CSCSE': '硕士学位认证 (留服)',
  'PhD_CSCSE': '博士学位认证 (留服)',
  'B.E._CSCSE': '学士学位认证 (留服)',
  'MS': '硕士学位',
  'PSH': 'PSH',
  'PSH4': 'PSH 4',

  // Awards
  '优秀军训学员': '优秀军训学员',
  '校优秀团员': '优秀团员',
  '校优秀学生干部': '优秀学生干部',
  '结构设计大赛优秀奖': '结构设计大赛优秀奖',
  '校三年等奖学金': '三等奖学金',
  '校优秀毕业生': '优秀毕业生',
  '优秀员工': '优秀员工',
  'Potential_Award': 'Potential Award',
  'Excellent_Work': 'Excellent Work',
  'HighLight_Paper': 'Highlight Paper',
  'Outstanding_Discussion': 'Outstanding Discussion (B1)',
  "Dean's Scientific Award": "Dean's Scientific Award",
  'Certificate of Commendation': "Dean's Scientific Award",

  // Research
  'ResearchFee': '研究费资助',
  'OU-SPRING': 'OU-SPRING 博士研究员',
  'Hackthon': 'Hackathon 参赛',
  'Summer Research Symposium': 'Summer Research Symposium',

  // Language & Computer
  'TOEIC_710': 'TOEIC 710分',
  'JLPT_N2_93': 'JLPT N2 (93/180)',
  'CET4': 'CET-4 大学英语四级',
  'CET6': 'CET-6 大学英语六级',
  'Grade2_C': '全国计算机等级考试二级C',
  'NCRE': '全国计算机等级考试',
  'ZHC': '国家职业汉语能力测试 (ZHC)',
  'ZHC2': '国家职业汉语能力测试 (ZHC)',
  'ZHC_1': '国家职业汉语能力测试 (ZHC)',
  'ZHC_2': '国家职业汉语能力测试 (ZHC)',
  'ZHC_3': '国家职业汉语能力测试 (ZHC)',
  'ZHC3': '国家职业汉语能力测试 (ZHC)',
  'CEAC': 'CEAC AutoCAD 2012',

  // Professional
  'Pythonで学ぶビジネスデータ分析入門': 'Python商业数据分析入门',
  'はじめてのAI': 'AI入门',
  'コンピュータサイエンスとプログラムミング入門-Part1': 'MIT 计算机科学与编程入门 (Part 1)',
  'コンピュータサイエンスとプログラムミング入門-Part2': 'MIT 计算机科学与编程入门 (Part 2)',
  'Drinking Water_Treatment': '饮用水处理 (TU Delft)',
  'DeepLearning.AI': 'DeepLearning.AI 专项课程',
  'Web×IoT修了証': 'Web × IoT 修了证书',
  '人工智能训练师（高级）': '人工智能训练师（高级）',
  'Advanced Computer Vision with OpenCV and Python': 'Advanced Computer Vision with OpenCV and Python',
  'Predict the Gender and Age Using OpenCV': 'Predict Gender and Age Using OpenCV',
  'Vehicle Counting, Classification & Detection using_Computer Vision': 'Vehicle Counting, Classification & Detection',
  'PLC_Application_Technology': 'PLC 应用技术',
  'AI_Large_Model_Trainig': 'AI 大模型训练',
  'Intelligent Production Line Design and Integration Technology': '智能产线设计与集成技术',
  'Installation & Testing of Automatic Production Line': '自动产线安装与调试',
  'Industrial robots and intelligent manufacturing': '工业机器人与智能制造',
  'Autonomous intelligent systems and self-driving vehicles': '自主智能系统与自动驾驶',
  'Artificial Intelligence Models and Algorithms': '人工智能模型与算法',
  'Artificial Intelligence and Society': '人工智能与社会',
  'Engineering_Photogrammetry': '工程摄影测量',
  'High-end_Equipment_Innovation_Project': '高端装备创新项目',
  'Eloquence_and_Speech': '演讲与口才',

  // Management
  'OpenEurope_MBA': 'OpenEurope MBA',
  'OpenEurope_Coaching_and_Mentoring': 'OpenEurope Coaching & Mentoring',
  'OpenEurope_Collaborative_Management': 'OpenEurope Collaborative Management',
  'OpenEurope_Markrting_Organization_and_Planning': 'OpenEurope Marketing & Planning',

  // Belt & Road
  '非传统安全威胁评估以及应对': '非传统安全威胁评估与应对',
  'Space-based disaster mitigation': '太空减灾与一带一路',
  'Space Archaeology and the Protection of Cultural Heritage': '太空考古与文化遗产保护',
  'National language capabilities': '国家语言能力与一带一路',
  'Population security issues': '人口安全问题与一带一路',

  // Academic Service
  'Certificate_Reviewer_ARCI-2026': 'ARCI-2026 审稿人',
  'Reviewer of Science and Engineering': 'Science and Engineering 审稿人',
  'Editoral Board Member': '编辑委员会成员',
  'Nature_PeerReview': 'Nature 同行评审认证',
  '学术桥论文辅导': '学术桥论文辅导',

  // Technology Transfer
  'Shzhen-Hong Kong Joint Training Program for International Technology Transfer Professionals': '深港国际技术经理人培训',
  'Certificate_of_Attendance': '培训出席证书',
};

function parseCertFilename(filename) {
  const nameNoExt = filename.replace(/\.(pdf|jpg|jpeg|png|gif|svg|webp)$/i, '');
  const dateInfo = parseYYYYMMDD(filename);

  // Try to map to a known title
  let displayName = '';
  for (const [key, val] of Object.entries(CERT_TITLE_MAP)) {
    if (nameNoExt.includes(key)) {
      displayName = val;
      break;
    }
  }
  if (!displayName) {
    displayName = cleanTitle(filename);
  }

  // Deduplicate: if multiple files map to same display name
  // (e.g., multiple ZHC pages, multiple Installation & Testing dates)

  // Find organization
  let org = '';
  for (const [key, val] of Object.entries(ORG_MAP)) {
    if (nameNoExt.includes(key)) {
      org = val;
      break;
    }
  }

  return {
    display: displayName,
    date: dateInfo ? dateInfo.display : '',
    dateSort: dateInfo ? dateInfo.full : '',
    org: org,
    file: filename
  };
}

function categorizeCert(item) {
  const d = item.display + ' ' + item.file;
  const rules = [
    { cat: '学位与学历认证', keys: ['Ph.D.', '博士学位', '硕士学位认证', '学士学位认证', '硕士学位', 'PSH'] },
    { cat: '奖项与荣誉', keys: ['优秀', '奖学金', 'Award', 'Excellent', 'Highlight', 'Outstanding', '表彰', 'Dean'] },
    { cat: '研究资助与学术活动', keys: ['ResearchFee', '研究费', 'SPRING', 'Hackthon', 'Symposium'] },
    { cat: '学术服务', keys: ['Reviewer', '审稿人', 'Editoral', '编辑', 'PeerReview', '学术桥'] },
    { cat: '语言与计算机考试', keys: ['TOEIC', 'JLPT', 'CET-', 'NCRE', 'ZHC', 'CEAC', '等级考试'] },
    { cat: '专业技能认证', keys: ['Python', 'AI', 'DeepLearning', 'OpenCV', 'PLC', '产线', 'Computer Vision', 'Vehicle', 'Gender', '大模型', '人工智能训练师'] },
    { cat: '管理培训', keys: ['MBA', 'Coaching', 'Mentoring', 'Collaborative', 'Marketing'] },
    { cat: '一带一路专项课程', keys: ['非传统安全', 'Space-based', 'Space Archaeology', 'National language', 'Population security', 'Belt and Road'] },
    { cat: '前沿科技课程', keys: ['Industrial robots', 'intelligent manufacturing', 'Autonomous', 'self-driving', 'MIT'] },
    { cat: '工程技术认证', keys: ['Engineering_Photogrammetry', 'TU Delft', 'Web×IoT', '饮用水'] },
    { cat: '高端装备与创新', keys: ['High-end', '高端装备'] },
    { cat: '软技能培训', keys: ['Eloquence', 'Speech', '演讲'] },
    { cat: '技术转移与跨境合作', keys: ['技术经理人', 'Attendance'] },
  ];

  for (const rule of rules) {
    if (rule.keys.some(k => d.includes(k))) return rule.cat;
  }
  return '其他';
}

function scanCertifications(certDir) {
  const all = [];
  if (!fs.existsSync(certDir)) return { items: [], categories: {} };

  const exts = ['.jpg', '.jpeg', '.png', '.pdf', '.gif', '.webp'];
  const files = fs.readdirSync(certDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return exts.includes(ext) && f !== 'Certifications & Awards.docx';
  });

  files.forEach(f => {
    const item = parseCertFilename(f);
    item.category = categorizeCert(item);
    all.push(item);
  });

  // Sort by date descending
  all.sort((a, b) => b.dateSort.localeCompare(a.dateSort));

  // Group by category
  const categories = {};
  all.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    // Deduplicate: skip if same display name already in category
    const exists = categories[item.category].some(e => e.display === item.display);
    if (!exists) {
      categories[item.category].push(item);
    }
  });

  return { items: all, categories };
}

// ============================================================
// 主程序
// ============================================================

function main() {
  console.log('🔧 正在构建网站数据...\n');

  let profile, profileEN, blog, zhihu = [];
  try {
    profile = readJSON(path.join(ROOT, 'data', 'profile.json'));
    console.log('✓ 已读取 data/profile.json');
  } catch (e) {
    console.error('✗ 读取 data/profile.json 失败:', e.message);
    process.exit(1);
  }

  try {
    profileEN = readJSON(path.join(ROOT, 'data', 'profile.en.json'));
    console.log('✓ 已读取 data/profile.en.json (English)');
  } catch (e) {
    console.log('⚠ 未找到 data/profile.en.json, 英文版使用中文数据');
    profileEN = profile;
  }

  try {
    blog = readJSON(path.join(ROOT, 'data', 'blog.json'));
    console.log('✓ 已读取 data/blog.json');
  } catch (e) {
    console.error('✗ 读取 data/blog.json 失败:', e.message);
    process.exit(1);
  }

  try {
    zhihu = readJSON(path.join(ROOT, 'data', 'zhihu.json'));
    if (zhihu.length > 0) console.log(`✓ 已读取 data/zhihu.json (${zhihu.length} 篇文章)`);
  } catch (e) { /* zhihu.json optional */ }

  const journalsDir = path.join(ROOT, 'Journals');
  const conferencesDir = path.join(ROOT, 'Conferences');
  const certDir = path.join(ROOT, 'Certifications & Awards');

  const publications = scanPublications(journalsDir, conferencesDir);
  console.log(`✓ 已扫描 ${publications.journals.length} 篇期刊论文`);
  console.log(`✓ 已扫描 ${publications.conferences.length} 篇会议论文`);

  const certifications = scanCertifications(certDir);
  let totalItems = 0;
  for (const cat in certifications.categories) totalItems += certifications.categories[cat].length;
  console.log(`✓ 已扫描 ${totalItems} 项证书/荣誉（${Object.keys(certifications.categories).length} 个分类）`);

  // Override profile.certifications with auto-generated data
  profile.certifications = certifications.categories;
  profileEN.certifications = certifications.categories;

  const data = {
    profile,
    profileEN,
    blog,
    zhihu,
    publications,
    generatedAt: new Date().toISOString()
  };

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
  console.log('✅ 构建完成！');
}

main();
