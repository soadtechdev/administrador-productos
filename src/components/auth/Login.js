import React, { useState } from "react";
import firebase from "../../config/firebase";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datos.email.length || !datos.password.length) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    setError(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(datos.email, datos.password)
      .catch((error) => {
        alert(`hubo un error ${error}`);
      });
  };

  return (
    <section id="main-container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesion</h2>
          {/* <p onClick={handleLoginGoogle}>Iniciar sesion con google</p> */}
          <div className="form group">
            <label>Email</label>
            <input
              type="text"
              className="inputs"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form group my-3">
            <label>Password</label>
            <input
              type="password"
              className="inputs"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <p className="error">Todos los campos son obligatorios</p>
          ) : null}
          <input
            className="btn btn-primary w-100"
            type="submit"
            value="Log in"
          />
        </form>
      </div>
    </section>
  );
};

export default Login;
