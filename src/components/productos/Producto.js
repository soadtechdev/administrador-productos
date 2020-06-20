import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";

const Producto = ({ id, nombre, precio, imagen, activo }) => {
  const eliminarProducto = (idProducto) => {
    Swal.fire({
      title: "Estas seguro que quieres eliminarlo?",
      text: "No podras deshacer esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        firebase
          .firestore()
          .collection("platos")
          .doc(idProducto)
          .delete()
          .then(() => {
            Swal.fire("Good job!", "Se ha eliminado el plato!", "success");
          });
      }
    });
  };
  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio}</p>
        {imagen ? (
          <img src={imagen} alt={nombre} className="img-responsive" />
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Plato
        </Link>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Plato
        </button>
      </div>
    </li>
  );
};

export default Producto;
