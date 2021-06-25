import React from 'react';


class AdminRegister extends React.Component {
    render() {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h5 className="mt-3">Register New Admin Users</h5>
                <hr />

                <form>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label for="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="email" />
                        </div>
                        <div className="col-md-4">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="col-md-4">
                            <label for="confirm-password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm-password" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </main>
        );
    }
}

export default AdminRegister;
