import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import '../../styles/NavStyles.css';

function Navigation() {
    const isDesktop = useMediaQuery('(min-width: 769px)');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            {!isDesktop && (
                <button className="menu-button" aria-label="Toggle menu" onClick={handleToggleMenu}>
                    <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
                </button>
            )}
            <div className={`menu-content ${!isDesktop && menuOpen ? 'show' : 'hide'}`} ref={menuRef}>
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
