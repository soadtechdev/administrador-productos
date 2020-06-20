import React, { Fragment, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import firebase from "../../config/firebase";
import { withRouter } from "react-router-dom";

import { UserAuthContext } from "../../context/auth";

const EditarProducto = (props) => {
  //obteniendo el id
  const { id } = props.match.params;
  const { userAuth } = useContext(UserAuthContext);
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    activo: false,
    descripcion: "",
  });
  const [imagen, setImagen] = useState("");
  const [uploadValue, setuploadValue] = useState(0);

  //validando formulario
  const validarCliente = () => {
    const { nombre, precio } = producto;
    if (nombre === "" || precio === "") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("platos")
      .doc(id)
      .get()
      .then((res) => {
        guardarProducto(res.data());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //leer datos del form
  const leerInformacionProducto = (e) => {
    const target = e.target;
    const value = target.name === "activo" ? target.checked : target.value;
    const name = target.name;
    guardarProducto({
      ...producto,
      [name]: value,
    });
  };

  //guardando iamgen en state
  const leerArchivo = (e) => {
    const file = e.target.files[0];
    const refStorage = firebase
      .storage()
      .ref(`imgsPlatos/${userAuth.id}/${file.name}`);

    const task = refStorage.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        const porcentaje =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadValue(porcentaje);
      },
      (error) => {
        console.log(error);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          setImagen(url);
        });
        setuploadValue(100);
      }
    );
  };

  //editando el producto en la base de datos
  const EditarProducto = async (e) => {
    e.preventDefault();
    validarCliente();
    firebase
      .firestore()
      .collection("platos")
      .doc(id)
      .update({ ...producto, imagen: imagen || producto.imagen })
      .then(() => {
        Swal.fire("Good job!", "Se ha editado el plato!", "success");
        props.history.push("/productos");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo editar el producto",
          footer: "<a href>Comunicate con el encargado</a>",
        });
      });
  };
  return (
    <Fragment>
      <h2>Editar Producto</h2>

      <form onSubmit={EditarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            value={producto.nombre}
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            value={producto.precio}
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <progress value={uploadValue} max="100"></progress>
          {producto.imagen ? (
            <img
              className="img-responsive"
              src={producto.imagen}
              alt="imagen"
            />
          ) : null}
          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>
        <div className="campo">
          <label>Activo:</label>
          <input
            type="checkbox"
            name="activo"
            checked={producto.activo}
            onChange={leerInformacionProducto}
            id="switch"
          />
          <label className="label" htmlFor="switch">
            Toggle
          </label>
        </div>
        <div className="campo">
          <label>Descripcion:</label>
          <textarea
            name="descripcion"
            placeholder="descripcion"
            value={producto.descripcion}
            onChange={leerInformacionProducto}
          ></textarea>
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Producto"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default withRouter(EditarProducto);
