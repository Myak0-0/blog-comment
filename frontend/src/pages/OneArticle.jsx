import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/oneArticle.css'

function OneArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flag_submit, setFlagSubmit] = useState(false);

  const [commentsUpdated, setCommentsUpdated] = useState(false); 

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost/api/articles/${id}`) 
      .then(response => response.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
        setCommentsUpdated(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
      console.log(article);
  }, [id, commentsUpdated]);

  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {    
    e.preventDefault();
    setFlagSubmit(true);
    const finalAuthor = author.trim() || 'Аноним';

    fetch(`http://localhost/api/articles/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author_name: finalAuthor, content })
    }).then(() => {
      setContent('');
      setAuthor('');
      setCommentsUpdated(true);
      setFlagSubmit(false);
    });
  };

  if (loading) return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Загрузка страницы</p>
    </div>
  )  
  if (!article || error) return <p className='no-article'>Статья не найдена</p>;

return (
  <div>
    <article className="article-full">
      <h1>{article.title}</h1>
      <div className="article-text">{article.content}</div>
      <div className="article-date">
        {new Date(article.created_at).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}
      </div>
    </article>

    <section className="comments-section">
      <div className="comment-form">
        <h4>💬 Оставить комментарий</h4>
        <form onSubmit={handleSubmit}>
          <input 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            placeholder="Ваше имя"
          />
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            placeholder="Текст комментария" 
            rows="4"
            required 
          />
          <button type="submit" className="btn-submit"
            disabled={flag_submit}>
            {flag_submit ? 'Публикация...' : 'Отправить'}</button>
        </form>
      </div>

      <h3>Комментарии ({article.comments?.length || 0})</h3>
      {article.comments && article.comments.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {article.comments.map(comment => (
            <li key={comment.id} className="comment-card">
              <span className="comment-author">{comment.author_name || 'Аноним'}</span>
              <p style={{ margin: 0 }}>{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-comments'>Пока нет комментариев. Будьте первым!</p>
      )}
    </section>
  </div>
);
}

export default OneArticle;
