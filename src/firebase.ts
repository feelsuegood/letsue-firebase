import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDdymh5n-FlFhVLNsvBL3T8dkf2S7YCbVQ",
  authDomain: "letsue-firebase.firebaseapp.com",
  projectId: "letsue-firebase",
  storageBucket: "letsue-firebase.firebasestorage.app",
  messagingSenderId: "524194315245",
  appId: "1:524194315245:web:c762a7a5cdd4e44de205e4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);