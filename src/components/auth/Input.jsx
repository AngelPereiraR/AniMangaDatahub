import React from "react"; // Importación de React
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
  return (
    <div className="input-container">
      {/* Etiqueta del input, asociada con el atributo 'name' */}
      <label htmlFor={name}>{label}</label>

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
    </div>
  );
};

export default Input; // Exportación del componente para su uso en otros archivos
