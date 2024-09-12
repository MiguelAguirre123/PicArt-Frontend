import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/registerPage';
import ConfirmEmailPage from './pages/confirmEmailPage'; // Asegúrate de tener este archivo
import LoginPage from './pages/loginPage'; // Asegúrate de tener este archivo

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<h1>Bienvenido a la Aplicación</h1>} />
            </Routes>
        </Router>
    );
};

export default App;