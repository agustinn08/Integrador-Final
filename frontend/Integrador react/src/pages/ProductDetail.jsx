import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { API_URLS } from '../services/config';
import '../styles/productDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItemToCart } = useOrder();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URLS.products}/${id}`);
      if (!response.ok) throw new Error('Error al obtener el producto');
      const data = await response.json();
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('No se pudo cargar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addItemToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger d-inline-block" role="alert">
          <i className="fa-solid fa-exclamation-triangle me-2"></i>
          {error || 'Producto no encontrado'}
        </div>
        <div className="mt-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left me-2"></i>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left me-2"></i>
        Volver
      </button>

      <div className="product-detail-card">
        <div className="row g-0 align-items-stretch">
          <div className="col-md-5 product-detail-img-wrapper">
            <img
              src={product.image}
              className="product-detail-image"
              alt={product.name}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Sin+imagen'; }}
            />
          </div>
          <div className="col-md-7 p-4 d-flex flex-column justify-content-between">
            <div>
              {product.category && (
                <span className="badge bg-primary mb-2">{product.category}</span>
              )}
              <h2 className="fw-bold mb-3">{product.name}</h2>
              <div className="product-price mb-3">
                <span className="price-label">Precio</span>
                <span className="price-value">${product.price}</span>
              </div>
              <hr />
              <h5 className="fw-bold mt-3">Descripción</h5>
              <p className="main-p text-muted">{product.description}</p>
              {product.date && (
                <p className="text-muted small mt-2">
                  <i className="fa-regular fa-calendar me-1"></i>
                  Disponible desde: {product.date}
                </p>
              )}
            </div>
            <div className="mt-4 d-flex gap-3 flex-wrap">
              <button
                className={`btn ${addedToCart ? 'btn-success' : 'btn-dark'} px-4`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <><i className="fa-solid fa-check me-2"></i>¡Agregado!</>
                ) : (
                  <><i className="fa-solid fa-cart-shopping me-2"></i>Agregar al carrito</>
                )}
              </button>
              <button className="btn btn-outline-secondary px-4" onClick={() => navigate('/')}>
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
