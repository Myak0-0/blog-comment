import { Link, Outlet }  from "react-router-dom"
import '../css/layout.css'

function Layout() {
  return (
    <div className='container'>
      <header className='header'>
        <h1>Блог</h1>
        <nav>
          <Link to="/">Главная (Статьи)</Link>
          <Link className="nav-link" to="/create/article">Новая статья</Link>
        </nav>
      </header>
      <main className='mainContent'>
        <Outlet />
      </main>
      <footer className='footer'>
        <p>© 2026</p>
      </footer>
    </div>
  );
}

export default Layout
