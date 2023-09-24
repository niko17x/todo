import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchUsername = async (activeUserId, setActiveUsername) => {
  if (!activeUserId) {
    return;
  }

  try {
    const docRef = doc(db, `users/${activeUserId}`);
    const docSnap = await getDoc(docRef);
    const getUsername = docSnap.exists() ? docSnap.data() : null;
    setActiveUsername(getUsername.username);
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ fetchUsername hook.`);
  }
};

export default fetchUsername;
