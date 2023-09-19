import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export const signUpUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDocRef = doc(db, `users/${user.uid}`);
    await setDoc(userDocRef, {
      email: user.email,
      username,
    });
    console.log("User successfully registered!");
    return { user };
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ signUpUser function.`);
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User successfully signed in!");
    const user = userCredential.user;
    return Promise.resolve(user);
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ signInUser function.`);
  }
};

export const signOutUser = async () => {
  try {
    signOut(auth);
    console.log("User successfully logged out.");
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ signOutUser function.`);
  }
};
