import React from 'react';
import RegisterForm from '../components/registerForm'; // Asegúrate de que la ruta sea correcta
import '../styles/registerPage.css'; // Agrega estilos personalizados si es necesario

const RegisterPage = () => {
    return (
        <div className="register-page">
            <h1>Crear una Cuenta</h1>
            <p>Completa el formulario a continuación para registrarte.</p>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;