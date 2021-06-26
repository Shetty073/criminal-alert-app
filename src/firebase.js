import firebase from "firebase";
import 'firebase/auth';

// ! 🚨 NOTE 🚨: Right now we are registering new admin users via 
// ! createUserWithEmailAndPassword() method. This method automatically
// ! signs the user in. But we do not want to do that because we are 
// ! already logged in ourselves and we just want to create other admin 
// ! users if needed.
// ! At the time of writing this, the only way to do that is to use the
// ! firebase-admin SDK, which I cam not going to use but you can if you
// ! want.

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const auth = app.auth();
export default app;
