/**
 * en-script.js — English version with inline profile data
 */
(function() {

// ===== Inline English Profile =====
var P = {
  name: "潘是均", nameEn: "Shijun Pan",
  title: "Ph.D. · Researcher · Technology Manager",
  institution: "Okayama University",
  field: "River Engineering × AI Deep Learning",
  location: "Shenzhen · China",
  zhihu: "https://www.zhihu.com/people/pannaqlucky",
  emails: ["panshj@szarobots.com","panshj@uestc.edu.cn","p4b36znn@s.okayama-u.ac.jp"],
  orcid: "0000-0002-3260-9019",
  bio: [
    "Specializing in the intersection of river engineering and AI deep learning, dedicated to applying cutting-edge AI technologies (computer vision, multimodal LLMs, AIGC) to river environment monitoring and management.",
    "Published 32 journal papers and 15 international conference papers in UAV remote sensing, LiDAR, and deep learning image analysis.",
    "Also engaged in technology transfer, completed the Shenzhen-Hong Kong International Technology Manager training, focusing on cross-border technology transfer in the Greater Bay Area."
  ],
  education: [
    { year: "2024", degree: "Ph.D.", school: "Okayama University" },
    { year: "2021", degree: "M.S.", school: "Okayama University" },
    { year: "2016", degree: "B.E.", school: "Shenyang University of Technology" }
  ],
  languages: [
    { name: "Chinese", level: "Native", percent: 100 },
    { name: "English", level: "TOEIC 710", percent: 70 },
    { name: "Japanese", level: "JLPT N2 (93/180)", percent: 60 }
  ],
  researchAreas: [
    { icon:"🤖", title:"Deep Learning & Computer Vision", desc:"YOLOv8, DeepLabV3+, SAM models for river environment; object detection, semantic/instance segmentation" },
    { icon:"🛸", title:"UAV Remote Sensing", desc:"Low-altitude UAV imagery, LiDAR/ALB-assisted deep learning, multi-platform data fusion" },
    { icon:"🌊", title:"River & Environmental Engineering", desc:"Riparian land cover classification, riverine waste detection, embankment crack identification, flood evacuation optimization" },
    { icon:"🧠", title:"Multimodal AI & LLMs", desc:"LLaVA, AIGC image generation, prompt engineering for river monitoring and detection" },
    { icon:"📱", title:"Smartphone Photogrammetry", desc:"3D model reconstruction via smartphone photogrammetry for AI-assisted crack detection and river spatial analysis" },
    { icon:"🌍", title:"Belt & Road International Cooperation", desc:"AI+UAV agricultural engineering and disaster management in Tunisia, Bangladesh, and Belt & Road countries" }
  ],
  timeline: [
    { date:"2026", title:"Belt & Road Expansion", desc:"Tunisia AI+UAV research, Bangladesh agricultural engineering, mineral processing multimodal AI" },
    { date:"2025", title:"Multimodal AI & LLM Applications", desc:"LMM prompt engineering, AIGC crack detection, flood evacuation optimization, cross-platform data fusion" },
    { date:"2024", title:"Ph.D. Graduation · Key Achievements", desc:"Ph.D. degree, multiple Drones/AIIII/JSCE publications, OU-SPRING researcher" },
    { date:"2022–2023", title:"Deep Learning & CV Deepening", desc:"YOLOv8 instance segmentation, SAM evaluation, AIGC image generation, 4K camera monitoring" },
    { date:"2020–2021", title:"UAV + AI Research Initiation", desc:"ALB-assisted deep learning, riparian land cover classification, fishway fish detection" }
  ],
  certCatLabels: {
    '学位与学历认证':'Degrees & Credentials','奖项与荣誉':'Awards & Honors',
    '研究资助与学术活动':'Research Grants & Activities','学术服务':'Academic Service',
    '语言与计算机考试':'Language & Computer Exams','专业技能认证':'Professional Certifications',
    '管理培训':'Management Training','一带一路专项课程':'Belt & Road Courses',
    '前沿科技课程':'Cutting-Edge Tech','工程技术认证':'Engineering Certifications',
    '高端装备与创新':'Advanced Equipment & Innovation','软技能培训':'Soft Skills',
    '技术转移与跨境合作':'Tech Transfer & Cross-border','其他':'Other'
  }
};

function D() { return window.SITE_DATA || {}; }

// ===== Navbar =====
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function(){ navbar.classList.toggle('scrolled', window.scrollY > 10); });
var navToggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(function(link){
  link.addEventListener('click', function(){ navLinks.classList.remove('open'); });
});
document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
  anchor.addEventListener('click', function(e){
    var target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth' }); }
  });
});

