import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Inicio from "./paginas/Inicio";
import Nuevo from "./paginas/Nuevo";
import Editar from "./paginas/Editar";
import Ver from "./paginas/Ver";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<Nuevo />} />
          <Route path="editar/:id" element={<Editar />} />
          <Route path=":id" element={<Ver />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
