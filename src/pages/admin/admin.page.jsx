import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import MenuItem from '../../components/menuitem/menuitem.component';
import Alerts from '../alerts/alerts.page';
import Dashboard from '../dashboard/dashboard.page';
import AdminRegister from '../adminregister/adminregister.page';

import './admin.style.css';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState({});
    };

    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <div className="row">

                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                
                                <Link to="/" onClick={this.handleClick}>
                                    <MenuItem name="Dashboard" url="/" icon="tachometer-alt" />
                                </Link>
                                <Link to="/alerts" onClick={this.handleClick}>
                                    <MenuItem name="Alerts" url="/alerts" icon="exclamation-circle" />
                                </Link>
                                <Link to="/adminregister" onClick={this.handleClick}>
                                    <MenuItem name="Admin Register" url="/adminregister" icon="user-shield" />
                                </Link>
                            </ul>

                        </div>
                        </nav>

                        <Switch>
                            <Route exact path="/">
                                <Dashboard />
                            </Route>
                            <Route exact path="/alerts">
                                <Alerts />
                            </Route>
                            <Route exact path="/adminregister">
                                <AdminRegister />
                            </Route>

                        </Switch>

                    </div>
                </Router>
            </div>
        )
    }
}

export default Admin;
