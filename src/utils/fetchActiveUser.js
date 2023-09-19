import { auth } from "../lib/firebase";

const fetchActiveUser = (setActiveUser, setActiveUserId) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setActiveUser(user);
      setActiveUserId(user.uid);
    }
  });
  return () => unsubscribe();
};

export default fetchActiveUser;
