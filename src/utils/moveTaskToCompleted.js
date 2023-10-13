// Retrieve completed task and remove from original collection:

import { writeBatch, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveTaskToCompleted = async (activeUserId, task) => {
  const batch = writeBatch(db);

  // Reference to the task in the "today" collection.
  const todayTaskRef = doc(db, `todo/${activeUserId}/today/${task.id}`);

  // Reference to where it should go in the "completed" collection.
  // Note: It's often better to keep the original doc ID when moving between collections to avoid issues with relations or references.
  const completedTaskRef = doc(db, `todo/${activeUserId}/completed/${task.id}`);

  try {
    // Add the task to "completed" collection.
    batch.set(completedTaskRef, { ...task, completed: true });

    // Delete the task from "today" collection.
    batch.delete(todayTaskRef);

    // Commit the batch.
    await batch.commit();
  } catch (error) {
    console.error("Error moving task to completed:", error);
  }
};

/**
 * todayTaskRef gets a reference to the specific task (task.id) within the today collection.
 * completedTaskRef gets a reference to the specific task within the completed collection.
 *
 */
