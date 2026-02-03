import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/api/articles') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Нет ответа от сервера');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Загрузка страницы</p>
    </div>
  )
  if (error) return <p>Ошибка загрузки: {error.message}</p>;

  return (
    <div>
      <h2 className="page-title">Список статей</h2>
      {articles.length > 0 ? (
        <div className="articles-container">
          {articles.map(article => (
            <Link key={article.id} className="article-card" to={`/articles/${article.id}`}>
              <p className="article-link">
                {article.title}
              </p>
              <div>
                <span className="article-arrow">→</span>
                <p className='articles-date'>
                  {new Date(article.created_at).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-articles">Статей пока нет. Будьте первым!</p>
      )}
    </div>
  );
}

export default Articles;
