// When urgent task is in Completed list and becomes incomplete again, move urgent task back to Urgent list.

import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveTaskToUrgent = async (activeUserId, task) => {
  const batch = writeBatch(db);
  const completedRef = doc(db, `todo/${activeUserId}/completed/${task.id}`);
  const urgentRef = doc(db, `todo/${activeUserId}/urgent/${task.id}`);
  try {
    batch.set(urgentRef, { ...task, completed: false });
    // batch.delete(completedRef);
    batch.commit();
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ moveTaskToUrgent.`);
  }
};
