// Perform a batch delete through all list (custom and default) when a task gets deleted => Efficiently remove all related tasks when user deletes task from any list.

import { doc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";

export const removeDeletedTasksFromAllLists = async (
  activeUserId,
  task,
  defaultList
) => {
  if (!task) {
    return;
  }
  const batch = writeBatch(db);
  try {
    defaultList.forEach((list) => {
      const docRef = doc(db, `todo/${activeUserId}/${list}/${task.id}`);
      batch.delete(docRef);
    });
    await batch.commit();
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ removeDeletedTasksFromAllLists`);
  }
};
