import { db } from "../lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export const updateFirestoreTodoFields = async (
  activeUserId,
  selectedList,
  taskId,
  data
) => {
  try {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${taskId}`);
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
