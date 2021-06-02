import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCcnlIH27N73DIauEnKstRjLXDwBWDEDsg",
    authDomain: "rent-bike-app-a1a40.firebaseapp.com",
    databaseURL: "https://rent-bike-app-a1a40-default-rtdb.firebaseio.com",
    projectId: "rent-bike-app-a1a40",
    storageBucket: "rent-bike-app-a1a40.appspot.com",
    messagingSenderId: "4911764421",
    appId: "1:4911764421:web:24cf7cc0948c1ebdf571ac",
    measurementId: "G-WEVEF147WQ"
};

export const app = firebase.initializeApp(firebaseConfig);



