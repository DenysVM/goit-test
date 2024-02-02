import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/NavStyles.css';

function Navigation() {
    return (
        <nav className="navbar">
            <NavLink exact to="/">Головна</NavLink>
            <ul>
                <li>
                    <NavLink to="/catalog">Каталог</NavLink>
                </li>
                <li>
                    <NavLink to="/favorites">Обране</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
