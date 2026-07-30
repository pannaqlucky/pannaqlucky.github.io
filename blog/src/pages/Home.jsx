import { useState, useMemo } from 'react'
import ArticleCard from '../components/ArticleCard.jsx'
import { getAllArticles, getAllTags } from '../data/articles.js'
import { Link } from 'react-router-dom'

export default function Home() {
  const articles = getAllArticles()
  const allTags = getAllTags()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles
    const query = searchQuery.toLowerCase()
    return articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }, [articles, searchQuery])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">学术研究与技术转移</h1>
          <p className="hero-subtitle">
            探索学术前沿 · 推动成果转化 · 连接科研与产业
          </p>
          <div className="hero-tags">
            {allTags.slice(0, 6).map(tag => (
              <Link
                key={tag.name}
                to={`/tags?tag=${encodeURIComponent(tag.name)}`}
                className="hero-tag"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索文章标题、摘要或标签..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Article List */}
      <section className="article-list-section">
        <div className="section-header">
          <h2 className="section-title">
            {searchQuery ? `搜索结果（${filteredArticles.length} 篇）` : '最新文章'}
          </h2>
          <span className="article-count">{articles.length} 篇文章</span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="article-list">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>未找到匹配的文章</p>
            <button onClick={() => setSearchQuery('')} className="btn-reset">
              清除搜索
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
