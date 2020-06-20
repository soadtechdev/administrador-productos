import React, { Fragment, useEffect, useState } from "react";
import Producto from "./Producto";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";
import Spinner from "../layout/Spinner";

const Productos = () => {
  const [productos, guardarProductos] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("platos")
      .orderBy("nombre", "asc")
      .onSnapshot((snapshot) => {
        const newMascota = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        guardarProductos(newMascota);
      });
  }, []);

  return (
    <Fragment>
      <h2>Platos de comida</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Plato
      </Link>

      <ul className="listado-productos">
        {!productos.length ? <Spinner /> : null}
        {productos.map((producto) => (
          <Producto
            key={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            imagen={producto.imagen}
            id={producto.id}
            activo={producto.activo}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
