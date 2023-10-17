// import { createContext, useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import { LoginModal } from "./components/LoginModal";
// import { TodoInput } from "./components/TodoInput";
// import { SignupModal } from "./components/SignupModal";
// import fetchActiveUser from "./utils/fetchActiveUser";
// import fetchUsername from "./utils/fetchUsername";
// import { MappedTodoItems } from "./components/MappedTodoItems";
// import { TaskEditModal } from "./components/TaskEditModal";
// import { Sidebar } from "./components/Sidebar";
// import { loadListToFirestore } from "./utils/loadListToFirestore";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "./lib/firebase";

// export const DataContext = createContext();

// const App = () => {
//   const [activeUserId, setActiveUserId] = useState("");
//   const [activeUser, setActiveUser] = useState("");
//   const [activeUsername, setActiveUsername] = useState("guest");
//   const [todoTasks, setTodoTasks] = useState([]);
//   const [taskEditId, setTaskEditId] = useState("");
//   const [isUrgent, setIsUrgent] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [showTaskEditModal, setShowTaskEditModal] = useState(false);
//   const [selectedList, setSelectedList] = useState("today");
//   const [listCounts, setListCounts] = useState({});
//   const [customList, setCustomList] = useState([]);
//   const [defaultList, setDefaultList] = useState([
//     "today",
//     "all",
//     "urgent",
//     "completed",
//   ]);

//   useEffect(() => {
//     fetchActiveUser(setActiveUser, setActiveUserId);
//   }, []);

//   useEffect(() => {
//     fetchUsername(activeUserId, setActiveUsername);
//   }, [activeUserId]);

//   useEffect(() => {
//     const loadIfNecessary = async () => {
//       const docRef = await getDoc(doc(db, `users/${activeUserId}`));
//       if (!docRef.data().hasDefaultList) {
//         await loadListToFirestore(activeUserId, defaultList);
//         await updateDoc(doc(db, `users/${activeUserId}`), {
//           hasDefaultList: true,
//         });
//       }
//     };
//     if (activeUserId) {
//       loadIfNecessary();
//     }
//   }, [activeUserId, defaultList]);

//   return (
//     <DataContext.Provider
//       value={{
//         activeUser,
//         activeUsername,
//         activeUserId,
//         todoTasks,
//         taskEditId,
//         isUrgent,
//         showTaskEditModal,
//         showLoginModal,
//         showSignupModal,
//         defaultList,
//         selectedList,
//         customList,
//         listCounts,
//         setListCounts,
//         setCustomList,
//         setSelectedList,
//         setIsUrgent,
//         setTaskEditId,
//         setTodoTasks,
//         setShowLoginModal,
//         setShowSignupModal,
//         setActiveUser,
//         setActiveUsername,
//         setActiveUserId,
//         setShowTaskEditModal,
//       }}
//     >
//       <div className="container">
//         {showLoginModal && <LoginModal />}
//         {showSignupModal && <SignupModal />}
//         {showTaskEditModal && <TaskEditModal />}
//         <Navbar />

//         <div className="main">
//           <div className="taskComponents">
//             {selectedList !== "all" &&
//               selectedList !== "urgent" &&
//               selectedList !== "completed" && <TodoInput />}
//             <MappedTodoItems />
//           </div>
//           <Sidebar />
//         </div>
//       </div>
//     </DataContext.Provider>
//   );
// };

// export default App;

import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { LoginModal } from "./components/LoginModal";
import { TodoInput } from "./components/TodoInput";
import { SignupModal } from "./components/SignupModal";
import fetchActiveUser from "./utils/fetchActiveUser";
import fetchUsername from "./utils/fetchUsername";
import { MappedTodoItems } from "./components/MappedTodoItems";
import { TaskEditModal } from "./components/TaskEditModal";
import { Sidebar } from "./components/Sidebar";
import { loadListToFirestore } from "./utils/loadListToFirestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

export const UserContext = createContext();
export const TaskContext = createContext();
export const ModalContext = createContext();
export const ListContext = createContext();

const App = () => {
  const [activeUserId, setActiveUserId] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [activeUsername, setActiveUsername] = useState("guest");
  const [todoTasks, setTodoTasks] = useState([]);
  const [taskEditId, setTaskEditId] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [selectedList, setSelectedList] = useState("today");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showTaskEditModal, setShowTaskEditModal] = useState(false);
  const [listCounts, setListCounts] = useState({});
  const [customList, setCustomList] = useState([]);
  const [defaultList, setDefaultList] = useState([
    "today",
    "all",
    "urgent",
    "completed",
  ]);

  const userData = {
    activeUser,
    activeUserId,
    activeUsername,
    setActiveUser,
    setActiveUserId,
    setActiveUsername,
  };
  const taskData = {
    todoTasks,
    isUrgent,
    taskEditId,
    setTaskEditId,
    setIsUrgent,
    setTodoTasks,
  };
  const modalData = {
    showLoginModal,
    showSignupModal,
    showTaskEditModal,
    setShowLoginModal,
    setShowSignupModal,
    setShowTaskEditModal,
  };
  const listData = {
    selectedList,
    customList,
    defaultList,
    listCounts,
    setSelectedList,
    setCustomList,
    setDefaultList,
    setListCounts,
  };

  useEffect(() => {
    fetchActiveUser(setActiveUser, setActiveUserId);
  }, []);

  useEffect(() => {
    fetchUsername(activeUserId, setActiveUsername);
  }, [activeUserId]);

  useEffect(() => {
    const loadIfNecessary = async () => {
      const docRef = await getDoc(doc(db, `users/${activeUserId}`));
      if (!docRef.data().hasDefaultList) {
        await loadListToFirestore(activeUserId, defaultList);
        await updateDoc(doc(db, `users/${activeUserId}`), {
          hasDefaultList: true,
        });
      }
    };
    if (activeUserId) {
      loadIfNecessary();
    }
  }, [activeUserId, defaultList]);

  return (
    <UserContext.Provider value={userData}>
      <TaskContext.Provider value={taskData}>
        <ModalContext.Provider value={modalData}>
          <ListContext.Provider value={listData}>
            <div className="container">
              {showLoginModal && <LoginModal />}
              {showSignupModal && <SignupModal />}
              {showTaskEditModal && <TaskEditModal />}
              <Navbar />
              <div className="main">
                <div className="taskComponents">
                  {selectedList !== "all" &&
                    selectedList !== "urgent" &&
                    selectedList !== "completed" && <TodoInput />}
                  <MappedTodoItems />
                </div>
                <Sidebar />
              </div>
            </div>
          </ListContext.Provider>
        </ModalContext.Provider>
      </TaskContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
