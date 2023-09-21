import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { LoginModal } from "./components/LoginModal";
import { TodoInput } from "./components/TodoInput";
import { SignupModal } from "./components/SignupModal";
import fetchActiveUser from "./utils/fetchActiveUser";
import fetchUsername from "./utils/fetchUsername";
import { MappedTodoItems } from "./components/MappedTodoItems";

export const DataContext = createContext();

const App = () => {
  const [activeUserId, setActiveUserId] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [activeUsername, setActiveUsername] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
        setShowLoginModal,
        setShowSignupModal,
        setActiveUser,
        setActiveUsername,
        setActiveUserId,
      }}
    >
      <div className="container">
        <Navbar />
        <TodoInput />
        <MappedTodoItems />
        {showLoginModal ? <LoginModal /> : null}
        {showSignupModal ? <SignupModal /> : null}
      </div>
    </DataContext.Provider>
  );
};

export default App;
