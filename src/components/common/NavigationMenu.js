import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import '../../styles/NavStyles.css';

function Navigation() {
    const isDesktop = useMediaQuery('(min-width: 769px)');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleCloseMenu = () => {
        if (!isDesktop) {
            setMenuOpen(false);
        }
    };

    return (
        <nav className="navbar">
            {!isDesktop && (
                <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            )}
            <div className={`menu-content ${!isDesktop && menuOpen ? 'show' : 'hide'}`}>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleCloseMenu}>Головна</NavLink>
                <ul>
                    <li onClick={handleCloseMenu}>
                        <NavLink to="/catalog" className={({ isActive }) => (isActive ? 'active' : '')}>Каталог</NavLink>
                    </li>
                    <li onClick={handleCloseMenu}>
                        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>Обране</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
