import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAGtL0YU9kvac35pUljJDB_jWcEVNBBhs0",
  authDomain: "crown-lr.firebaseapp.com",
  databaseURL: "https://crown-lr.firebaseio.com",
  projectId: "crown-lr",
  storageBucket: "crown-lr.appspot.com",
  messagingSenderId: "755940435138",
  appId: "1:755940435138:web:be01c3181cd36b237c475b",
  measurementId: "G-ZDJT2C7Q55",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
