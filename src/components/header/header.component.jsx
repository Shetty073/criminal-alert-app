import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import './header.style.css';


function Header() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout(e) {
        e.preventDefault();

        try {
            await logout();
            history.push('/login');
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <span className="navbar-brand col-md-3 col-lg-1 me-0 px-3">Criminal Alert</span>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" 
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <span className="w-100">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-5"></div>
                </div>
            </span>
            <div className="d-flex flex-row-reverse">
                <div className="nav-item text-nowrap">
                    {currentUser && <a onClick={handleLogout} className="nav-link px-3 text-danger" href="/#">Log Out</a>}
                </div>
                <div className="nav-item text-nowrap">
                    {currentUser && <a className="nav-link px-3 text-white" href="/dashboard">
                        {currentUser.email.substring(0, currentUser.email.indexOf('@'))} 
                    </a>}
                </div>
            </div>
        </header>
    );
}

export default Header;
