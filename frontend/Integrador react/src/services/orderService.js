const BASE_URL = 'http://localhost:3001/api';

const getToken = () => localStorage.getItem('token');

export const orderService = {
  async createOrder(orderData) {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Error al crear la orden');
    return await response.json();
  },

  async getAllOrders() {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) throw new Error('Error al obtener órdenes');
    return await response.json();
  }
};
