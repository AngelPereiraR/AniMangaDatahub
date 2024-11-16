import React, { useState } from "react";
import Input from "../../components/auth/Input";
import Rating from "../../components/shared/Rating";
import Button from "../../components/shared/Button";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    if (name === "name") {
      newErrors.name = !value.trim() ? "El nombre es obligatorio" : "";
    }
    if (name === "surname") {
      newErrors.surname = !value.trim() ? "Los apellidos son obligatorios" : "";
    }
    if (name === "email") {
      newErrors.email = !value.trim()
        ? "El correo es obligatorio"
        : !/\S+@\S+\.\S+/.test(value)
        ? "El correo electrónico no tiene un formato válido"
        : "";
    }
    if (name === "message") {
      newErrors.message = !value.trim()
        ? "El mensaje no puede estar vacío"
        : "";
    }
    if (name === "rating") {
      newErrors.rating = value === 0 ? "Debes seleccionar una valoración" : "";
    }
    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";

    if (!formData.surname.trim())
      newErrors.surname = "Los apellidos son obligatorios";

    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no tiene un formato válido";

    if (!formData.message.trim())
      newErrors.message = "El mensaje no puede estar vacío";

    if (formData.rating === 0)
      newErrors.rating = "Debes seleccionar una valoración";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulario enviado", formData);

      toast.success("Formulario enviado con éxito", {
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
    }
  };

  return (
    <div className="contact-container">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          placeholder="Escribe tu nombre"
          value={formData.name}
          errorMessage={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
        />
        <Input
          label="Apellidos"
          type="text"
          placeholder="Escribe tus apellidos"
          value={formData.surname}
          errorMessage={errors.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          name="surname"
        />
        <Input
          label="Correo Electrónico"
          type="text"
          placeholder="Escribe tu correo"
          value={formData.email}
          errorMessage={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
        />
        <Input
          label="Mensaje"
          type="textarea"
          placeholder="Escribe tu mensaje"
          value={formData.message}
          errorMessage={errors.message}
          onChange={handleChange}
          onBlur={handleBlur}
          name="message"
        />
        <div className="input-container">
          <label>Valoración</label>
          <Rating
            value={formData.rating}
            onChange={(rating) => {
              setFormData({ ...formData, rating });
              validateField("rating", rating);
            }}
          />
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>

        <Button label="Enviar" onClick={handleSubmit} variant="primary" />
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Contact;
