import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../../components/auth/Input";
import Rating from "../../components/shared/Rating";
import Button from "../../components/shared/Button";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormModeContext } from "../../context/FormModeContext";
import { useNavigate } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";

const Contact = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(false);
  }, [updateFormMode, updateEditScreen]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    surname: Yup.string().required("Los apellidos son obligatorios"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "El correo electrónico no tiene un formato válido"
      )
      .required("El correo es obligatorio"),
    message: Yup.string().required("El mensaje no puede estar vacío"),
    rating: Yup.number()
      .min(1, "Debes seleccionar una valoración")
      .required("La valoración es obligatoria"),
  });

  // Valores iniciales del formulario
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    message: "",
    rating: 0,
  };

  // Manejo de envío del formulario
  const handleSubmit = (values, { resetForm }) => {
    console.log("Correo de contacto enviado", values);

    toast.success("Correo de contacto enviado con éxito", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    resetForm(); // Limpia el formulario

    setTimeout(() => {
      updateFormMode(false);
      navigate("/");
    }, 200);
  };

  return (
    <main>
      <section className="contact">
        <h2 className="contact__heading">Contacto</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, handleChange, handleBlur }) => (
            <Form className="contact__form">
              {/* Nombre */}
              <Input
                label="Nombre"
                type="text"
                placeholder="Escribe tu nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="name" component="p" />}
              />
              {/* Apellidos */}
              <Input
                label="Apellidos"
                type="text"
                placeholder="Escribe tus apellidos"
                name="surname"
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="surname" component="p" />}
              />
              {/* Correo Electrónico */}
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="Escribe tu correo"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="email" component="p" />}
              />
              {/* Mensaje */}
              <Input
                label="Mensaje"
                type="textarea"
                placeholder="Escribe tu mensaje"
                name="message"
                as={Field}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="message" component="p" />}
              />
              {/* Calificación */}
              <fieldset className="input-container">
                <legend className="input-container__legend">Valoración</legend>
                <Rating
                  value={values.rating}
                  onChange={(value) => setFieldValue("rating", value)}
                />
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="input-container__error-message"
                />
              </fieldset>
              {/* Botón de Envío */}
              <Button label="Enviar" type="submit" variant="primary" />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Contact;
