import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const loadListToFirestore = async (activeUserId, defaultList) => {
  if (!activeUserId) {
    return;
  }
  try {
    for (const list of defaultList) {
      const newSubCollRef = collection(db, `todo/${activeUserId}/${list}`);
      const snapshot = await getDocs(newSubCollRef);
      if (snapshot.empty) {
        await addDoc(newSubCollRef, {
          createdAt: serverTimestamp(),
          showDoc: false,
        });
      }
    }
  } catch (error) {
    console.log(
      `Error: ${error} - Occurred @ loadDefaultListToFirestore function.`
    );
  }
};
