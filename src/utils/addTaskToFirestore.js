// Adds task to "today" subcollection within "todo" collection (this is default location for created tasks).
import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const addTaskToFirestore = async ({
  activeUsername,
  taskInput,
  urgentFlag,
  activeUserId,
  tags,
  selectedList,
  id,
  list,
}) => {
  try {
    const todoCollection = collection(
      db,
      `todo/${activeUserId}/${selectedList}`
    );
    // Auto-generate a new ID if no data passed through ID parameter:
    const newDocRef = id ? doc(todoCollection, id) : doc(todoCollection);

    await setDoc(newDocRef, {
      username: activeUsername,
      userId: activeUserId,
      createdAt: serverTimestamp(),
      urgentFlag: urgentFlag,
      tags: tags,
      taskInput: taskInput,
      updatedAt: "",
      completed: false,
      showDoc: true,
      list: list,
    });
    const generatedTaskId = newDocRef.id;
    return { generatedTaskId };
  } catch (error) {
    console.log(`Error ${error} - occurred @ addTaskToFirestore function.`);
  }
};
