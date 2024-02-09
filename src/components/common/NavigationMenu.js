import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/NavStyles.css';

function Navigation() {
    return (
        <nav className="navbar">
            <NavLink to="/" activeclassname="active">Головна</NavLink>
            <ul>
                <li>
                    <NavLink to="/catalog" activeclassname="active">Каталог</NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" activeclassname="active">Обране</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
