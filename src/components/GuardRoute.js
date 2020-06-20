import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserAuthContext } from "../context/auth";

const GuardRoute = (props) => {
  const { Auth } = useContext(UserAuthContext);
  const { type, ...rest } = props;

  //protegemos las rutas
  if (type === "private" && !Auth.isLogged) {
    return <Redirect to="/" />;
  } else if (type === "public" && Auth.isLogged) {
    return <Redirect to="/productos" />;
  }

  return <Route {...rest} />;
};

export default GuardRoute;
