import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import Cart from './Cart';
import '../styles/navbar.css';

function Navbar() {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const { count } = useOrder();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar-custom">
        <Link to="/" className="navbar-logo">
          <img src="https://png.pngtree.com/png-clipart/20210912/original/pngtree-letter-a-logo-png-design-vector-png-image_6760063.jpg" alt="Logo" className="avatares" />
          <span className="navbar-brand-text">Venta Gamer</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/about">Nosotros</Link>
          <Link to="/products">Productos</Link>
          {!isLoggedIn && <Link to="/register">Registro</Link>}
          {isAdmin && (
            <>
              <Link to="/admin/products">Admin Productos</Link>
              <Link to="/admin/users">Admin Usuarios</Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          <button className="btn-cart" onClick={() => setCartOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>

          {isLoggedIn ? (
            <div className="navbar-user">
              <img src="/images/avatar-usuario.png" alt="avatar" className="avatares" />
              <span className="user-name">{user?.fullname?.split(' ')[0]}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket me-1"></i>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              <i className="fa-solid fa-right-to-bracket me-1"></i>
              Login
            </Link>
          )}
        </div>
      </nav>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;