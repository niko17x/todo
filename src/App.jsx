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

export const DataContext = createContext();

const App = () => {
  const [activeUserId, setActiveUserId] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [activeUsername, setActiveUsername] = useState("guest");
  const [todoTasks, setTodoTasks] = useState([]);
  const [taskEditId, setTaskEditId] = useState(""); // ! Change this to a more dynamic version for the "task ID".
  const [isUrgent, setIsUrgent] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showTaskEditModal, setShowTaskEditModal] = useState(false);
  const [selectedList, setSelectedList] = useState("today");
  const [defaultList, setDefaultList] = useState([
    "today",
    "all",
    "urgent",
    "completed",
  ]);

  useEffect(() => {
    fetchActiveUser(setActiveUser, setActiveUserId);
  }, []);

  useEffect(() => {
    fetchUsername(activeUserId, setActiveUsername);
  }, [activeUserId]);

  // Load default list (in Sidebar) to FS:
  useEffect(() => {
    loadListToFirestore(activeUserId, defaultList);
  }, [activeUserId, defaultList]);

  return (
    <DataContext.Provider
      value={{
        activeUser,
        activeUsername,
        activeUserId,
        todoTasks,
        taskEditId,
        isUrgent,
        showTaskEditModal,
        showLoginModal,
        showSignupModal,
        defaultList,
        selectedList,
        setSelectedList,
        setIsUrgent,
        setTaskEditId,
        setTodoTasks,
        setShowLoginModal,
        setShowSignupModal,
        setActiveUser,
        setActiveUsername,
        setActiveUserId,
        setShowTaskEditModal,
      }}
    >
      <div className="container">
        {showLoginModal ? <LoginModal /> : null}
        {showSignupModal ? <SignupModal /> : null}
        {showTaskEditModal ? <TaskEditModal /> : null}
        <Navbar />

        <div className="main">
          <div className="taskComponents">
            <TodoInput />
            <MappedTodoItems />
          </div>
          <Sidebar />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
