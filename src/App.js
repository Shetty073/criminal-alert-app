import React from 'react';
import Header from './components/header/header.component';
import Admin from './pages/admin/admin.page';
import Public from './pages/public/public.page';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAdmin: true,
		};
	}

	render() {
		return (
			<div className = "App" >
				<Header />
				{this.state.isAdmin ? < Admin /> : <Public />} 
			</div>
		);
	}
}

export default App;