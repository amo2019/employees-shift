import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const config = {
  apiKey: "AIzaSyCierzOZVjeRen4MbbxNe94eozubbrfaK0",
  authDomain: "manager-3c454.firebaseapp.com",
  databaseURL: "https://manager-3c454.firebaseio.com",
  projectId: "manager-3c454",
  storageBucket: "manager-3c454.appspot.com",
  messagingSenderId: "1083020825367",
  appId: "1:1083020825367:web:a13c97e1fea7d0130a1d52",
  measurementId: "G-5VNZTL8BH0",
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // await userRef.set({
      //   email,
      //   ...additionalData
      // });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async (uid) => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export default firebase;
