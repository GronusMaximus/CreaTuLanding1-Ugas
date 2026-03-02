import { useEffect, useState } from 'react';

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=12');

        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos.');
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="item-list-container">
      <h2>{greeting}</h2>
      <p>Explora los contenidos y practica componentes, props y estado en React.</p>

      {loading && <p className="status-message">Cargando productos...</p>}
      {error && !loading && <p className="status-message error">{error}</p>}

      {!loading && !error && (
        <section className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
                loading="lazy"
              />
              <div className="product-content">
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">USD {product.price}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default ItemListContainer;
