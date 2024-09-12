import React, { useState, useEffect } from 'react';
import { confirmEmail } from '../utils/api'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import './registerForm.css'; // Puedes reutilizar los estilos o crear nuevos

const ConfirmEmailForm = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera el email almacenado desde localStorage
    const storedEmail = localStorage.getItem('registrationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirige si no hay email en localStorage
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar datos de confirmación al backend en formato JSON
      const requestBody = {
        httpMethod: 'POST',
        resource: '/confirm-email',
        body: JSON.stringify({
          email,
          code
        })
      };

      const response = await confirmEmail(requestBody);
      if(JSON.parse(response.body).message === 'Código inválido o expirado') {
        setError('El codigo es incorrecto');
        setIsSubmitting(false);
        return;     
      }
      else {
        // Limpiar el localStorage
        localStorage.removeItem('registrationEmail');
        // Redirigir a la página de inicio de sesión
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al confirmar el correo:', error);
      setError('Hubo un problema al confirmar tu correo. Por favor, verifica el código.');
      setSuccess('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="confirm-email">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Código de Confirmación</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código de Confirmación"
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Confirmando...' : 'Confirmar'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConfirmEmailForm;