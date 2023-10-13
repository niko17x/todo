import {
  collection,
  runTransaction,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const moveTaskToToday = async (activeUserId, task) => {
  try {
    // Begin a transaction
    await runTransaction(db, async (transaction) => {
      const completedCollRef = collection(db, `todo/${activeUserId}/completed`);

      // Check for existing task using a query
      const q = query(completedCollRef, where("originalTaskId", "==", task.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If task doesn't exist, add it to the 'completed' collection
        const newDocRef = doc(completedCollRef);
        transaction.set(newDocRef, {
          ...task,
          completed: true,
          originalTaskId: task.id,
        });
      } else {
        console.log("Task already exists in the 'completed' collection!");
      }
    });
  } catch (error) {
    console.error(`Error in addCompletedTaskToFirestore: ${error.message}`);
  }
};
