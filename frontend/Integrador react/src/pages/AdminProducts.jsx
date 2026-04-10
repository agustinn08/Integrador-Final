import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import '../styles/adminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      alert('Error al cargar productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, productData);
        alert('Producto actualizado exitosamente');
      } else {
        await productService.createProduct(productData);
        alert('Producto creado exitosamente');
      }

      setShowModal(false);
      resetForm();
      loadProducts();
    } catch (error) {
      alert('Error al guardar el producto');
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      date: product.date || new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await productService.deleteProduct(id);
      alert('Producto eliminado exitosamente');
      loadProducts();
    } catch (error) {
      alert('Error al eliminar el producto');
      console.error(error);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setEditingProduct(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
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

  return (
    <main className="container py-5">
      <h1 className="text-center mb-4">ADMINISTRADOR DE PRODUCTOS</h1>

      <div className="boton-agregar mb-4">
        <button className="btn btn-success" onClick={(e) => { e.stopPropagation(); openCreateModal(); }}>
          <i className="fa-solid fa-plus"></i> Agregar producto
        </button>
      </div>

      <div className="productos-container">
        {products.map(product => (
          <div key={product._id} className="producto">
            <img src={product.image} alt={product.name} onError={(e) => { e.target.src = 'https://placehold.co/90x90?text=Sin+imagen'; }} />
            <div className="info">
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p>
                <strong>Categoría:</strong> {product.category} |
                <strong> Precio:</strong> ${product.price}
              </p>
            </div>
            <div className="acciones">
              <button className="edit" onClick={(e) => { e.stopPropagation(); handleEdit(product); }}>
                <i className="fa-solid fa-pen"></i>
              </button>
              <button className="delete" onClick={(e) => { e.stopPropagation(); handleDelete(product._id); }}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Nombre del Producto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image">URL de la Imagen</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category">Categoría</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date">Fecha</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {editingProduct ? 'Actualizar' : 'Crear'} Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminProducts;