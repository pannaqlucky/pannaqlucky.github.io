import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link to={`/article/${article.id}`} className="article-card-link">
        <div className="article-card-body">
          <div className="article-meta">
            <time className="article-date">{article.date}</time>
            <span className="article-dot">·</span>
            <span className="article-read-time">约 5 分钟</span>
          </div>

          <h3 className="article-title">{article.title}</h3>

          <p className="article-excerpt">{article.excerpt}</p>

          <div className="article-tags">
            {article.tags.map(tag => (
              <Link
                key={tag}
                to={`/tags?tag=${encodeURIComponent(tag)}`}
                className="article-tag"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="article-card-arrow">
          <span>→</span>
        </div>
      </Link>
    </article>
  )
}
