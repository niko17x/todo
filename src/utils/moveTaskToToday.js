// Remove task from Completed and add same task (ID) to Today.

import { doc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveTaskToToday = async (activeUserId, task) => {
  const batch = writeBatch(db);
  const completedDocRef = doc(db, `todo/${activeUserId}/completed/${task.id}`);
  const todayDocRef = doc(db, `todo/${activeUserId}/today/${task.id}`);

  try {
    batch.set(todayDocRef, { ...task, completed: false });
    batch.delete(completedDocRef);
    await batch.commit();
  } catch (error) {
    console.error(`Error in addCompletedTaskToFirestore: ${error.message}`);
  }
};
