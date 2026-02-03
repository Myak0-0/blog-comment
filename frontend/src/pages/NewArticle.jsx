import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/newArticle.css'

function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [flag_submit, setFlagSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setFlagSubmit(true);
    e.preventDefault();
    fetch('http://localhost/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <div className="create-article-card">
        <h2>✍️ Написать новую статью</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-input-group">
            <label>Заголовок статьи</label>
            <input 
              className="input-field"
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Введите броский заголовок..." 
              required 
            />
          </div>

          <div className="form-input-group">
            <label>Содержание</label>
            <textarea 
              className="input-field textarea-field"
              value={content} 
              onChange={e => setContent(e.target.value)} 
              placeholder="О чем вы хотите рассказать?" 
              required 
            />
          </div>

          <button type="submit" className="btn-publish"
          disabled={flag_submit}>
            {flag_submit ? 'Публикация...' : 'Опубликовать статью'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default NewArticle;
