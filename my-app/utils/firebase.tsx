// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3bfcyrIy7VlmLM1nPv_t6t22t_4mYyEs",
    authDomain: "mern-ai-project-f4c09.firebaseapp.com",
    projectId: "mern-ai-project-f4c09",
    storageBucket: "mern-ai-project-f4c09.firebasestorage.app",
    messagingSenderId: "109998010500",
    appId: "1:109998010500:web:bf8dabf4298269081152d1",
    measurementId: "G-JH5YNJ43E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };