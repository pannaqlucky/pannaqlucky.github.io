/**
 * en-script.js — English version interaction script
 */

function D() { return window.SITE_DATA; }

// ===== Navbar =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 10));

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();

// ===== Hero =====
(function renderHero() {
  const p = D().profileEN;
  document.getElementById('heroContent').innerHTML = `
    <div class="hero-avatar"><span>${p.name.charAt(0)}</span></div>
    <h1 class="hero-name">${p.name} <span class="hero-name-en">${p.nameEn}</span></h1>
    <p class="hero-title">${p.title}</p>
    <p class="hero-institution">${p.institution} — ${p.field}</p>
    <p class="hero-location">${p.location}</p>
    <div class="hero-actions">
      <a href="#publications" class="btn">Publications</a>
      <a href="#blog" class="btn btn-outline">Read Blog</a>
    </div>
    <div class="hero-social">
      <a href="${p.zhihu || '#'}" target="_blank" rel="noopener" class="social-link">Zhihu</a>
      <a href="https://orcid.org/${p.orcid}" target="_blank" rel="noopener" class="social-link">ORCID</a>
    </div>
  `;
})();

// ===== About =====
(function renderAbout() {
  const p = D().profileEN;
  document.getElementById('aboutContent').innerHTML = `
    <div class="about-card">
      <h3>Biography</h3>
      ${p.bio.map(b => `<p>${b}</p>`).join('')}
    </div>
    <div class="about-card">
      <h3>Education</h3>
      <ul class="timeline">
        ${p.education.map(e => `<li><span class="tl-year">${e.year}</span><span class="tl-text">${e.degree} — ${e.school}</span></li>`).join('')}
      </ul>
    </div>
    <div class="about-card">
      <h3>Languages</h3>
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
  const p = D().profileEN;
  document.getElementById('researchContent').innerHTML = p.researchAreas.map(r => `
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
  const venues = new Set(journals.map(j => j.venue).filter(Boolean));

  document.getElementById('pubStats').innerHTML = `
    <div class="stat-item"><span class="stat-num">${journals.length}</span><span class="stat-label">Journal Papers</span></div>
    <div class="stat-item"><span class="stat-num">${conferences.length}</span><span class="stat-label">Conference Papers</span></div>
    <div class="stat-item"><span class="stat-num">${venues.size}+</span><span class="stat-label">Venues</span></div>
    <div class="stat-item"><span class="stat-num">${D().profileEN.researchAreas.length}</span><span class="stat-label">Fields</span></div>
  `;

  document.getElementById('pubTabs').innerHTML = `
    <button class="pub-tab active" data-tab="journals">Journal Papers (${journals.length})</button>
    <button class="pub-tab" data-tab="conferences">Conference Papers (${conferences.length})</button>
  `;

  document.getElementById('journalsList').innerHTML = journals.slice(0, 20).map(j => `
    <div class="pub-item"><span class="pub-year">${j.year}</span><div class="pub-info"><h4>${j.title}</h4><span class="pub-venue">${j.venue || 'Journal'}</span></div></div>
  `).join('') + (journals.length > 20 ? `<div class="pub-item pub-more"><span>... +${journals.length - 20} more papers</span></div>` : '');

  document.getElementById('conferencesList').innerHTML = conferences.slice(0, 20).map(c => `
    <div class="pub-item"><span class="pub-year">${c.year}</span><div class="pub-info"><h4>${c.title}</h4><span class="pub-venue">${c.venue || 'Conference'}</span></div></div>
  `).join('') + (conferences.length > 20 ? `<div class="pub-item pub-more"><span>... +${conferences.length - 20} more</span></div>` : '');

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
  document.getElementById('timelineContent').innerHTML = (D().profileEN.timeline || []).map(t => `
    <div class="tl-node"><div class="tl-dot"></div><div class="tl-card"><span class="tl-date">${t.date}</span><h4>${t.title}</h4><p>${t.desc}</p></div></div>
  `).join('');
})();

