import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD_diC2Xh5wffxL3xn44Ph4RsLZeCiwRDs",
  authDomain: "multiplayer-test-63e63.firebaseapp.com",
  projectId: "multiplayer-test-63e63",
  storageBucket: "multiplayer-test-63e63.appspot.com",
  messagingSenderId: "504798491910",
  appId: "1:504798491910:web:b9d34862c610391fec5a87",
  measurementId: "G-N7D12J8Y8Y",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
