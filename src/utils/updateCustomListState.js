// Retrieves user generated custom list.

import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const updateCustomListState = async (activeUserId) => {
  if (!activeUserId) {
    return [];
  }
  try {
    const docRef = doc(db, `todo/${activeUserId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().customList || [];
    }
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ storeDataToFirestore`);
  }
  return [];
};
