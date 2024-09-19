import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/registerPage';
import ConfirmEmailPage from './pages/confirmEmailPage'; // Asegúrate de tener este archivo
import LoginPage from './pages/loginPage'; // Asegúrate de tener este archivo
import DashBoard from './pages/dashBoard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<DashBoard />} />
            </Routes>
        </Router>
    );
};

export default App;