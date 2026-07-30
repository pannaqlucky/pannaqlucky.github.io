/**
 * script.js — 个人网站交互脚本
 * 从 data.js（由 build.js 生成）读取全部数据，动态渲染页面。
 */

function D() { return window.SITE_DATA; }

// ===== Navbar =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ===== Hero =====
(function renderHero() {
  const p = D().profile;
  document.getElementById('heroContent').innerHTML = `
    <div class="hero-avatar"><span>${p.name.charAt(0)}</span></div>
    <h1 class="hero-name">${p.name} <span class="hero-name-en">${p.nameEn}</span></h1>
    <p class="hero-title">${p.title}</p>
    <p class="hero-institution">${p.institution} — ${p.field}</p>
    <p class="hero-location">${p.location}</p>
    <div class="hero-actions">
      <a href="#publications" class="btn">学术论文</a>
      <a href="#blog" class="btn btn-outline">阅读博客</a>
    </div>
  `;
})();

// ===== About =====
(function renderAbout() {
  const p = D().profile;
  const container = document.getElementById('aboutContent');

  container.innerHTML = `
    <div class="about-card">
      <h3>个人简介</h3>
      ${p.bio.map(b => `<p>${b}</p>`).join('')}
    </div>
    <div class="about-card">
      <h3>教育经历</h3>
      <ul class="timeline">
        ${p.education.map(e => `
          <li><span class="tl-year">${e.year}</span><span class="tl-text">${e.degree} — ${e.school}</span></li>
        `).join('')}
      </ul>
    </div>
    <div class="about-card">
      <h3>语言能力</h3>
      <div class="lang-grid">
        ${p.languages.map(l => `
          <div class="lang-item">
            <span class="lang-name">${l.name}</span>
            <div class="lang-bar"><div class="lang-fill" style="width:${l.percent}%"></div></div>
            <span class="lang-level">${l.level}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
})();

// ===== Research =====
(function renderResearch() {
  document.getElementById('researchContent').innerHTML = D().profile.researchAreas.map(r => `
    <div class="research-card">
      <div class="research-icon">${r.icon}</div>
      <h3>${r.title}</h3>
      <p>${r.desc}</p>
    </div>
  `).join('');
})();

// ===== Publications =====
(function renderPublications() {
  const pub = D().publications;
  const journals = pub.journals || [];
  const conferences = pub.conferences || [];

  // Stats
  const numJ = journals.length;
  const numC = conferences.length;
  const venues = new Set(journals.map(j => j.venue).filter(Boolean));
  document.getElementById('pubStats').innerHTML = `
    <div class="stat-item"><span class="stat-num">${numJ}</span><span class="stat-label">期刊论文</span></div>
    <div class="stat-item"><span class="stat-num">${numC}</span><span class="stat-label">会议论文</span></div>
    <div class="stat-item"><span class="stat-num">${venues.size}+</span><span class="stat-label">期刊覆盖</span></div>
    <div class="stat-item"><span class="stat-num">${D().profile.researchAreas.length}</span><span class="stat-label">研究领域</span></div>
  `;

  // Tabs
  document.getElementById('pubTabs').innerHTML = `
    <button class="pub-tab active" data-tab="journals">期刊论文 (${numJ})</button>
    <button class="pub-tab" data-tab="conferences">会议论文 (${numC})</button>
  `;

  // Journals list
  document.getElementById('journalsList').innerHTML = journals.slice(0, 20).map(j => `
    <div class="pub-item">
      <span class="pub-year">${j.year}</span>
      <div class="pub-info">
        <h4>${j.title}</h4>
        <span class="pub-venue">${j.venue || 'Journal'}</span>
      </div>
    </div>
  `).join('') + (journals.length > 20 ? `<div class="pub-item pub-more"><span>... 还有 ${journals.length - 20} 篇论文（请查看 Journals/ 文件夹）</span></div>` : '');

  // Conferences list
  document.getElementById('conferencesList').innerHTML = conferences.slice(0, 20).map(c => `
    <div class="pub-item">
      <span class="pub-year">${c.year}</span>
      <div class="pub-info">
        <h4>${c.title}</h4>
        <span class="pub-venue">${c.venue || 'Conference'}</span>
      </div>
    </div>
  `).join('') + (conferences.length > 20 ? `<div class="pub-item pub-more"><span>... 还有 ${conferences.length - 20} 篇会议论文（请查看 Conferences/ 文件夹）</span></div>` : '');

  // Tab switching
  document.querySelectorAll('.pub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.getElementById('journalsList').classList.toggle('hidden', target !== 'journals');
      document.getElementById('conferencesList').classList.toggle('hidden', target !== 'conferences');
    });
  });
})();

