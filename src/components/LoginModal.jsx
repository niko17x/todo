import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import { signInUser } from "../utils/authServices";
import { hideAllModal, toggleModalView } from "../utils/helpers";
import UseFetchUsername from "../utils/fetchUsername";
import { deleteGuestTasks } from "../utils/deleteGuestTasks";

export const LoginModal = () => {
  const {
    showLoginModal,
    setShowLoginModal,
    setShowSignupModal,
    setActiveUsername,
    setActiveUser,
  } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSigninUser = async (e) => {
    const userObj = await signInUser(email, password);
    if (userObj) {
      deleteGuestTasks();
      UseFetchUsername(userObj.uid, setActiveUsername);
      setActiveUser(userObj.uid);
      e.target.reset();
      hideAllModal(setShowLoginModal, setShowSignupModal);
    } else {
      console.log("Something went wrong during signup.");
    }
  };

  return (
    <div className={showLoginModal ? "overlay" : ""}>
      <div className="loginModal show modal">
        <div className="show">
          <button
            className="close"
            type="button"
            onClick={() => setShowLoginModal(false)}
          >
            X
          </button>
          <form
            id="sign_in--form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSigninUser(e);
            }}
          >
            <fieldset>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </label>
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </label>
            </fieldset>
            <button type="submit">Log In</button>
            <div className="signup">
              New here?
              <span
                className="modal-link"
                onClick={() =>
                  toggleModalView(setShowLoginModal, setShowSignupModal)
                }
              >
                {" "}
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
