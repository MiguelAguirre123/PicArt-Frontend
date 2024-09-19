import React, { useState } from 'react';
import { signIn } from '../utils/authUtils'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import '../styles/loginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validación de campos obligatorios
        if (!email || !password) {
            setError('Todos los campos son obligatorios');
            setIsSubmitting(false);
            return;
        }

        try {
            // Llamar al método de inicio de sesión
            const { success, result, error: errorMessage } = await signIn(email, password);
            if (success) {
                setSuccess('Inicio de sesión exitoso. Redirigiendo...');
                setError('');
                localStorage.setItem('authToken', result.getIdToken().getJwtToken()); // Guardar el token en el localStorage
                navigate('/dashboard'); // Redirigir al dashboard u otra página
            } else {
                setError(errorMessage); // Mostrar el mensaje de error específico
                setSuccess('');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Hubo un problema al iniciar sesión. Por favor, intenta nuevamente.');
            setSuccess('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
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

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;