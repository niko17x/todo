// Takes data (new list name) and adds it to firestore sub-collection under "todo" collection:

import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export const addNewListToFirestore = async (activeUserId, newList) => {
  if (!activeUserId) {
    return;
  }
  try {
    const collectionRef = collection(db, `todo/${activeUserId}/${newList}`);
    await addDoc(collectionRef, {
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ addnewListToFirestore function.`);
  }
};

export const retrieveCustomListFromFirestore = async (activeUserId) => {
  const docRef = doc(db, `todo/${activeUserId}`);
};

/**
 * create a new sub collection called "custom lists"
 * store lists created by user in "custom lists"
 */
