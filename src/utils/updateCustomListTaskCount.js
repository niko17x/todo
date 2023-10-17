// Update the listCounts state.

export const updateCustomListTaskCount = (
  setListCounts,
  selectedList,
  operator
) => {
  const operation = operator === "subtract" ? -1 : +1;
  setListCounts((prevCount) => ({
    ...prevCount,
    [selectedList]: prevCount[selectedList] + operation,
  }));
};

// Update the listCounts state.

// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../lib/firebase";

// export const updateCustomListTaskCount = async (
//   setListCounts,
//   operator,
//   activeUserId,
//   task
// ) => {
//   const completedDocRef = doc(db, `todo/${activeUserId}/completed/${task}`);
//   const docSnap = await getDoc(completedDocRef);
//   let result;
//   if (docSnap.exists()) {
//     result = docSnap.data().list;
//   }
//   const ref = doc(db, `todo/${activeUserId}/${result}/${task}`);

//   const operation = operator === "subtract" ? -1 : 1;
//   setListCounts((prevCount) => ({
//     ...prevCount,
//     [ref]: prevCount[ref] + operation,
//   }));
// };
