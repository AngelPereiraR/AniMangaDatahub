import React, { useState } from "react"; // Importación de React
import "./Input.css"; // Importación de los estilos específicos del componente

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
      {/* Etiqueta del input, asociada con el atributo 'name' */}
      <legend>{label}</legend>

      {/* Condicional para renderizar un input o un textarea según el tipo */}
      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={`input ${errorMessage ? "input-error" : ""}`}
        />
      ) : type === "password" ? (
        <div className="input-wrapper">
          <input
            id={name}
            type={isPasswordType && !showPassword ? "password" : "text"} // Alterna entre "password" y "text"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={`input ${errorMessage ? "input-error" : ""}`}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
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
          )}
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
          className={`input ${errorMessage ? "input-error" : ""}`}
        />
      )}

      {/* Si hay un mensaje de error, se renderiza debajo del input */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </fieldset>
  );
};

export default Input; // Exportación del componente para su uso en otros archivos
