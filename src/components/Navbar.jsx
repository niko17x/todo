import React, { useContext } from "react";
import { ModalContext, UserContext } from "../App";
import { signOutUser } from "../utils/authServices";

const Navbar = () => {
  const {
    activeUser,
    activeUsername,
    setActiveUser,
    setActiveUsername,
    setActiveUserId,
  } = useContext(UserContext);
  const { setShowLoginModal } = useContext(ModalContext);

  const handleUserSignout = () => {
    signOutUser();
    setActiveUser("");
    setActiveUsername("");
    setActiveUserId("");
    setActiveUsername("guest");
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
          <div className="greeting">
            Welcome, {activeUsername}
            <div>Log Out</div>
          </div>
        ) : (
          <div className="greeting">
            Welcome, Guest
            <div>Log In</div>
          </div>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