// ===== Timeline =====
(function renderTimeline() {
  const timeline = D().profile.timeline || [];
  document.getElementById('timelineContent').innerHTML = timeline.map(t => `
    <div class="tl-node">
      <div class="tl-dot"></div>
      <div class="tl-card">
        <span class="tl-date">${t.date}</span>
        <h4>${t.title}</h4>
        <p>${t.desc}</p>
      </div>
    </div>
  `).join('');
})();

// ===== Blog =====
(function renderBlog() {
  const blog = D().blog || [];

  document.getElementById('blogGrid').innerHTML = blog.map(a => `
    <div class="blog-card" onclick="showArticle('${a.id}')">
      <div class="blog-card-date">${a.date}</div>
      <h4>${a.title}</h4>
      <p>${a.excerpt}</p>
      <div class="blog-tags">
        ${a.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
})();

// Simple markdown → HTML converter
function mdToHtml(md) {
  if (!md) return '';
  let html = md
    // Escape HTML (but we trust our own data)
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    // List items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Italic
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

  // Paragraphs: split on double newlines
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|blockquote|hr|ul|ol|table|pre)/i.test(block)) return block;
    if (/^<li>/i.test(block)) return `<ul>${block.replace(/\n/g, '')}</ul>`;
    // Replace single newlines with <br> inside paragraphs
    const inner = block.replace(/\n/g, '<br>');
    return `<p>${inner}</p>`;
  }).join('\n');

  // Fix nested lists
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>');

  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.every(c => /^[-:]+$/.test(c.trim()))) return '';
    return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`;
  });
  html = html.replace(/(<tr>.*?<\/tr>\s*)+/g, m => `<table>${m}</table>`);

  return html;
}

// Show blog article detail
function showArticle(id) {
  const article = D().blog.find(a => a.id === id);
  if (!article) return;

  document.getElementById('blog').style.display = 'none';
  const display = document.getElementById('blog-display');
  display.style.display = 'block';
  display.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('blogContent').innerHTML = `
    <button onclick="hideArticle()" style="background:none;border:none;color:var(--color-primary);cursor:pointer;font-size:0.95rem;margin-bottom:24px;font-family:var(--font-sans);">&larr; 返回博客列表</button>
    <div class="blog-card-date">${article.date}</div>
    <h1>${article.title}</h1>
    <div class="blog-tags" style="margin:12px 0 24px;">
      ${article.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
    </div>
    <div class="article-md">${mdToHtml(article.content)}</div>
  `;
}

function hideArticle() {
  document.getElementById('blog-display').style.display = 'none';
  document.getElementById('blog').style.display = 'block';
  document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
}

// ===== Certifications =====
(function renderCerts() {
  const certs = D().profile.certifications || {};
  const catIcons = {
    '学位与学历认证': '🎓', '奖项与荣誉': '🏆', '研究资助与学术活动': '🔬',
    '学术服务': '📝', '语言与计算机考试': '💻', '专业技能认证': '⚙️',
    '管理培训': '📊', '一带一路专项课程': '🌍', '前沿科技课程': '🚀',
    '工程技术认证': '🔧', '高端装备与创新': '🏭', '软技能培训': '🗣️',
    '技术转移与跨境合作': '🤝', '其他': '📌'
  };

  const entries = Object.entries(certs);
  if (entries.length === 0) {
    document.getElementById('certContent').innerHTML = '<p class="text-center" style="color:var(--color-text-muted);">暂无证书数据。将文件放入 <strong>Certifications & Awards/</strong> 文件夹，运行 <code>node build.js</code> 即可显示。</p>';
    return;
  }

  document.getElementById('certContent').innerHTML = entries.map(([cat, items]) => `
    <div class="cert-cat">
      <h3>${catIcons[cat] || ''} ${cat} <span style="font-size:0.8rem;color:var(--color-text-muted);font-weight:400;">(${items.length}项)</span></h3>
      <ul>${items.map(i => `<li>${i.date ? '<small style="color:var(--color-primary);margin-right:6px;">[' + i.date + ']</small>' : ''}${i.display}${i.org ? ' <span style="color:var(--color-text-muted);">— ' + i.org + '</span>' : ''}</li>`).join('')}</ul>
    </div>
  `).join('');
})();

// ===== Footer =====
(function renderFooter() {
  const p = D().profile;
  document.getElementById('footerContent').innerHTML = `
    <div>
      <h3>${p.name} (${p.nameEn})</h3>
      <p>${p.title}</p>
      <p>${p.location}</p>
    </div>
    <div>
      <h3>联系方式</h3>
      ${(p.emails || []).map(e => `<p>邮箱: ${e}</p>`).join('')}
      <p>ORCID: <a href="https://orcid.org/${p.orcid}" target="_blank" rel="noopener">${p.orcid}</a></p>
    </div>
    <div>
      <h3>快速链接</h3>
      <a href="#publications">论文发表</a>
      <a href="#blog">博客文章</a>
      <a href="#certifications">荣誉与经历</a>
    </div>
  `;
})();
