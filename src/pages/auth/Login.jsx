import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/Button";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormModeContext } from "../../context/FormModeContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../config/Firebase";
import "./Login.css";

const Login = () => {
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
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "El correo electrónico no tiene un formato válido"
      )
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña tiene que tener como mínimo 6 caracteres")
      .required("La contraseña no puede estar vacía"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await login(values);
      toast.success("Inicio de sesión completado con éxito", {
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
      toast.error("Error al iniciar sesión. Verifica tus credenciales.", {
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
    <main className="login-main">
      <section className="login">
        <h2 className="login__heading">Iniciar sesión</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form className="login__form">
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
              <Button label="Iniciar sesión" type="submit" variant="primary" />
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
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Login;
