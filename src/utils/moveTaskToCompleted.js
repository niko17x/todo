// Delete task from Today and add same task to Completed list.

import { writeBatch, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

const generateDocRef = (userId, listName, taskId) => {
  return doc(db, `todo/${userId}/${listName}/${taskId}`);
};

export const moveTaskToCompleted = async (
  activeUserId,
  task,
  everyListItem
) => {
  const batch = writeBatch(db);
  const completedTaskRef = generateDocRef(activeUserId, "completed", task.id);
  batch.set(completedTaskRef, { ...task, completed: true });

  everyListItem.forEach((list) => {
    const listRef = generateDocRef(activeUserId, list, task.id);
    batch.delete(listRef);
  });

  try {
    batch.set(completedTaskRef, { ...task, completed: true });
    await batch.commit();
  } catch (error) {
    console.error(`Error: ${error} - Occurred @ moveTaskToCompleted.`);
  }
};
