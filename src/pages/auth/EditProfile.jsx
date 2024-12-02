import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/Button";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormModeContext } from "../../context/FormModeContext";
import { EditScreenContext } from "../../context/EditScreenContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";

const EditProfile = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(true);
    updateEditScreen(true);

    if (!user) {
      navigate("/login");
    }
  }, [updateFormMode, updateEditScreen, user, navigate]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string()
      .email("El correo electrónico no tiene un formato válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es obligatoria"),
    address: Yup.string().required("La dirección es obligatoria"),
    country: Yup.string().required("El país es obligatorio"),
    city: Yup.string().required("La localidad es obligatoria"),
    day: Yup.number()
      .min(1, "Selecciona un día válido")
      .max(31, "Selecciona un día válido")
      .required("Selecciona un día"),
    month: Yup.number()
      .min(1, "Selecciona un mes válido")
      .max(12, "Selecciona un mes válido")
      .required("Selecciona un mes"),
    year: Yup.number()
      .min(1900, "Selecciona un año válido")
      .max(new Date().getFullYear(), "Selecciona un año válido")
      .required("Selecciona un año"),
  });

  const initialValues = {
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
    confirmPassword: user?.confirmPassword || "",
    address: user?.address || "",
    country: user?.country || "",
    city: user?.city || "",
    day: user?.day || "",
    month: user?.month || "",
    year: user?.year || "",
  };

  const handleSubmit = async (values) => {
    try {
      // Simulación de actualización del perfil
      console.log("Perfil actualizado con éxito:", values);
      toast.success("Perfil actualizado correctamente", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      navigate("/anime/profile");
    } catch (error) {
      toast.error("Hubo un error al actualizar el perfil. Intenta de nuevo.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    }
  };

  return (
    <main>
      <section className="edit-profile">
        <h2 className="edit-profile__heading">Editar Perfil</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form className="edit-profile__form">
              <Input
                label="Nombre de usuario"
                type="text"
                name="username"
                placeholder="Usuario"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="username" component="p" />}
              />
              <Input
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="correo@dominio.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="email" component="p" />}
              />
              <Input
                label="Contraseña"
                type="password"
                name="password"
                placeholder="Nueva contraseña"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="password" component="p" />}
              />
              <Input
                label="Repetir contraseña"
                type="password"
                name="confirmPassword"
                placeholder="Repetir contraseña"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  <ErrorMessage name="confirmPassword" component="p" />
                }
              />
              <Input
                label="Dirección"
                type="text"
                name="address"
                placeholder="Tu dirección"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="address" component="p" />}
              />
              <Input
                label="País"
                type="text"
                name="country"
                placeholder="Tu país"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="country" component="p" />}
              />
              <Input
                label="Localidad"
                type="text"
                name="city"
                placeholder="Tu localidad"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={<ErrorMessage name="city" component="p" />}
              />
              <div className="date-selectors">
                <label>Fecha de nacimiento</label>
                <div className="date-selectors__fields">
                  <Field as="select" name="day" className="select-field">
                    <option value="">Día</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Field>
                  <Field as="select" name="month" className="select-field">
                    <option value="">Mes</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Field>
                  <Field as="select" name="year" className="select-field">
                    <option value="">Año</option>
                    {Array.from(
                      { length: new Date().getFullYear() - 1899 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage
                  name="day"
                  component="p"
                  className="error-message"
                />
                <ErrorMessage
                  name="month"
                  component="p"
                  className="error-message"
                />
                <ErrorMessage
                  name="year"
                  component="p"
                  className="error-message"
                />
              </div>
              <Button label="Editar" type="submit" variant="primary" />
              <NavLink className="edit-profile__link" to="/profile">
                Volver a tu perfil
              </NavLink>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default EditProfile;
