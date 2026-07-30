import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Profile Header */}
        <section className="about-header">
          <div className="about-avatar">
            <span className="avatar-placeholder">研</span>
          </div>
          <h1 className="about-name">关于我</h1>
          <p className="about-tagline">
            科研工作者 · 技术经理人 · 终身学习者
          </p>
        </section>

        {/* Bio */}
        <section className="about-section">
          <h2 className="about-section-title">个人简介</h2>
          <div className="about-content">
            <p>
              专注于学术研究与技术转移领域，致力于搭建科研与产业之间的桥梁。
              在学术研究方面，参与多个国家级和省部级科研项目，发表学术论文多篇；
              在技术转移方面，具有丰富的科技成果转化经验，熟悉知识产权保护和项目管理的全流程。
            </p>
            <p>
              深港国际技术经理人课程学员，持续关注粤港澳大湾区科技创新动态，
              探索跨境技术转移的新模式与新机遇。
            </p>
          </div>
        </section>

        {/* Research Interests */}
        <section className="about-section">
          <h2 className="about-section-title">研究方向</h2>
          <div className="interests-grid">
            <div className="interest-card">
              <div className="interest-icon">🔬</div>
              <h3>学术研究</h3>
              <p>聚焦前沿科技领域，开展创新性研究工作</p>
            </div>
            <div className="interest-card">
              <div className="interest-icon">🔄</div>
              <h3>技术转移</h3>
              <p>推动科技成果从实验室走向市场，实现产业化</p>
            </div>
            <div className="interest-card">
              <div className="interest-icon">📋</div>
              <h3>知识产权</h3>
              <p>专利布局策略与知识产权保护体系</p>
            </div>
            <div className="interest-card">
              <div className="interest-icon">🌐</div>
              <h3>深港合作</h3>
              <p>粤港澳大湾区跨境科技创新合作</p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="about-section">
          <h2 className="about-section-title">学术成果</h2>
          <div className="about-content">
            <ul className="publication-list">
              <li>
                <span className="pub-type">期刊论文</span>
                多篇学术论文发表于国内外核心期刊
              </li>
              <li>
                <span className="pub-type">学术会议</span>
                参加多次国际/国内学术会议并做报告
              </li>
              <li>
                <span className="pub-type">专利成果</span>
                申请并获得多项发明专利授权
              </li>
              <li>
                <span className="pub-type">项目主持</span>
                主持和参与多个国家级、省部级科研项目
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="about-section">
          <h2 className="about-section-title">联系方式</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-label">邮箱</span>
              <span className="contact-value">research@example.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">ORCID</span>
              <span className="contact-value">0000-0000-0000-0000</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">所在城市</span>
              <span className="contact-value">深圳</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="about-cta">
          <Link to="/" className="btn-primary">浏览文章</Link>
          <Link to="/tags" className="btn-secondary">查看标签</Link>
        </div>
      </div>
    </div>
  )
}
