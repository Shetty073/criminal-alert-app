import React from 'react';
import MenuItem from '../../components/menuitem/menuitem.component';
import {
	Link
} from 'react-router-dom';

import './nav.style.css';

export default function Nav() {

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <Link to="/dashboard">
                        <MenuItem name="Dashboard" url="/dashboard" icon="tachometer-alt" />
                    </Link>
                    <Link to="/alerts">
                        <MenuItem name="Alerts" url="/alerts" icon="exclamation-circle" />
                    </Link>
                    <Link to="/adminregister">
                        <MenuItem name="Admin Register" url="/adminregister" icon="user-shield" />
                    </Link>
                </ul>
            </div>
        </nav>
    );
}
