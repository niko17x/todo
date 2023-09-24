import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const deleteGuestTasks = async () => {
  const queryCollRef = query(
    collection(db, "todo"),
    where("username", "==", "guest")
  );
  const querySnapshot = await getDocs(queryCollRef);
  querySnapshot.forEach((doc) => {
    const docRef = doc.ref;
    deleteDoc(docRef);
  });
};
