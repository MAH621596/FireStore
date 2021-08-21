//import * as firebase from 'firebase';
import firebase from 'firebase';

const settings = {timestampsInSnapshots: true}

var firebaseConfig = {
    apiKey: "AIzaSyBAVgX9zoh7GCRfDBcqehSjOOL6jaHwS5w",
    authDomain: "fire-cloud-curd.firebaseapp.com",
    projectId: "fire-cloud-curd",
    storageBucket: "fire-cloud-curd.appspot.com",
    messagingSenderId: "216151238682",
    appId: "1:216151238682:web:c4debaac741bbd635289a3"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);

  export default firebase;