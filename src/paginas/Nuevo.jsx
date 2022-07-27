import React from "react";
import Formulario from "../components/Formulario";

const Nuevo = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-indigo-900">New Client</h1>
      <p className="mt-3">Complete the form</p>

      <Formulario />
    </>
  );
};

export default Nuevo;
