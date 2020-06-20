import React, { createContext, useState, useEffect } from "react";
import { watchUserChanges } from "../config/watcher";

export const UserAuthContext = createContext();
const UserAuthProvider = (props) => {
  const [userAuth, setUserAuth] = useState({});
  const [Auth, setAuth] = useState({
    isLogged: false,
    authReady: false,
  });

  useEffect(() => {
    watchUserChanges((user) => {
      if (user) {
        setAuth({
          isLogged: true,
          authReady: true,
        });

        setUserAuth(user);
      } else {
        setAuth({
          isLogged: false,
          authReady: true,
        });

        setUserAuth({});
      }
    });
  }, []);

  return (
    <UserAuthContext.Provider value={{ userAuth, Auth }}>
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
