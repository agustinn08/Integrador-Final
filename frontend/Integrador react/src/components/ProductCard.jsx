import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import '../styles/productCard.css';

function ProductCard({ product }) {
  const { addItemToCart } = useOrder();

  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-muted">{product.category}</p>
          <p className="fw-bold">${product.price}</p>
          <Link to={`/products/${product._id}`} className="btn btn-dark w-100">
            Ver detalle
          </Link>
          <button
            className="btn btn-outline-dark w-100 mt-2"
            onClick={() => addItemToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;