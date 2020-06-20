import React from "react";
import { Redirect } from "react-router-dom";
import firebase from "../../config/firebase";

const Header = () => {
  const handleSesion = () => {
    firebase
      .auth()
      .signOut()
      .then(() => <Redirect to="/" />);
  };
  return (
    <header className="barra">
      <div className="contenedor d-flex">
        <h1>CRM - Administrador de el bendecido de la 63</h1>
        <button onClick={handleSesion}>Cerrar sesion</button>
      </div>
    </header>
  );
};

export default Header;
