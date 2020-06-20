import firebase from "./firebase";

export const watchUserChanges = (callback) => {
  const unsub = firebase.auth().onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      callback({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        imagen: user.photoURL,
      });
    } else {
      callback(null);
    }
  });
  return unsub;
};
