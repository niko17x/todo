import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

export const fetchTodoCollection = (
  setTodoTasks,
  activeUserId,
  selectedList
) => {
  if (!activeUserId) {
    // console.warn(
    //   "activeUserId is undefined or null - Occurred @ fetchTodoCollection function."
    // );
    return;
  } else {
    const queryTodoCollectionRef = query(
      collection(db, `todo/${activeUserId}/${selectedList}`),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(queryTodoCollectionRef, (snapshot) => {
      const newTask = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodoTasks(newTask);
    });
    return () => {
      unsubscribe();
    };
  }
};
