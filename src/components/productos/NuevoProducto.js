import React, { Fragment, useState, useContext } from "react";
import Swal from "sweetalert2";
import firebase from "../../config/firebase";
import { withRouter } from "react-router-dom";
import { UserAuthContext } from "../../context/auth";

const NuevoProducto = ({ history }) => {
  const { userAuth } = useContext(UserAuthContext);
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    activo: false,
    descripcion: "No hay descripcion",
  });
  const [imagen, setImagen] = useState("");
  const [uploadValue, setuploadValue] = useState(0);

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

  const validarCliente = () => {
    const { nombre, precio } = producto;
    let valido = !nombre.length || !precio.length;

    return valido;
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

  //almacenar el nuevo producto en la bd
  const agregarProducto = async (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("platos")
      .add({
        ...producto,
        uid: userAuth.id,
        author: userAuth.email,
        imagen: imagen,
      })
      .then(() => {
        Swal.fire("Good job!", "Se ha creado el plato!", "success");
        history.goBack();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo crear el producto",
          footer: "<a href>Comunicate con el encargado</a>",
        });
      });
  };

  return (
    <Fragment>
      <h2>Buevo producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <progress value={uploadValue} max="100"></progress>
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
            onChange={leerInformacionProducto}
          ></textarea>
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default withRouter(NuevoProducto);
