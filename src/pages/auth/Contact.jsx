import React, { useContext, useEffect, useState } from "react"; // Importación de React y hooks
import Input from "../../components/auth/Input"; // Componente Input para campos de formulario
import Rating from "../../components/shared/Rating"; // Componente Rating para mostrar la calificación
import Button from "../../components/shared/Button"; // Componente Button para el botón de enviar
import { Bounce, toast } from "react-toastify"; // Librería para notificaciones
import "react-toastify/dist/ReactToastify.css"; // Estilos para las notificaciones
import "./Contact.css"; // Estilos para la página de contacto
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
  });

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    rating: 0,
  });

  // Estado para manejar los errores de validación
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    rating: "",
  });

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función de validación para cada campo individual
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

  // Maneja el evento de pérdida de foco (blur) en los campos para validar
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Función que valida todos los campos del formulario antes de enviar
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

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Correo de contacto enviado", formData);

      // Muestra una notificación de éxito usando react-toastify
      toast.success("Correo de contacto enviado con éxito", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce, // Transición para la notificación
      });

      // Limpia el formulario y regresa a la página de inicio
      setTimeout(() => {
        setFormData({
          name: "",
          surname: "",
          email: "",
          message: "",
          rating: "",
        });
        updateFormMode(false);
        navigate("/");
      }, 200);
    }
  };

  return (
    <main>
      <section className="contact">
        <h2 className="contact__heading">Contacto</h2>
        <form className="contact__form" onSubmit={handleSubmit}>
          {/* Campos del formulario */}
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
          {/* Componente de calificación */}
          <fieldset className="input-container">
            <legend className="input-container__legend">Valoración</legend>
            <Rating
              value={formData.rating}
              onChange={(rating) => {
                setFormData({ ...formData, rating });
                validateField("rating", rating);
              }}
            />
            {errors.rating && (
              <p className="input-container__error-message">{errors.rating}</p>
            )}{" "}
            {/* Muestra error si la calificación no es válida */}
          </fieldset>

          {/* Botón de envío */}
          <Button label="Enviar" type="submit" variant="primary" />
        </form>
      </section>
    </main>
  );
};

export default Contact;
