import React from "react";
import Formulario from "../components/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Editar = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {}
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-indigo-900">Edit Client</h1>
      <p className="mt-3">Complete the form</p>

      {cliente?.name ? (
        <Formulario cliente={cliente} />
      ) : (
        <p>invalid client ID</p>
      )}
    </>
  );
};

export default Editar;
