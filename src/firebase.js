 import {initializeApp} from 'firebase/app';
 import {getAuth} from 'firebase/auth';
 import { getFirestore } from 'firebase/firestore';
 import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyB3hQ3rhrQkokCNyu-mW-FqwmLPLt4pyHI",
  authDomain: "bookello.firebaseapp.com",
  projectId: "bookello",
  storageBucket: "bookello.firebasestorage.app",
  messagingSenderId: "434145397081",
  appId: "1:434145397081:web:c66ad8d663c69b73f06448",
  measurementId: "G-MJT4LS61VF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app) 


export { auth, db };