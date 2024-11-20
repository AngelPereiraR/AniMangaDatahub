import React, { useContext, useEffect, useState } from "react";
import { FormModeContext } from "../../context/FormModeContext";
import { Bounce, toast } from "react-toastify";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { updateFormMode } = useContext(FormModeContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(true);
  }, []);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Estado para manejar los errores de validación
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    if (name === "email") {
      newErrors.email = !value.trim()
        ? "El correo es obligatorio"
        : !/\S+@\S+\.\S+/.test(value)
        ? "El correo electrónico no tiene un formato válido"
        : "";
    }
    if (name === "password") {
      newErrors.password = !value.trim()
        ? "La contraseña no puede estar vacía"
        : "";
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

    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no tiene un formato válido";
    if (!formData.password.trim())
      newErrors.password = "La contraseña no puede estar vacía";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login correcto", formData);

      // Muestra una notificación de éxito usando react-toastify
      toast.success("Login completado con éxito", {
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
        setFormData({ email: "", password: "" });
        updateFormMode(false);
        navigate("/");
      }, 200);
    }
  };

  return (
    <section className="login">
      <h2 className="login__heading">Iniciar sesión</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="correo@dominio.com"
          value={formData.email}
          errorMessage={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="contraseña"
          value={formData.password}
          errorMessage={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
        />
        {/* Botón de envío */}
        <Button label="Enviar" type="submit" variant="primary" />
        <nav className="form__links">
          <ul className="links__list">
            <li>
              <NavLink className="list_link" to="/register">
                ¿No estás registrado? Regístrate
              </NavLink>
            </li>
            <li>
              <NavLink className="list_link" to="/">
                Volver a la pantalla principal
              </NavLink>
            </li>
          </ul>
        </nav>
      </form>
    </section>
  );
};

export default Login;
