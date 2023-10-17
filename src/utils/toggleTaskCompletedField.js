// Toggle task.completed when invoked.

import { db } from "../lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export const toggleTaskCompleteField = async (
  activeUserId,
  selectedList,
  task,
  data
) => {
  if (!activeUserId) {
    return;
  }
  try {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${task.id}`);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(
      `Error ${error} - Occurred @ toggleTaskCompleteField function.`
    );
  }
};
