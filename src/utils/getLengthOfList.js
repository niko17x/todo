// Retrieve length of custom lists from Firestore.

import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const getLengthOfList = async (list, activeUserId) => {
  if (!activeUserId) {
    return null;
  }
  const collRef = collection(db, `todo/${activeUserId}/${list}`);
  const collRefQuery = query(collRef, where("showDoc", "==", true));
  const snapshot = await getCountFromServer(collRefQuery);
  return snapshot.data().count;
};
