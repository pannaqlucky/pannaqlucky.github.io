import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleById, getAllArticles } from '../data/articles.js'
import { useEffect } from 'react'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = getArticleById(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!article) {
    return (
      <div className="not-found">
        <h2>文章未找到</h2>
        <p>抱歉，您访问的文章不存在。</p>
        <Link to="/" className="btn-back">返回首页</Link>
      </div>
    )
  }

  // 获取相关文章（同标签）
  const allArticles = getAllArticles()
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.tags.some(tag => article.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="article-detail-page">
      <div className="article-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">首页</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="article-detail-header">
          <div className="article-detail-meta">
            <time>{article.date}</time>
            <span className="dot">·</span>
            <span>约 5 分钟阅读</span>
          </div>
          <h1 className="article-detail-title">{article.title}</h1>
          <div className="article-detail-tags">
            {article.tags.map(tag => (
              <Link
                key={tag}
                to={`/tags?tag=${encodeURIComponent(tag)}`}
                className="article-tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="article-content">
          <ReactMarkdown remarkGfm={remarkGfm}>
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <div className="article-detail-footer">
          <Link to="/" className="btn-back">← 返回文章列表</Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <h3 className="related-title">相关文章</h3>
            <div className="related-list">
              {relatedArticles.map(ra => (
                <Link key={ra.id} to={`/article/${ra.id}`} className="related-item">
                  <span className="related-date">{ra.date}</span>
                  <span className="related-article-title">{ra.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
