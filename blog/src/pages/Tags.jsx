import { useSearchParams, Link } from 'react-router-dom'
import { getAllTags, getArticlesByTag, getAllArticles } from '../data/articles.js'
import ArticleCard from '../components/ArticleCard.jsx'
import { useEffect } from 'react'

export default function Tags() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTag = searchParams.get('tag')
  const allTags = getAllTags()
  const allArticles = getAllArticles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedTag])

  const displayArticles = selectedTag
    ? getArticlesByTag(selectedTag)
    : allArticles

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSearchParams({})
    } else {
      setSearchParams({ tag })
    }
  }

  return (
    <div className="tags-page">
      <div className="tags-container">
        <h1 className="page-title">标签分类</h1>
        <p className="page-subtitle">
          通过标签快速浏览相关主题的文章
        </p>

        {/* Tag Cloud */}
        <div className="tag-cloud">
          <button
            className={`tag-item ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSearchParams({})}
          >
            全部 <span className="tag-count">{allArticles.length}</span>
          </button>
          {allTags.map(tag => (
            <button
              key={tag.name}
              className={`tag-item ${selectedTag === tag.name ? 'active' : ''}`}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name} <span className="tag-count">{tag.count}</span>
            </button>
          ))}
        </div>

        {/* Article List */}
        <div className="tag-article-list">
          <div className="section-header">
            <h2 className="section-title">
              {selectedTag ? `标签「${selectedTag}」` : '全部文章'}
            </h2>
            <span className="article-count">{displayArticles.length} 篇</span>
          </div>

          {displayArticles.length > 0 ? (
            <div className="article-list">
              {displayArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>该标签下暂无文章</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
