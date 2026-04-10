import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="main-footer bg-dark text-white py-4">
      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          <div className="col-12 col-md-3">
            <Link to="/">
              <img
                src="https://png.pngtree.com/png-clipart/20210912/original/pngtree-letter-a-logo-png-design-vector-png-image_6760063.jpg"
                alt="Logo Venta Gamer"
                width="120"
                className="mb-3 logo-footer"
              />
            </Link>
          </div>

          <div className="col-12 col-md-3">
            <h5 className="mb-3">Síguenos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  <i className="fa-brands fa-linkedin"></i> LinkedIn
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  <i className="fa-brands fa-instagram"></i> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h5 className="mb-3">Contacto</h5>
            <p className="mb-2">📍 Av. Siempre Viva 123, Springfield</p>
            <p className="mb-2">📞 +1 234 567 890</p>
            <p className="mb-2">✉️ contacto@ventagamer.com</p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <hr className="bg-white" />
            <p className="mb-0">© 2025 Venta Gamer - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;