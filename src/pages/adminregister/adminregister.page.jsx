import React, { createRef, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';


function AdminRegister() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const confirmPasswordRef = createRef();
    const nameRef = createRef();

    const { register } = useAuth();

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            setError('Failed to register the user');
        }
        setLoading(false);
    }

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h5 className="mt-3">Register New Admin Users</h5>
            <hr />

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" ref={nameRef} id="name" aria-describedby="email" required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" ref={emailRef} id="email" aria-describedby="email" required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" ref={passwordRef} id="password" required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" ref={confirmPasswordRef} id="confirm-password" required />
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button disabled={loading} type="submit" className="btn btn-primary">Register</button>
            </form>

        </main>
    );
}

export default AdminRegister;
