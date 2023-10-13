// Toggle task.completed when invoked.

import { db } from "../lib/firebase";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

export const toggleTaskCompleteField = async (
  activeUserId,
  selectedList,
  task,
  data
) => {
  try {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${task.id}`);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
      completed: !task.completed,
    });
  } catch (error) {
    console.log(
      `Error ${error} - Occurred @ toggleTaskCompleteField function.`
    );
  }
};
