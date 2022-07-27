import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Ver = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {}
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);

  return Object.keys(cliente).length === 0 ? (
    <p>Refresh...</p>
  ) : (
    <div>
      {cargando ? (
        "Refresh..."
      ) : (
        <>
          <h1 className="font-black text-4xl text-indigo-900">
            See Client: {cliente.name}{" "}
          </h1>
          <p className="mt-3">Client info</p>

          {cliente.name && (
            <p className="text-4xl text-gray-600 mt-10">
              <span className="text-gray-800 uppercase font-bold">Client:</span>{" "}
              {cliente.name}
            </p>
          )}

          {cliente.email && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold"> Email:</span>{" "}
              {cliente.email}
            </p>
          )}

          {cliente.phone && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Phone:</span>{" "}
              {cliente.phone}
            </p>
          )}

          {cliente.company && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Company:
              </span>{" "}
              {cliente.company}
            </p>
          )}

          {cliente.note && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Note:</span>{" "}
              {cliente.note}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Ver;
