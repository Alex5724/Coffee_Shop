import { Link } from 'react-router';
import style from '../styles/NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={style.notFound}>
      <section aria-labelledby="not-found-title">
        <p className={style.code}>404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p>The URL is wrong or it doesn't exist anymore.</p>
        <Link to="/">Back to the main page</Link>
      </section>
    </main>
  );
}
