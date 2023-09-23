import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const editTaskOnFirestore = async (taskInput, urgentFlag, taskId) => {
  try {
    const docRef = doc(db, `todo/${taskId}`);
    await updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      urgentFlag: urgentFlag,
      tags: [],
      taskInput: taskInput,
    });
  } catch (error) {
    console.log(`Error ${error} - occured @ editTaskAtFirestore.js.`);
  }
};
