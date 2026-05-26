const firebaseConfig = {
  apiKey: "AIzaSyA5RSjuc8pdnGZ_-4PMoiYCFSssygFVMH0",
  authDomain: "oko-fbd77.firebaseapp.com",
  projectId: "oko-fbd77",
  storageBucket: "oko-fbd77.firebasestorage.app",
  messagingSenderId: "904158516250",
  appId: "1:904158516250:web:6578163818a647c05e6da3",
  databaseURL: "https://oko-fbd77-default-rtdb.europe-west1.firebasedatabase.app"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

window.db = db;
window.storage = storage;
