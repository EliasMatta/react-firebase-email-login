// This is where Firebase for the app is set up

// Importing Firebase
import firebase from "firebase/app"

// Importing the authentication module for Firebase
import "firebase/auth"


import "firebase/storage"

// The app's Firebase configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyAKhtIoScdG2oTn04XCRVwxnEQ0COB1zNI",
    authDomain: "testproject-9db9b.firebaseapp.com",
    databaseURL: "https://testproject-9db9b-default-rtdb.firebaseio.com",
    projectId: "testproject-9db9b",
    storageBucket: "testproject-9db9b.appspot.com",
    messagingSenderId: "920519586829",
    appId: "1:920519586829:web:c2d031ffca708140d35144"


})

// Exporting a variable for authentication 
export const auth = app.auth()

const storage = firebase.storage();

export {storage,firebase as default}

