// Adding custom new list name to FS.

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export const addNewListToFirestore = async (activeUserId, newList) => {
  if (!activeUserId || !newList) {
    return;
  }
  try {
    const collectionRef = collection(db, `todo/${activeUserId}/${newList}`);

    await addDoc(collectionRef, {
      createdAt: serverTimestamp(),
      customList: true,
      listName: newList,
      taskCount: 0,
      showDoc: false,
    });
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ addnewListToFirestore function.`);
  }
};
