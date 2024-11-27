import React, { useState } from "react"; // Importación de React

// Componente Input que renderiza un input o textarea dependiendo del tipo
const Input = ({
  label, // Etiqueta para el campo de entrada
  type, // Tipo de campo (input o textarea)
  placeholder, // Texto que aparece cuando el campo está vacío
  value, // Valor actual del campo
  errorMessage, // Mensaje de error, si lo hay
  onChange, // Función que se ejecuta cuando el valor del campo cambia
  onBlur, // Función que se ejecuta cuando el campo pierde el foco
  name, // Nombre del campo (usado en el id y name del input)
}) => {
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visibilidad de contraseña

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Cambia el estado de visibilidad
  };

  const isPasswordType = type === "password"; // Verifica si el tipo es "password"
  return (
    <fieldset className="input-container">
      <legend className="input-container__legend">{label}</legend>

      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={`input-container__field input-container__field--textarea ${
            errorMessage ? "input-container__field--error" : ""
          }`}
        />
      ) : type === "password" ? (
        <div className="input-container__wrapper">
          <input
            id={name}
            type={isPasswordType && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={`input-container__field ${
              errorMessage ? "input-container__field--error" : ""
            }`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="input-container__toggle-password"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
        </div>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={`input-container__field ${
            errorMessage ? "input-container__field--error" : ""
          }`}
        />
      )}

      {errorMessage && (
        <p className="input-container__error-message">{errorMessage}</p>
      )}
    </fieldset>
  );
};

export default Input; // Exportación del componente para su uso en otros archivos
