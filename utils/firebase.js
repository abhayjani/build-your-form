import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHk4jHuvHKgHsyLYjBf98lTMDGue8uPB4",
  authDomain: "build-your-form.firebaseapp.com",
  projectId: "build-your-form",
  storageBucket: "build-your-form.appspot.com",
  messagingSenderId: "735430826170",
  appId: "1:735430826170:web:da52769af6e6bda7608a83",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
