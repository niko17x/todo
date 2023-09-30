import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const addTodoToFirestore = async ({
  activeUsername,
  taskInput,
  urgentFlag,
  activeUserId,
  tags,
}) => {
  try {
    const todoCollection = collection(db, "todo");
    const newDocRef = doc(todoCollection); // This gets a new document reference with an auto-generated ID

    await setDoc(newDocRef, {
      taskId: newDocRef.id, // Use the auto-generated ID here
      username: activeUsername,
      userId: activeUserId,
      createdAt: serverTimestamp(),
      urgentFlag: urgentFlag,
      tags: tags,
      taskInput: taskInput,
      updatedAt: "",
      completed: false,
    });
  } catch (error) {
    console.log(`Error ${error} - occurred @ addTodoToFirestore function.`);
  }
};
