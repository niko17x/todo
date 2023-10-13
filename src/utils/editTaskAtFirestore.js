import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const editTaskOnFirestore = async (
  taskInput,
  urgentFlag,
  taskId,
  tags,
  selectedList,
  activeUserId
) => {
  try {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${taskId}`);
    await updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      urgentFlag: urgentFlag,
      tags: [tags],
      taskInput: taskInput,
      completed: false,
    });
  } catch (error) {
    console.log(`Error ${error} - occured @ editTaskAtFirestore.js.`);
  }
};
