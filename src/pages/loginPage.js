import React from 'react';
import LoginForm from '../components/loginForm'; // Asegúrate de que la ruta sea correcta
import './loginPage.css'; // Agrega estilos personalizados si es necesario

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            <p>Ingresa tu correo electrónico y contraseña para acceder.</p>
            <LoginForm />
        </div>
    );
};

export default LoginPage;