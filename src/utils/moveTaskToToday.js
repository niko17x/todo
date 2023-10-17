// Remove task from Completed and add same task (ID) to Today.

import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveTaskToToday = async (activeUserId, task) => {
  const batch = writeBatch(db);
  const completedDocRef = doc(db, `todo/${activeUserId}/completed/${task.id}`);
  const allDocRef = doc(db, `todo/${activeUserId}/all/${task.id}`);

  // TODO: Optimize this code:
  const docSnap = await getDoc(completedDocRef);
  let result;
  if (docSnap.exists()) {
    result = docSnap.data().list;
  }
  const ref = doc(db, `todo/${activeUserId}/${result}/${task.id}`);

  // ?

  try {
    batch.set(ref, { ...task, completed: false });
    batch.set(allDocRef, { ...task, completed: false });
    batch.delete(completedDocRef);
    await batch.commit();
  } catch (error) {
    console.error(`Error in addCompletedTaskToFirestore: ${error.message}`);
  }
};
