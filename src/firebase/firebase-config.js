import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA3G6n-iTtVdPKIfLX6Uvje-2G6rDhI0fE",
    authDomain: "react-app-journal-4f7d4.firebaseapp.com",
    databaseURL: "https://react-app-journal-4f7d4.firebaseio.com",
    projectId: "react-app-journal-4f7d4",
    storageBucket: "react-app-journal-4f7d4.appspot.com",
    messagingSenderId: "164512424302",
    appId: "1:164512424302:web:308e1469aa164f9640617f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}