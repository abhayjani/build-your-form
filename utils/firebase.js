import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDHk4jHuvHKgHsyLYjBf98lTMDGue8uPB4',
  authDomain: 'build-your-form.firebaseapp.com',
  projectId: 'build-your-form',
  storageBucket: 'build-your-form.appspot.com',
  messagingSenderId: '735430826170',
  appId: '1:735430826170:web:da52769af6e6bda7608a83',
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance for use in other parts of your application
export default db;