// ===== Hero =====
document.getElementById('heroContent').innerHTML =
  '<div class="hero-avatar"><span>'+P.name.charAt(0)+'</span></div>'+
  '<h1 class="hero-name">'+P.name+' <span class="hero-name-en">'+P.nameEn+'</span></h1>'+
  '<p class="hero-title">'+P.title+'</p>'+
  '<p class="hero-institution">'+P.institution+' — '+P.field+'</p>'+
  '<p class="hero-location">'+P.location+'</p>'+
  '<div class="hero-actions">'+
    '<a href="#publications" class="btn">Publications</a>'+
    '<a href="#blog" class="btn btn-outline">Read Blog</a>'+
  '</div>'+
  '<div class="hero-social">'+
    '<a href="'+P.zhihu+'" target="_blank" rel="noopener" class="social-link">Zhihu</a>'+
    '<a href="https://orcid.org/'+P.orcid+'" target="_blank" rel="noopener" class="social-link">ORCID</a>'+
  '</div>';

// ===== About =====
document.getElementById('aboutContent').innerHTML =
  '<div class="about-card"><h3>Biography</h3>'+P.bio.map(function(b){return '<p>'+b+'</p>';}).join('')+'</div>'+
  '<div class="about-card"><h3>Education</h3><ul class="timeline">'+P.education.map(function(e){return '<li><span class="tl-year">'+e.year+'</span><span class="tl-text">'+e.degree+' — '+e.school+'</span></li>';}).join('')+'</ul></div>'+
  '<div class="about-card"><h3>Languages</h3><div class="lang-grid">'+P.languages.map(function(l){return '<div class="lang-item"><span class="lang-name">'+l.name+'</span><div class="lang-bar"><div class="lang-fill" style="width:'+l.percent+'%"></div></div><span class="lang-level">'+l.level+'</span></div>';}).join('')+'</div></div>';

// ===== Research =====
document.getElementById('researchContent').innerHTML = P.researchAreas.map(function(r){
  return '<div class="research-card"><div class="research-icon">'+r.icon+'</div><h3>'+r.title+'</h3><p>'+r.desc+'</p></div>';
}).join('');

// ===== Publications =====
(function(){
  var d = D();
  var pub = d.publications || {};
  var journals = pub.journals || [];
  var conferences = pub.conferences || [];
  var venues = new Set(journals.map(function(j){return j.venue;}).filter(Boolean));

  document.getElementById('pubStats').innerHTML =
    '<div class="stat-item"><span class="stat-num">'+journals.length+'</span><span class="stat-label">Journal Papers</span></div>'+
    '<div class="stat-item"><span class="stat-num">'+conferences.length+'</span><span class="stat-label">Conference Papers</span></div>'+
    '<div class="stat-item"><span class="stat-num">'+venues.size+'+</span><span class="stat-label">Venues</span></div>'+
    '<div class="stat-item"><span class="stat-num">'+P.researchAreas.length+'</span><span class="stat-label">Fields</span></div>';

  document.getElementById('pubTabs').innerHTML =
    '<button class="pub-tab active" data-tab="journals">Journal Papers ('+journals.length+')</button>'+
    '<button class="pub-tab" data-tab="conferences">Conference Papers ('+conferences.length+')</button>';

  document.getElementById('journalsList').innerHTML = journals.slice(0,20).map(function(j){
    return '<div class="pub-item"><span class="pub-year">'+j.year+'</span><div class="pub-info"><h4>'+j.title+'</h4><span class="pub-venue">'+(j.venue||'Journal')+'</span></div></div>';
  }).join('') + (journals.length>20?'<div class="pub-item pub-more"><span>... +'+(journals.length-20)+' more papers</span></div>':'');

  document.getElementById('conferencesList').innerHTML = conferences.slice(0,20).map(function(c){
    return '<div class="pub-item"><span class="pub-year">'+c.year+'</span><div class="pub-info"><h4>'+c.title+'</h4><span class="pub-venue">'+(c.venue||'Conference')+'</span></div></div>';
  }).join('') + (conferences.length>20?'<div class="pub-item pub-more"><span>... +'+(conferences.length-20)+' more</span></div>':'');

  document.querySelectorAll('.pub-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      document.querySelectorAll('.pub-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      var t = tab.dataset.tab;
      document.getElementById('journalsList').classList.toggle('hidden', t!=='journals');
      document.getElementById('conferencesList').classList.toggle('hidden', t!=='conferences');
    });
  });
})();

// ===== Timeline =====
document.getElementById('timelineContent').innerHTML = P.timeline.map(function(t){
  return '<div class="tl-node"><div class="tl-dot"></div><div class="tl-card"><span class="tl-date">'+t.date+'</span><h4>'+t.title+'</h4><p>'+t.desc+'</p></div></div>';
}).join('');

// ===== Blog =====
(function(){
  var d = D();
  var blog = d.blog || [];
  var html = blog.map(function(a){
    return '<div class="blog-card" onclick="showArticle(\''+a.id+'\')"><div class="blog-card-date">'+a.date+'</div><h4>'+a.title+'</h4><p>'+a.excerpt+'</p><div class="blog-tags">'+a.tags.map(function(t){return '<span class="blog-tag">'+t+'</span>';}).join('')+'</div></div>';
  }).join('');

  var zhihu = d.zhihu || [];
  zhihu.forEach(function(a){
    html += '<div class="blog-card" onclick="window.open(\'https://zhuanlan.zhihu.com/p/'+a.id+'\',\'_blank\')"><div class="blog-card-date" style="color:#0084FF;">'+(a.date||'Zhihu Column')+'</div><h4>'+(a.title||'Zhihu Article')+'</h4><p>'+(a.excerpt||'Read on Zhihu')+'</p><div class="blog-tags"><span class="blog-tag" style="background:#e8f4fd;color:#0084FF;">Zhihu</span></div></div>';
  });

  document.getElementById('blogGrid').innerHTML = html || '<p class="text-center" style="color:var(--color-text-muted);">No articles yet.</p>';
})();

