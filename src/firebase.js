import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBX0QdQX2yfv7x5e5uouEKe33ArqgfHym0",
    authDomain: "whatsapp-5a3ad.firebaseapp.com",
    databaseURL: "https://whatsapp-5a3ad.firebaseio.com",
    projectId: "whatsapp-5a3ad",
    storageBucket: "whatsapp-5a3ad.appspot.com",
    messagingSenderId: "709565140361",
    appId: "1:709565140361:web:758574afc59483c8296558",
    measurementId: "G-89NYZM8DHJ"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export { auth, provider };
  export default db;
