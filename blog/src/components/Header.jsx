import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/tags', label: '标签' },
    { path: '/about', label: '关于' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">◆</span>
          <span className="logo-text">学术研究与技术转移</span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
