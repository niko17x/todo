import React, { useContext, useState } from "react";
import { signUpUser } from "../utils/authServices";
import { ModalContext, UserContext } from "../App";
import { hideAllModal, toggleModalView } from "../utils/helpers";
import UseFetchUsername from "../utils/fetchUsername";

export const SignupModal = () => {
  const { showSignupModal, setShowLoginModal, setShowSignupModal } =
    useContext(ModalContext);
  const { activeUsername, setActiveUsername } = useContext(UserContext);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleSignUpUser = async (e) => {
    const userObj = await signUpUser(
      signupEmail,
      signupPassword,
      activeUsername
    );
    if (userObj && userObj.user) {
      UseFetchUsername(userObj.uid, setActiveUsername);
      e.target.reset();
      hideAllModal(setShowLoginModal, setShowSignupModal);
    } else {
      console.log("Something went wrong during signup.");
    }
  };

  return (
    <div className={showSignupModal ? "overlay" : ""}>
      <div className="signupModal show modal">
        <div className="show">
          <button
            className="close"
            type="button"
            onClick={() => setShowSignupModal(false)}
          >
            X
          </button>
          <form
            id="sign_in--form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUpUser(e);
            }}
          >
            <fieldset>
              <label htmlFor="username">
                <input
                  type="text"
                  name="username"
                  placeholder="USERNAME"
                  onChange={(e) => setActiveUsername(e.target.value)}
                ></input>
              </label>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  onChange={(e) => setSignupEmail(e.target.value)}
                ></input>
              </label>
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  onChange={(e) => setSignupPassword(e.target.value)}
                ></input>
              </label>
            </fieldset>
            <button type="submit">Sign Up</button>
            <div className="signup">
              Already registered?
              <span
                className="modal-link"
                onClick={() =>
                  toggleModalView(setShowLoginModal, setShowSignupModal)
                }
              >
                {" "}
                Log In
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
