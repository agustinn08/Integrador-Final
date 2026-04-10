import { createContext, useContext, useState } from 'react';
import { orderService } from '../services/orderService';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);       
  const [count, setCount] = useState(0);        
  const [total, setTotal] = useState(0);        

  // Agregar producto al carrito
  const addItemToCart = (product) => {
    setOrder(prev => {
      const exists = prev.find(item => item._id === product._id);

      let updated;
      if (exists) {
        updated = prev.map(item =>
          (item.id === product.id || item._id === product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }

      const newCount = updated.reduce((acc, item) => acc + item.quantity, 0);
      const newTotal = updated.reduce((acc, item) => acc + item.quantity * item.price, 0);
      setCount(newCount);
      setTotal(newTotal);

      return updated;
    });
  };

  // Vaciar carrito
  const clearCart = () => {
    setOrder([]);
    setCount(0);
    setTotal(0);
  };

  // Crear orden en el backend
  const createOrder = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('Tenés que iniciar sesión para confirmar la orden');
      return;
    }

    const orderData = {
      totalPrice: total,
      user: userData._id,
      products: order.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      status: 'pending'
    };

    try {
      await orderService.createOrder(orderData);
      alert('✅ Orden creada exitosamente');

      // GET de todas las ordenes 
      const allOrders = await orderService.getAllOrders();
      console.log('📦 Todas las órdenes:', allOrders);

      clearCart();
    } catch (err) {
      alert('Error al crear la orden');
      console.error(err);
    }
  };

  return (
    <OrderContext.Provider value={{ order, count, total, addItemToCart, clearCart, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
