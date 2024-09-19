// paginas/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import SlideMenu from '../components/slideMenu';
import '../styles/dashBoard.css';

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Mi Dashboard</h1>
                <div className="header-buttons">
                    <button className="sign-up-btn" onClick={handleSignUp}>
                        Sign Up
                    </button>
                    <button className="sign-in-btn" onClick={handleSignIn}>
                        Sign In
                    </button>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        &#9776; {/* Icono de menú */}
                    </button>
                </div>
            </header>
            <SlideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <main className="dashboard-content">
                <h2>Bienvenido al Dashboard</h2>
            </main>
        </div>
    );
};

export default Dashboard;