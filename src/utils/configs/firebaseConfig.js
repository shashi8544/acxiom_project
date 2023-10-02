// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

// const config = {
//     apiKey: "AIzaSyAgruqjwV_k_UFsYxpZwcs6h4-nC1D_6FQ",
//     authDomain: "interiit-57302.firebaseapp.com",
//     projectId: "interiit-57302",
//     storageBucket: "interiit-57302.appspot.com",
//     messagingSenderId: "317986775991",
//     appId: "1:317986775991:web:420ed035aa284f06e67e32",
//     measurementId: "G-GLHD85HRKQ"
// };
// firebase.initializeApp(config);

// const database = firebase.firestore();
// const storage = firebase.storage();
// const auth = firebase.auth();

// export { database, storage, auth, config };




// Written by shashi


import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Import other Firebase modules if needed
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
const firebaseConfig = {
    apiKey: "AIzaSyAgruqjwV_k_UFsYxpZwcs6h4-nC1D_6FQ",
    authDomain: "interiit-57302.firebaseapp.com",
    projectId: "interiit-57302",
    storageBucket: "interiit-57302.appspot.com",
    messagingSenderId: "317986775991",
    appId: "1:317986775991:web:420ed035aa284f06e67e32",
    measurementId: "G-GLHD85HRKQ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;










