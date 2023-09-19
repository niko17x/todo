import React, { useContext } from "react";
import { DataContext } from "../App";
import { signOutUser } from "../utils/authServices";

const Navbar = () => {
  const {
    setShowLoginModal,
    activeUser,
    setActiveUser,
    activeUsername,
    setActiveUsername,
  } = useContext(DataContext);

  const handleSetShowLoginModal = () => {
    if (activeUser) {
      signOutUser();
      setActiveUser("");
      setActiveUsername("");
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <nav className="navbar">
      <p>Todo App</p>
      <button type="button" onClick={() => handleSetShowLoginModal(true)}>
        {activeUser ? (
          <div>
            Welcome, {activeUsername}
            <div>Log Out</div>
          </div>
        ) : (
          "Log In"
        )}
      </button>
    </nav>
  );
};

export default Navbar;