// Markdown to HTML
function mdToHtml(md){
  if(!md)return'';
  var h=md.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/^> (.+)$/gm,'<blockquote><p>$1</p></blockquote>').replace(/^- (.+)$/gm,'<li>$1</li>').replace(/^(\d+)\. (.+)$/gm,'<li>$2</li>').replace(/^---$/gm,'<hr>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>');
  var blocks=h.split(/\n\n+/);
  h=blocks.map(function(b){b=b.trim();if(!b)return'';if(/^<(h[1-6]|blockquote|hr|ul|ol|table|pre)/i.test(b))return b;if(/^<li>/i.test(b))return'<ul>'+b.replace(/\n/g,'')+'</ul>';return'<p>'+b.replace(/\n/g,'<br>')+'</p>';}).join('\n');
  h=h.replace(/<\/ul>\s*<ul>/g,'').replace(/<p><ul>/g,'<ul>').replace(/<\/ul><\/p>/g,'</ul>');
  h=h.replace(/\|(.+)\|/g,function(m){var c=m.split('|').filter(function(x){return x.trim();});if(c.every(function(x){return /^[-:]+$/.test(x.trim());}))return'';return'<tr>'+c.map(function(x){return'<td>'+x.trim()+'</td>';}).join('')+'</tr>';});
  h=h.replace(/(<tr>.*?<\/tr>\s*)+/g,function(m){return'<table>'+m+'</table>';});
  return h;
}

function showArticle(id){
  var a=D().blog.find(function(x){return x.id===id;});
  if(!a)return;
  document.getElementById('blog').style.display='none';
  var disp=document.getElementById('blog-display');
  disp.style.display='block';disp.scrollIntoView({behavior:'smooth'});
  document.getElementById('blogContent').innerHTML='<button onclick="hideArticle()" style="background:none;border:none;color:var(--color-primary);cursor:pointer;font-size:0.95rem;margin-bottom:24px;font-family:var(--font-sans);">← Back to Blog</button><div class="blog-card-date">'+a.date+'</div><h1>'+a.title+'</h1><div class="blog-tags" style="margin:12px 0 24px;">'+a.tags.map(function(t){return'<span class="blog-tag">'+t+'</span>';}).join('')+'</div><div class="article-md">'+mdToHtml(a.content)+'</div>';
}

function hideArticle(){
  document.getElementById('blog-display').style.display='none';
  document.getElementById('blog').style.display='block';
  document.getElementById('blog').scrollIntoView({behavior:'smooth'});
}

// ===== Certifications =====
(function(){
  var d = D();
  var certs = (d.profileEN && d.profileEN.certifications) || (d.profile && d.profile.certifications) || {};
  var entries = Object.entries ? Object.entries(certs) : Object.keys(certs).map(function(k){return[k,certs[k]];});
  if(entries.length===0){
    document.getElementById('certContent').innerHTML = '<p class="text-center" style="color:var(--color-text-muted);">No records yet.</p>';
    return;
  }
  var labels = P.certCatLabels;
  document.getElementById('certContent').innerHTML = entries.map(function(e){
    var cat=e[0], items=e[1];
    return '<div class="cert-cat"><h3>'+(labels[cat]||cat)+' <span style="font-size:0.8rem;color:var(--color-text-muted);font-weight:400;">('+items.length+')</span></h3><ul>'+items.map(function(i){return'<li>'+(i.date?'<small style="color:var(--color-primary);margin-right:6px;">['+i.date+']</small>':'')+i.display+(i.org?' <span style="color:var(--color-text-muted);">— '+i.org+'</span>':'')+'</li>';}).join('')+'</ul></div>';
  }).join('');
})();

// ===== Footer =====
document.getElementById('footerContent').innerHTML =
  '<div><h3>'+P.name+' ('+P.nameEn+')</h3><p>'+P.title+'</p><p>'+P.location+'</p></div>'+
  '<div><h3>Contact</h3>'+P.emails.map(function(e){return'<p>Email: '+e+'</p>';}).join('')+'<p>ORCID: <a href="https://orcid.org/'+P.orcid+'" target="_blank" rel="noopener">'+P.orcid+'</a></p></div>'+
  '<div><h3>Quick Links</h3><a href="#publications">Publications</a><a href="#blog">Blog</a><a href="#certifications">Honors</a><a href="'+P.zhihu+'" target="_blank" rel="noopener">Zhihu</a><a href="https://orcid.org/'+P.orcid+'" target="_blank" rel="noopener">ORCID</a></div>';

})();
