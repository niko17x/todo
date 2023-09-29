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
  const filteredTags = splitTags.filter((tag) => tag !== "" && tag.length > 1);
  return filteredTags
    .map((tag) => {
      return tag.includes("#") ? tag : "#" + tag;
    })
    .join(" ");
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
