// Adds task to "today" subcollection within "todo" collection (this is default location for created tasks).
import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const addTodoToFirestore = async ({
  activeUsername,
  taskInput,
  urgentFlag,
  activeUserId,
  tags,
  selectedList,
}) => {
  try {
    const todoCollection = collection(
      db,
      `todo/${activeUserId}/${selectedList}`
    );
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
      showDoc: true,
    });
  } catch (error) {
    console.log(`Error ${error} - occurred @ addTodoToFirestore function.`);
  }
};
