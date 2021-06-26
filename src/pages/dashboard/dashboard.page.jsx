import React from 'react';
import CreatePost from '../../components/createpost/createpost.component';

import './dashboard.style.css';


function Dashboard() {
    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h5 className="mt-3">Dashboard</h5>
            <hr />

            <CreatePost />
            <br />

        </main>
    );
}

export default Dashboard;
