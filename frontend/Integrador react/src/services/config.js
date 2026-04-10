export const API_CONFIG = {
  baseURL: 'http://localhost:3001/api',
  endpoints: {
    products: '/products',
    users: '/users',
    orders: '/orders'
  }
};

export const API_URLS = {
  products: `${API_CONFIG.baseURL}${API_CONFIG.endpoints.products}`,
  users:    `${API_CONFIG.baseURL}${API_CONFIG.endpoints.users}`,
  orders:   `${API_CONFIG.baseURL}${API_CONFIG.endpoints.orders}`
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});
