import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const Formulario = ({ cliente }) => {
  // redireccionamiento de mi router
  const navigate = useNavigate();

  // haciendo validación con yup
  const nuevoClienteSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "the name is too short")
      .max(40, "tha name is too long")
      .required("Client name is required"),
    company: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.number()
      .positive("The phone number is not valid")
      .integer("The phone number is not valid")
      .typeError("The phone number is not valid"),
    note: "",
  });

  const handleSubmit = async (valores) => {
    // IMPLEMENTANDO UNA REST API
    try {
      let respuesta;
      if (cliente.id) {
        // editando un registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // nuevo registro
        const url = "http://localhost:4000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await respuesta.json();

      navigate("/clientes");
    } catch (error) {}
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-4xl  uppercase text-center">
        {cliente?.name ? "Edit Client" : "Add Client"}
      </h1>

      <Formik
        initialValues={{
          name: cliente?.name ?? "",
          company: cliente?.company ?? "",
          email: cliente?.email ?? "",
          phone: cliente?.phone ?? "",
          note: cliente?.note ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Name:
                </label>
                <Field
                  id="name"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  type="text"
                  placeholder="Client Name"
                  name="name"
                />

                {errors.name && touched.name ? (
                  <Alert> {errors.name} </Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">
                  Company:
                </label>
                <Field
                  id="company"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  type="text"
                  placeholder="Company Name"
                  name="company"
                />
                {errors.company && touched.company ? (
                  <Alert> {errors.company} </Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert> {errors.email} </Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="phone">
                  Phone:
                </label>
                <Field
                  id="phone"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  type="tel"
                  placeholder="Phone Client"
                  name="phone"
                />
                {errors.phone && touched.phone ? (
                  <Alert> {errors.phone} </Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="note">
                  Notes:
                </label>
                <Field
                  as="textarea"
                  id="note"
                  className="mt-2 block w-full p-3 bg-gray-200 h-40"
                  type="text"
                  placeholder="Note Clients"
                  name="note"
                />
              </div>

              <input
                type="submit"
                value={cliente?.name ? "Edit Client" : "Add Client"}
                className="bg-indigo-700 text-white uppercase mt-5 w-full p-3 font-bold  text-lg cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
