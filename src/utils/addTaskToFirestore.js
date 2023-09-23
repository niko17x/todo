import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// TODO: Try to learn FB batch and implement it here instead of using updateDoc().

export const addTodoToFirestore = async (
  activeUsername,
  taskInput,
  urgentFlag,
  userId,
  tags
) => {
  try {
    const docRef = await addDoc(collection(db, "todo"), {
      username: activeUsername,
      userId: userId,
      createdAt: serverTimestamp(),
      urgentFlag: urgentFlag,
      tags: tags,
      taskInput: taskInput,
    });

    if (docRef.id) {
      await updateDoc(docRef, {
        taskId: docRef.id,
      });
    }
  } catch (error) {
    console.log(`Error ${error} - occurred @ addTodoToFirestore function.`);
  }
};
