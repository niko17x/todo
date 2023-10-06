import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const updateCustomListState = async (activeUserId, setCustomList) => {
  if (!activeUserId) {
    return;
  }
  const docRef = doc(db, `todo/${activeUserId}`);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      setCustomList(docSnap.data().customList);
    }
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ storeDataToFirestore`);
  }
};
