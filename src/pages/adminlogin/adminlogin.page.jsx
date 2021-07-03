import React, { createRef, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export default function AdminLogin() {
    const emailRef = createRef();
    const passwordRef = createRef();

    const { login } = useAuth();

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');
        
        try {
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/dashboard');
        } catch (error) {
            console.error(error.message);
            setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <main className="container">
            <h5 className="mt-3">Admin Login</h5>
            <hr />

            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" ref={emailRef} id="email" aria-describedby="email" required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" ref={passwordRef} id="password" required />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button disabled={loading} type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>

        </main>
    );
}
