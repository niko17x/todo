// Delete list that is passed through as props from Firestore sub collection.

import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Deleting all fields within sub-collection which deletes the sub-collection itself:
export const deleteListFromFirestore = async (activeUserId, list) => {
  const collRef = collection(db, `todo/${activeUserId}/${list}`);
  const q = query(collRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

// Deleting document field for todo collection that matches passed in data "list":
export const deleteListFromField = async (activeUserId, list) => {
  const docRef = doc(db, `todo/${activeUserId}`);
  await updateDoc(docRef, {
    customList: arrayRemove(list),
  });
};
