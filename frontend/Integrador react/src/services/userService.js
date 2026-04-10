import { API_URLS } from './config';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

class UserService {
  async getAllUsers() {
    try {
      const response = await fetch(API_URLS.users, { headers: getHeaders() });
      if (!response.ok) throw new Error('Error al obtener usuarios');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const response = await fetch(`${API_URLS.users}/${id}`, { headers: getHeaders() });
      if (!response.ok) throw new Error('Error al obtener el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      const response = await fetch(API_URLS.users, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(user)
      });
      if (!response.ok) throw new Error('Error al crear el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateUser(id, user) {
    try {
      const response = await fetch(`${API_URLS.users}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(user)
      });
      if (!response.ok) throw new Error('Error al actualizar el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await fetch(`${API_URLS.users}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Error al eliminar el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export const userService = new UserService();