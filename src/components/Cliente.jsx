import React from "react";
import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();

  const { name, company, email, phone, note, id } = cliente;

  return (
    <tr className="border-b hover:bg-gray-200">
      <td className="p-3">{name}</td>
      <td className="p-3">
        <p>
          {" "}
          <span className="text-gray-800 uppercase font-bold">
            Email:{" "}
          </span>{" "}
          {email}{" "}
        </p>
        <p>
          {" "}
          <span className="text-gray-800 uppercase font-bold">
            {" "}
            Phone:{" "}
          </span>{" "}
          {phone}{" "}
        </p>
      </td>
      <td className="p-3"> {company} </td>
      <td className="p-3">
        <button
          className="bg-green-500 hover:bg-green-600 block w-full text-white p-2 uppercase font-bold text-xs"
          type="button"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          See
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          type="button"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          type="button"
          onClick={() => handleEliminar(id)}
        >
          Delete
        </button>
      </td>
      {/* <td className="p-3">{note}</td> */}
    </tr>
  );
};

export default Cliente;
