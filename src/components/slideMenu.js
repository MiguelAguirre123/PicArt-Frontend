// componentes/SlideMenu.js
import React from 'react';
import '../styles/slideMenu.css';

const SlideMenu = ({ isOpen, toggleMenu }) => {
    return (
        <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleMenu}>×</button>
            <ul>
                <li><a href="/#">Inicio</a></li>
                <li><a href="/#">Perfil</a></li>
                <li><a href="/#">Ajustes</a></li>
                <li><a href="/#">Cerrar Sesión</a></li>
            </ul>
        </div>
    );
};

export default SlideMenu;