import React, { useContext, useEffect, useState } from "react";
import { FormModeContext } from "../../context/FormModeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/Button";
import "./Register.css";
import { register } from "../../config/Firebase";
import TermsAndConditions from "../../components/auth/TermsAndConditions";

const Register = () => {
  const { updateFormMode } = useContext(FormModeContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(true);
  }, []);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  });

  // Estado para manejar los errores de validación
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: "",
  });

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "termsAndConditions" ? value === "✔" : value,
    });
  };

  // Función de validación para cada campo individual
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    if (name === "username") {
      newErrors.username = !value.trim()
        ? "El nombre de usuario es obligatorio"
        : "";
    }
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
    if (name === "confirmPassword") {
      newErrors.confirmPassword = !value.trim()
        ? "La confirmación de la contraseña no puede estar vacía"
        : formData.password !== formData.confirmPassword
        ? "La contraseña y la confirmación de la contraseña deben ser iguales"
        : "";
    }
    if (name === "termAndConditions") {
      newErrors.termsAndConditions = !value.trim()
        ? "Debes aceptar los términos y condiciones"
        : "";
    }
    setErrors(newErrors);
  };

  // Maneja el evento de pérdida de foco (blur) en los campos para validar
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "termsAndConditions") {
      validateField(name, value === "✔");
    } else {
      validateField(name, value);
    }
  };

  // Función que valida todos los campos del formulario antes de enviar
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim())
      newErrors.username = "El nombre de usuario es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no tiene un formato válido";
    if (!formData.password.trim())
      newErrors.password = "La contraseña no puede estar vacía";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword =
        "La confirmación de la contraseña no puede estar vacía";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword =
        "La contraseña y la confirmación de la contraseña deben ser iguales";
    if (!formData.termsAndConditions)
      newErrors.termsAndConditions = "Debes aceptar los términos y condiciones";

    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await register({ email: formData.email, password: formData.password });
      await login({ email: formData.email, password: formData.password });

      // Muestra una notificación de éxito usando react-toastify
      toast.success("Registro completado con éxito", {
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
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          termAndConditions: false,
        });
        updateFormMode(false);
        navigate("/");
      }, 200);
    }
  };

  return (
    <main>
      <section className="register">
        <h2 className="register__heading">Registrar</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            type="text"
            placeholder="Usuario"
            value={formData.username}
            errorMessage={errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
          />
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
          <Input
            label="Repetir contraseña"
            type="password"
            placeholder="contraseña"
            value={formData.confirmPassword}
            errorMessage={errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            name="confirmPassword"
          />
          <TermsAndConditions
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.termsAndConditions}
            name="termsAndConditions"
          />
          {/* Botón de envío */}
          <Button label="Registrarse" type="submit" variant="primary" />
          <nav className="form__links">
            <ul className="links__list">
              <li>
                <NavLink className="list_link" to="/login">
                  ¿Ya estás registrado? Inicia sesión
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
    </main>
  );
};

export default Register;
