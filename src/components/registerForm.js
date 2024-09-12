import React, { useState } from 'react';
import { registerUser } from '../utils/api'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import './registerForm.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Doble verificación de contraseña
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('Comprador'); // Default: Comprador
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación de campos obligatorios
    if (!email || !password || !name || !userType) {
      setError('Todos los campos son obligatorios');
      setIsSubmitting(false);
      return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsSubmitting(false);
      return;
    }

    try {
      // Enviar datos de registro al backend en formato JSON
      const requestBody = {
        httpMethod: 'POST',
        resource: '/register',
        body: JSON.stringify({
          name,
          email,
          password,
          type: userType
        })
      };

      const response = await registerUser(requestBody); // Enviar datos al backend
      if (JSON.parse(response.body).message === 'El correo ya está registrado') {
        setError('El correo electrónico ya está registrado. Por favor, usa otro.');
        setIsSubmitting(false);
        return;
      }
      else if(JSON.parse(response.body).message === 'Error interno del servidor') {
        setError('Error registrando el correo');
        setIsSubmitting(false);
        return;
      }
      else {
        setSuccess('Registro exitoso. Por favor, revisa tu correo para confirmar tu cuenta.');
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setUserType('Comprador');
        localStorage.setItem('registrationEmail', email);
        navigate('/confirm-email');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Hubo un problema al registrar tu cuenta. Por favor, intenta nuevamente.');
      setSuccess('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Contraseña"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userType">Tipo de Usuario</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="Comprador">Comprador</option>
            <option value="Artista">Artista</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;