import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-section">
          <h4 className="footer-title">学术研究与技术转移</h4>
          <p className="footer-desc">
            探索学术前沿，推动技术转移，连接科研与产业。
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">快速链接</h4>
          <ul className="footer-links">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/tags">标签分类</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">联系方式</h4>
          <ul className="footer-links">
            <li>邮箱：research@example.com</li>
            <li>ORCID：0000-0000-0000-0000</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} 学术研究与技术转移. All rights reserved.</p>
      </div>
    </footer>
  )
}
