import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/Button";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormModeContext } from "../../context/FormModeContext";
import { UserContext } from "../../context/UserContext";
import { register, login } from "../../config/Firebase";
import TermsAndConditions from "../../components/auth/TermsAndConditions";
import { useNavigate, NavLink } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(true);
    if (user !== null) {
      navigate("/");
    }
  }, [user, updateFormMode, navigate]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "El correo electrónico no tiene un formato válido"
      )
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña tiene que tener como mínimo 6 caracteres")
      .required("La contraseña no puede estar vacía"),
    confirmPassword: Yup.string()
      .min(6, "La contraseña tiene que tener como mínimo 6 caracteres")
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
      .required("La confirmación de la contraseña es obligatoria"),
    termsAndConditions: Yup.bool()
      .oneOf([true], "Debes aceptar los términos y condiciones")
      .required("Debes aceptar los términos y condiciones"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await register({ email: values.email, password: values.password });
      await login({ email: values.email, password: values.password });

      toast.success("Registro completado con éxito", {
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
      resetForm();
      navigate("/");
    } catch (error) {
      toast.error("Error al registrarse. Intenta de nuevo.", {
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
    <main>
      <section className="register">
        <h2 className="register__heading">Registrar</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form className="register__form">
              <Input
                label="Nombre de usuario"
                type="text"
                placeholder="Usuario"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="username" component="p" />}
              />
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="correo@dominio.com"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="email" component="p" />}
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="contraseña"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="password" component="p" />}
              />
              <Input
                label="Repetir contraseña"
                type="password"
                placeholder="contraseña"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  <ErrorMessage name="confirmPassword" component="p" />
                }
              />
              <TermsAndConditions
                name="termsAndConditions"
                value={values.termsAndConditions}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  <ErrorMessage name="termsAndConditions" component="p" />
                }
              />
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
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Register;
