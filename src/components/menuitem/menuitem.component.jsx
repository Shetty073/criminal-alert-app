import React from 'react';
import { useLocation } from 'react-router-dom'

import './menuitem.style.css';


export default function MenuItem({ url, icon, name }) {
    const location = useLocation();

    const activeClass = (route) => {
        if(location.pathname === route) {
            return "nav-link active";
        } else {
            return "nav-link";
        }
    }

    return (
        <li className="nav-item">
            <span className={activeClass(url)} aria-current="page" href="#">
                <i className={`fas fa-${icon}`}></i>
                <span className="nav-item-name">{name}</span>
            </span>
        </li>
    );
}
