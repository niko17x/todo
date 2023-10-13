// Move tasks that are in "complete" collection to "today" collection when tasks are toggled back to incomplete status.

import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveIncompleteTasksToToday = async (
  activeUserId,
  selectedList,
  task
) => {
  try {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${task}`);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      const data = docData.data();
      const collRef = collection(db, `todo/${activeUserId}/today`);
      await addDoc(collRef, data);
      deleteDoc(docRef);
    }
  } catch (error) {
    console.log(`Error: ${error} - Occurred @ moveIncompleteTaskToToday`);
  }
};
