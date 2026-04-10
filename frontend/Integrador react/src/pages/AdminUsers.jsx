import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import '../styles/adminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    birthdate: '',
    country: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los usuarios. Verificá tu conexión e intentá de nuevo.');
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

    try {
      if (editingUser) {
        await userService.updateUser(editingUser._id, formData);
        alert('Usuario actualizado exitosamente');
      } else {
        await userService.createUser({
          ...formData,
          createdAt: new Date().toISOString()
        });
        alert('Usuario creado exitosamente');
      }

      setShowModal(false);
      resetForm();
      loadUsers();
    } catch (err) {
      alert('Error al guardar el usuario');
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      password: '',
      birthdate: user.birthdate,
      country: user.country
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await userService.deleteUser(id);
      alert('Usuario eliminado exitosamente');
      loadUsers();
    } catch (err) {
      alert('Error al eliminar el usuario');
      console.error(err);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setEditingUser(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      fullname: '',
      email: '',
      password: '',
      birthdate: '',
      country: ''
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

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <i className="fa-solid fa-exclamation-triangle me-2"></i>
          {error}
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={loadUsers}>
            <i className="fa-solid fa-rotate-right me-2"></i>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-4">ADMINISTRADOR DE USUARIOS</h1>

      <div className="boton-agregar mb-4">
        <button className="btn btn-success" onClick={(e) => { e.stopPropagation(); openCreateModal(); }}>
          <i className="fa-solid fa-plus"></i> Agregar usuario
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td style={{fontSize: '0.75rem'}}>{user._id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.country}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={(e) => { e.stopPropagation(); handleEdit(user); }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => { e.stopPropagation(); handleDelete(user._id); }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-control"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="4"
                  required={!editingUser}
                  placeholder={editingUser ? 'Dejá vacío para no cambiar' : ''}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  className="form-control"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">País</label>
                <select
                  id="country"
                  name="country"
                  className="form-control"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un país</option>
                  <option value="AR">Argentina</option>
                  <option value="BR">Brasil</option>
                  <option value="BOL">Bolivia</option>
                  <option value="CHL">Chile</option>
                  <option value="COL">Colombia</option>
                  <option value="PY">Paraguay</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">Rol</label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role || 'client'}
                  onChange={handleChange}
                >
                  <option value="client">Cliente</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {editingUser ? 'Actualizar' : 'Crear'} Usuario
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminUsers;