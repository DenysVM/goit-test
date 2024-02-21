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
    }, []);

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar" ref={menuRef}>
            {!isDesktop && (
                <button className="menu-button" aria-label="Toggle menu" onClick={handleToggleMenu}>
                    <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
                </button>
            )}
            <div className={`menu-content ${menuOpen ? 'show' : 'hide'}`}>
                <NavLink to="/" onClick={handleCloseMenu}>Головна</NavLink>
                <ul>
                    <li>
                        <NavLink to="/catalog" onClick={handleCloseMenu}>Каталог</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites" onClick={handleCloseMenu}>Обране</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
