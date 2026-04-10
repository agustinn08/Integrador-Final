import { useState } from 'react';
import { userService } from '../services/userService';
import '../styles/modalRegistro.css';

function ModalRegistro({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    passwordRepeat: '',
    birthdate: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.passwordRepeat) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const userData = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        birthdate: formData.birthdate,
        country: formData.country,
        createdAt: new Date().toISOString()
      };

      await userService.createUser(userData);
      
      alert('Usuario registrado exitosamente');
      
      // Limpiar formulario
      setFormData({
        fullname: '',
        email: '',
        password: '',
        passwordRepeat: '',
        birthdate: '',
        country: ''
      });

      onClose();

    } catch (err) {
      setError('Error al registrar usuario. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="registro-container" onClick={(e) => e.stopPropagation()}>
        <button className="btn-cerrar" onClick={onClose}>&times;</button>

        <h1>Registro</h1>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname">Nombre Completo</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              minLength="6"
              maxLength="100"
              pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
              placeholder="Fullname"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              minLength="6"
              maxLength="100"
              placeholder="user@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              minLength="8"
              placeholder="8 characters minimum"
              required
            />
          </div>

          <div>
            <label htmlFor="passwordRepeat">Repetir Contraseña</label>
            <input
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleChange}
              minLength="8"
              placeholder="8 characters minimum"
              required
            />
          </div>

          <div>
            <label htmlFor="birthdate">Fecha de nacimiento</label>
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="country">País</label>
            <select
              name="country"
              id="country"
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

          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalRegistro;
