import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ItemDetailContainer() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`https://dummyjson.com/products/${productId}`);

        if (!response.ok) {
          throw new Error('Producto no encontrado.');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p className="status-message">Cargando detalle del producto...</p>;
  }

  if (error || !product) {
    return (
      <main className="detail-container">
        <p className="status-message error">{error || 'Producto no disponible.'}</p>
        <Link to="/" className="back-link">Volver al listado</Link>
      </main>
    );
  }

  return (
    <main className="detail-container">
      <article className="detail-card">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="detail-image"
        />
        <div className="detail-content">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Marca:</strong> {product.brand || 'Sin marca'}</p>
          <p className="detail-price">USD {product.price}</p>
          <Link to="/" className="back-link">Volver al listado</Link>
        </div>
      </article>
    </main>
  );
}

export default ItemDetailContainer;
