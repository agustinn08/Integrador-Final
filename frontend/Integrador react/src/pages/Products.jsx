import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    setFiltered(result);
  }, [search, category, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setFiltered(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="products-title text-center mb-2">PRODUCTOS</h1>
      <p className="text-center text-muted mb-5">Encontrá todos nuestros productos gamer</p>

      {/* Filtros */}
      <div className="products-filters mb-4">
        <input
          type="text"
          className="form-control filter-search"
          placeholder="🔍 Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-control filter-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {(search || category) && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => { setSearch(''); setCategory(''); }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Resultado */}
      <p className="text-muted mb-3 text-center">{filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <p className="text-muted">No se encontraron productos con esos filtros</p>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
