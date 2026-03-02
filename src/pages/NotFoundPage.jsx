import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="not-found-container">
      <h2>Error 404</h2>
      <p>La ruta que intentaste visitar no existe.</p>
      <Link to="/" className="back-link">Ir al inicio</Link>
    </main>
  );
}

export default NotFoundPage;
