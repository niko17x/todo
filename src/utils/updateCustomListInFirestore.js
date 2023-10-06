// Takes "customList" react state from Sidebar.jsx and adds the data to FS databas:

import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const updateCustomListInFirestore = async (
  activeUserId,
  newListName
) => {
  if (!activeUserId || !newListName) {
    return;
  }
  const docRef = doc(db, `todo/${activeUserId}`);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        customList: arrayUnion(newListName),
      });
    } else {
      await setDoc(docRef, {
        customList: [newListName],
      });
    }
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ updateCustomListInFirestore.`);
  }
};
