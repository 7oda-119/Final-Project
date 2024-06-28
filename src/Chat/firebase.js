import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2UjALv0_MnZRTN9XFsflTz8-Cq78Cy_8",
  authDomain: "freelance-chat-807ea.firebaseapp.com",
  projectId: "freelance-chat-807ea",
  storageBucket: "freelance-chat-807ea.appspot.com",
  messagingSenderId: "876344464255",
  appId: "1:876344464255:web:3cd0d9b268efde6229004a",
  measurementId: "G-LLDMDLW5VH"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);