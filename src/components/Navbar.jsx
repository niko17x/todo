import React, { useContext } from "react";
import { DataContext } from "../App";
import { signOutUser } from "../utils/authServices";

const Navbar = () => {
  const {
    activeUser,
    activeUsername,
    setShowLoginModal,
    setActiveUser,
    setActiveUsername,
    setActiveUserId,
  } = useContext(DataContext);

  const handleUserSignout = () => {
    signOutUser();
    setActiveUser("");
    setActiveUsername("");
    setActiveUserId("");
  };

  const handleSetShowLoginModal = () => {
    if (activeUser) {
      handleUserSignout();
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
