import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const fetchTodoCollection = async (setTodoTasks, activeUserId) => {
  const queryTodoCollectionRef = query(
    collection(db, "todo"),
    where("userId", "==", `${activeUserId}`),
    orderBy("createdAt", "asc")
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
};
