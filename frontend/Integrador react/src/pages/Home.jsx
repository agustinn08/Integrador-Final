import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data.slice(0, 8));
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <i className="fa-solid fa-exclamation-triangle"></i> {error}
        </div>
      </div>
    );
  }

  return (


    <main>
      {/* Carrusel */}
    <div id="main-carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="2"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://images.wallpapersden.com/image/download/ghostrunner-4k-gaming_bWdmZ26UmZqaraWkpJRobWllrWdma2U.jpg" className="d-block w-100" alt="Gaming 1" />
        </div>
        <div className="carousel-item">
          <img src="https://wallpapers.com/images/hd/3840-x-1080-gaming-8z2jwjo8i0zpjlxo.jpg" className="d-block w-100" alt="Gaming 2" />
        </div>
        <div className="carousel-item">
          <img src="https://cdn.wallpapersafari.com/96/70/PDCSLa.jpg" className="d-block w-100" alt="Gaming 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#main-carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#main-carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>

      {/* Sección Bienvenida */}
      <section className="home-section main-welcome container py-5">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-8">
            <div className="section-label text-primary fw-bold">Bienvenido</div>
            <h1 className="section-title textos-h1 fw-bold text-pink">
              Venta Gamer
            </h1>
            <p className="main-p">
              Somos una empresa dedicada a la venta de videojuegos para gamers
              de todas las plataformas. Ofrecemos los últimos lanzamientos,
              promociones exclusivas y productos seleccionados para que tu
              experiencia de juego sea única y de la mejor calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Productos */}
      <section className="home-section main-products py-5">
        <div className="text-center mb-4">
          <div className="section-label text-primary fw-bold">OFERTAS</div>
          <h1 className="section-title textos-h1 fw-bold text-green">
            PRODUCTOS DESTACADOS
          </h1>
        </div>

        <div className="container">
          <div className="row g-4 justify-content-center">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección Beneficios */}
      <section className="benefits-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">¿Por qué elegirnos?</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-3">
              <div className="benefit-card benefit-1 p-4">
                <i className="fa-solid fa-truck-fast fa-3x mb-3 text-primary"></i>
                <h5 className="fw-bold">Envíos a todo el país</h5>
                <p className="text-muted">
                  Recibí tu pedido rápido y seguro, sin importar dónde estés.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="benefit-card benefit-2 p-4">
                <i className="fa-solid fa-shield-halved fa-3x mb-3 text-primary"></i>
                <h5 className="fw-bold">Compra protegida</h5>
                <p className="text-muted">
                  Tu pago está 100% asegurado con nuestras políticas de confianza.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="benefit-card benefit-3 p-4">
                <i className="fa-solid fa-headset fa-3x mb-3 text-primary"></i>
                <h5 className="fw-bold">Soporte 24/7</h5>
                <p className="text-muted">
                  Nuestro equipo te ayuda en cualquier momento y canal.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="benefit-card benefit-4 p-4">
                <i className="fa-solid fa-tags fa-3x mb-3 text-primary"></i>
                <h5 className="fw-bold">Ofertas exclusivas</h5>
                <p className="text-muted">
                  Descuentos semanales en tus productos gamer favoritos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
