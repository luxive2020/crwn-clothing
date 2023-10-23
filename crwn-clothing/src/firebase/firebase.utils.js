import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDQHeI1NGYDp5_DYRFmCEaIh-5OaXENR-Q",
    authDomain: "crown-db-dd85c.firebaseapp.com",
    projectId: "crown-db-dd85c",
    storageBucket: "crown-db-dd85c.appspot.com",
    messagingSenderId: "470909067564",
    appId: "1:470909067564:web:8a26c5f5ca4fcce3048c89",
    measurementId: "G-XGCGV9W30T"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;


