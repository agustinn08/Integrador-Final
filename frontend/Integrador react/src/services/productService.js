import { API_URLS } from './config';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

class ProductService {
  async getAllProducts() {
    try {
      const response = await fetch(API_URLS.products);
      if (!response.ok) throw new Error('Error al obtener productos');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${API_URLS.products}/${id}`);
      if (!response.ok) throw new Error('Error al obtener el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const response = await fetch(API_URLS.products, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Error al crear el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const response = await fetch(`${API_URLS.products}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Error al actualizar el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URLS.products}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Error al eliminar el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();