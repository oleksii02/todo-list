import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyCzwN5SlqyFp70tdsOBf07rDCmjfyZ7uJo',
  authDomain: 'todo-list-a4748.firebaseapp.com',
  databaseURL:
    'https://todo-list-a4748-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-list-a4748',
  storageBucket: 'todo-list-a4748.firebasestorage.app',
  messagingSenderId: '883898799460',
  appId: '1:883898799460:web:e45913e1653acd69139671',
  measurementId: 'G-L8480HHBQ5',
};

export const app = initializeApp(firebaseConfig);
