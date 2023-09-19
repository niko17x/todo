export const toggleModalView = (setShowLoginModal, setShowSignupModal) => {
  setShowLoginModal((prev) => !prev);
  setShowSignupModal((prev) => !prev);
};

export const hideAllModal = (setShowLoginModal, setShowSignupModal) => {
  setShowLoginModal(false);
  setShowSignupModal(false);
};
