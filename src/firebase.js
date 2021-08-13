// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


  const firebaseConfig = {
    apiKey: "AIzaSyBDLngADMDTvZaW2AN4E8ddfa3U8e2Jpi0",
    authDomain: "challenge-b6e36.firebaseapp.com",
    projectId: "challenge-b6e36",
    storageBucket: "challenge-b6e36.appspot.com",
    messagingSenderId: "271614849531",
    appId: "1:271614849531:web:842b8f0faccc6a2e1fdb5e",
    measurementId: "G-7CJ48Y2WVL"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };