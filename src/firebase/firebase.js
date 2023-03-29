// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyChOjtSLwm69OHUcze6m2O2DcDQPXdRKdc",
    authDomain: "peerxp-23f40.firebaseapp.com",
    databaseURL: "https://peerxp-23f40-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "peerxp-23f40",
    storageBucket: "peerxp-23f40.appspot.com",
    messagingSenderId: "923651229960",
    appId: "1:923651229960:web:17d21234780252270c44bd"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;