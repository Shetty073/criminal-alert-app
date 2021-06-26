import React from 'react';
import { 
	BrowserRouter as Router, 
	Switch,
	Route
} from 'react-router-dom';
import Header from './components/header/header.component';
import ProtectedRoute from './components/protectedroute/protectedroute.component';
import Nav from './components/nav/nav.component';
import Alerts from './pages/alerts/alerts.page';
import Dashboard from './pages/dashboard/dashboard.page';
import AdminRegister from './pages/adminregister/adminregister.page';
import Public from './pages/public/public.page';
import AdminLogin from './pages/adminlogin/adminlogin.page';
import UnknownRoute from './pages/unknownroute/unknownroute.page';
import { useAuth } from './contexts/AuthContext';

import './App.css';

export default function App() {
	const { currentUser } = useAuth();
	
	const activeRoute = (route) => {
        if(window.location.pathname !== route) {
            return true;
        } else {
            return false;
        }
    }

	return (
		<div className = "App" >
			<Header />
			<div className="container-fluid">
				<Router>
					<div className="row">
						{currentUser && activeRoute('/') && <Nav />}

						<Switch>
							<Route exact path="/" component={Public} />
							{!currentUser && <Route path="/login" component={AdminLogin} />}
							<ProtectedRoute path="/dashboard" component={Dashboard} />
							<ProtectedRoute path="/alerts" component={Alerts} />
							<ProtectedRoute path="/adminregister" component={AdminRegister} />

							<Route path="*" component={UnknownRoute} />
						</Switch>
					</div>
				</Router>
			</div>
		</div>
	);
}
