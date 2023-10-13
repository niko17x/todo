// Delete task from Today and add same task to Completed list.

import { writeBatch, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveTaskToCompleted = async (activeUserId, task) => {
  const batch = writeBatch(db);
  const todayTaskRef = doc(db, `todo/${activeUserId}/today/${task.id}`);
  // Reference to where it should go in the "completed" collection.
  // Note: It's often better to keep the original doc ID when moving between collections to avoid issues with relations or references.
  const completedTaskRef = doc(db, `todo/${activeUserId}/completed/${task.id}`);

  try {
    batch.set(completedTaskRef, { ...task, completed: true });
    batch.delete(todayTaskRef);
    await batch.commit();
  } catch (error) {
    console.error("Error moving task to completed:", error);
  }
};
