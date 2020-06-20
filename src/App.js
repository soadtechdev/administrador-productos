import React, { Fragment } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import Productos from "./components/productos/Productos";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoProducto from "./components/productos/NuevoProducto";
import UserAuthProvider from "./context/auth";
import Root from "./components/root";
import GuardRoute from "./components/GuardRoute";

function App() {
  return (
    <BrowserRouter>
      <UserAuthProvider>
        <Root>
          <Fragment>
            <Header />
            <div className="grid contenedor contenido-principal">
              <Navegacion />

              <main className="caja-contenido col-9">
                <Switch>
                  <GuardRoute type="public" exact path="/" component={Login} />

                  {/**RUTA DE PRODUCTOS */}
                  <GuardRoute
                    type="private"
                    exact
                    path="/productos"
                    component={Productos}
                  />
                  <GuardRoute
                    type="private"
                    exact
                    path="/productos/nuevo"
                    component={NuevoProducto}
                  />
                  <GuardRoute
                    type="private"
                    exact
                    path="/productos/editar/:id"
                    component={EditarProducto}
                  />
                </Switch>
              </main>
            </div>
          </Fragment>
        </Root>
      </UserAuthProvider>
    </BrowserRouter>
  );
}

export default App;
