import { db } from "../lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export const updateFirestoreTodoFields = async (taskId, data) => {
  try {
    const docRef = doc(db, `todo/${taskId}`);
    await updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      ...data,
    });
  } catch (error) {
    console.log(
      `Error ${error} - Occurred @ updateFirestoreTodoFields function.`
    );
  }
};
