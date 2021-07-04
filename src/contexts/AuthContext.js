import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	// register new admin user
	function register(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	// login admin user
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	// logout admin user
	function logout() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});

		// cleanup
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		register,
		login,
		logout
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