// ===== Blog =====
(function renderBlog() {
  const blog = D().blog || [];
  let html = blog.map(a => `
    <div class="blog-card" onclick="showArticle('${a.id}')">
      <div class="blog-card-date">${a.date}</div>
      <h4>${a.title}</h4>
      <p>${a.excerpt}</p>
      <div class="blog-tags">${a.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  const zhihu = D().zhihu || [];
  zhihu.forEach(a => {
    html += `
      <div class="blog-card" onclick="window.open('https://zhuanlan.zhihu.com/p/${a.id}', '_blank')">
        <div class="blog-card-date" style="color:#0084FF;">${a.date || 'Zhihu Column'}</div>
        <h4>${a.title || 'Zhihu Article'}</h4>
        <p>${a.excerpt || 'Read on Zhihu'}</p>
        <div class="blog-tags"><span class="blog-tag" style="background:#e8f4fd;color:#0084FF;">Zhihu</span></div>
      </div>
    `;
  });

  document.getElementById('blogGrid').innerHTML = html || '<p class="text-center" style="color:var(--color-text-muted);">No articles yet.</p>';
})();

// Markdown → HTML
function mdToHtml(md) {
  if (!md) return '';
  let html = md.replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>').replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>').replace(/^---$/gm, '<hr>')
    .replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|blockquote|hr|ul|ol|table|pre)/i.test(block)) return block;
    if (/^<li>/i.test(block)) return `<ul>${block.replace(/\n/g, '')}</ul>`;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
  html = html.replace(/<\/ul>\s*<ul>/g, '').replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>');
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.every(c => /^[-:]+$/.test(c.trim()))) return '';
    return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`;
  });
  html = html.replace(/(<tr>.*?<\/tr>\s*)+/g, m => `<table>${m}</table>`);
  return html;
}

function showArticle(id) {
  const article = D().blog.find(a => a.id === id);
  if (!article) return;
  document.getElementById('blog').style.display = 'none';
  const display = document.getElementById('blog-display');
  display.style.display = 'block';
  display.scrollIntoView({ behavior: 'smooth' });
  document.getElementById('blogContent').innerHTML = `
    <button onclick="hideArticle()" style="background:none;border:none;color:var(--color-primary);cursor:pointer;font-size:0.95rem;margin-bottom:24px;font-family:var(--font-sans);">← Back to Blog</button>
    <div class="blog-card-date">${article.date}</div>
    <h1>${article.title}</h1>
    <div class="blog-tags" style="margin:12px 0 24px;">${article.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}</div>
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
  const certs = D().profileEN.certifications || {};
  const entries = Object.entries(certs);
  if (entries.length === 0) {
    document.getElementById('certContent').innerHTML = '<p class="text-center" style="color:var(--color-text-muted);">No records yet.</p>';
    return;
  }

  const catLabels = {
    '学位与学历认证': 'Degrees & Credentials', '奖项与荣誉': 'Awards & Honors',
    '研究资助与学术活动': 'Research Grants & Activities', '学术服务': 'Academic Service',
    '语言与计算机考试': 'Language & Computer Exams', '专业技能认证': 'Professional Certifications',
    '管理培训': 'Management Training', '一带一路专项课程': 'Belt & Road Courses',
    '前沿科技课程': 'Cutting-Edge Tech', '工程技术认证': 'Engineering Certifications',
    '高端装备与创新': 'Advanced Equipment & Innovation', '软技能培训': 'Soft Skills',
    '技术转移与跨境合作': 'Tech Transfer & Cross-border', '其他': 'Other'
  };

  document.getElementById('certContent').innerHTML = entries.map(([cat, items]) => `
    <div class="cert-cat">
      <h3>${catLabels[cat] || cat} <span style="font-size:0.8rem;color:var(--color-text-muted);font-weight:400;">(${items.length})</span></h3>
      <ul>${items.map(i => `<li>${i.date ? '<small style="color:var(--color-primary);margin-right:6px;">[' + i.date + ']</small>' : ''}${i.display}${i.org ? ' <span style="color:var(--color-text-muted);">— ' + i.org + '</span>' : ''}</li>`).join('')}</ul>
    </div>
  `).join('');
})();

// ===== Footer =====
(function renderFooter() {
  const p = D().profileEN;
  document.getElementById('footerContent').innerHTML = `
    <div>
      <h3>${p.name} (${p.nameEn})</h3>
      <p>${p.title}</p>
      <p>${p.location}</p>
    </div>
    <div>
      <h3>Contact</h3>
      ${(p.emails || []).map(e => `<p>Email: ${e}</p>`).join('')}
      <p>ORCID: <a href="https://orcid.org/${p.orcid}" target="_blank" rel="noopener">${p.orcid}</a></p>
    </div>
    <div>
      <h3>Quick Links</h3>
      <a href="#publications">Publications</a>
      <a href="#blog">Blog</a>
      <a href="#certifications">Honors</a>
      ${p.zhihu ? `<a href="${p.zhihu}" target="_blank" rel="noopener">Zhihu</a>` : ''}
      <a href="https://orcid.org/${p.orcid}" target="_blank" rel="noopener">ORCID</a>
    </div>
  `;
})();
