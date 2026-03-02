import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=30'),
          fetch('https://dummyjson.com/products/categories'),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('No se pudieron cargar los productos.');
        }

        const [productsData, categoriesData] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ]);

        setProducts(productsData.products || []);
        setCategories(
          (categoriesData || []).map((category) => ({
            slug: category.slug,
            label: category.name,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="item-list-container">
      <h2>{greeting}</h2>
      <p>Explora los contenidos y practica componentes, props y estado en React.</p>

      {loading && <p className="status-message">Cargando productos...</p>}
      {error && !loading && <p className="status-message error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="filter-bar">
            <label htmlFor="category-filter">Filtrar por categoría:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="all">Todas</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="status-message">No hay productos para esta categoría.</p>
          ) : (
            <section className="products-grid">
              {filteredProducts.map((product) => (
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
                    <Link to={`/product/${product.id}`} className="detail-link">
                      Ver producto
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default ItemListContainer;
