import React from 'react';

import './menuitem.style.css';


class MenuItem extends React.Component {

    render() {
        const activeClass = (route) => { return window.location.pathname === route ? "nav-link active" : "nav-link" }

        return (
            <li className="nav-item">
                <span className={activeClass(this.props.url)} aria-current="page" href="#">
                    <i className={`fas fa-${this.props.icon}`}></i>
                    <span className="nav-item-name">{this.props.name}</span>
                </span>
            </li>
        );
    }
}

export default MenuItem;
