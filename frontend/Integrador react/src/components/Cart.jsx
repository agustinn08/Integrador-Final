import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css';

function Cart({ isOpen, onClose }) {
  const { order, count, total, clearCart, createOrder } = useOrder();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    if (!isLoggedIn) {
      onClose();
      navigate('/login');
      return;
    }
    await createOrder();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h4>
            <i className="fa-solid fa-cart-shopping me-2"></i>
            Mi Carrito
            {count > 0 && <span className="cart-badge">{count}</span>}
          </h4>
          <button className="cart-close" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-body">
          {order.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-box-open fa-3x mb-3"></i>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {order.map((item) => (
                <div key={item._id || item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/60'; }}
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <span className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        {order.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button className="btn btn-primary w-100 mb-2" onClick={handleCreateOrder}>
              <i className="fa-solid fa-check me-2"></i>
              Confirmar orden
            </button>
            <button className="btn btn-outline-danger w-100" onClick={clearCart}>
              <i className="fa-solid fa-trash me-2"></i>
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
