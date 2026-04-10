import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import '../styles/register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    passwordRepeat: '',
    birthdate: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      
      // Crear usuario 
      const userData = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        birthdate: formData.birthdate,
        country: formData.country,
        createdAt: new Date().toISOString()
      };

      await userService.createUser(userData);
      
      setSuccess(true);
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

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError('Error al registrar usuario. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="registro-container">
            <h1 className="text-center mb-4">Registro</h1>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                ¡Usuario registrado exitosamente! Redirigiendo...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="form-control"
                  value={formData.fullname}
                  onChange={handleChange}
                  minLength="6"
                  maxLength="100"
                  pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  minLength="6"
                  maxLength="100"
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="8"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="passwordRepeat" className="form-label">Repetir Contraseña</label>
                <input
                  type="password"
                  name="passwordRepeat"
                  id="passwordRepeat"
                  className="form-control"
                  value={formData.passwordRepeat}
                  onChange={handleChange}
                  minLength="8"
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="form-control"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">País</label>
                <select
                  name="country"
                  id="country"
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

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
