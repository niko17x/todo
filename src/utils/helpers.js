export const toggleModalView = (setShowLoginModal, setShowSignupModal) => {
  setShowLoginModal((prev) => !prev);
  setShowSignupModal((prev) => !prev);
};

export const hideAllModal = (setShowLoginModal, setShowSignupModal) => {
  setShowLoginModal(false);
  setShowSignupModal(false);
};

export const addHashToTags = (tags) => {
  const splitTags = tags.split(" ");
  return splitTags.map((tag) => "#" + tag + " ");
};

export const resetInputs = (setTaskInput, setIsUrgent, setTags) => {
  setTaskInput("");
  setIsUrgent(false);
  setTags("");
};

export const displayWarningMessage = (setter) => {
  setTimeout(() => {
    setter(false);
  }, 2000);
  setter(true);
  return;
};
