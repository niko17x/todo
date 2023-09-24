import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { LoginModal } from "./components/LoginModal";
import { TodoInput } from "./components/TodoInput";
import { SignupModal } from "./components/SignupModal";
import fetchActiveUser from "./utils/fetchActiveUser";
import fetchUsername from "./utils/fetchUsername";
import { MappedTodoItems } from "./components/MappedTodoItems";
import { TaskEditModal } from "./components/TaskEditModal";

export const DataContext = createContext();

const App = () => {
  const [activeUserId, setActiveUserId] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [activeUsername, setActiveUsername] = useState("guest");
  const [taskInput, setTaskInput] = useState("");
  const [todoTasks, setTodoTasks] = useState([]);
  const [taskEditId, setTaskEditId] = useState(""); // ! Change this to a more dynamic version for the "task ID".
  const [isUrgent, setIsUrgent] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showTaskEditModal, setShowTaskEditModal] = useState(false);

  useEffect(() => {
    fetchActiveUser(setActiveUser, setActiveUserId);
  }, []);

  fetchUsername(activeUserId, setActiveUsername);

  return (
    <DataContext.Provider
      value={{
        activeUser,
        activeUsername,
        activeUserId,
        taskInput,
        todoTasks,
        taskEditId,
        isUrgent,
        setIsUrgent,
        setTaskEditId,
        setTodoTasks,
        setShowLoginModal,
        setShowSignupModal,
        setActiveUser,
        setActiveUsername,
        setActiveUserId,
        setTaskInput,
        setShowTaskEditModal,
      }}
    >
      <div className="container">
        <Navbar />
        <TodoInput />
        <MappedTodoItems />
        {showLoginModal ? <LoginModal /> : null}
        {showSignupModal ? <SignupModal /> : null}
        {showTaskEditModal ? <TaskEditModal /> : null}
      </div>
    </DataContext.Provider>
  );
};

export default App;
