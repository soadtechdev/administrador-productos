import React, { useContext } from "react";
import { UserAuthContext } from "../context/auth";

const Root = (props) => {
  const { Auth } = useContext(UserAuthContext);
  const { children } = props;

  if (!Auth.authReady) {
    return <div>Cargando...</div>;
  }
  return children;
};

export default Root;
