import React, { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {}
    };

    obtenerClientesAPI();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("Do you want to delete this client?");

    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        await respuesta.json();

        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {}
    }
  };
  return (
    <>
      <h1 className="font-black text-4xl text-indigo-900">Clients</h1>
      <p className="mt-3">Manage your customers</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-indigo-800 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Company</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              handleEliminar={handleEliminar}
              key={cliente.id}
              cliente={cliente}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
