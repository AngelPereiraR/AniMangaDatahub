import React from "react"; // Importación de React
import "./Button.css"; // Importación de los estilos específicos del componente

// Componente Button que renderiza un botón con diferentes variantes
const Button = ({ label, onClick, variant = "primary", className = "" }) => {
  // Definición de la clase del botón. Se le añaden la variante y la clase adicional si las hay
  const buttonClass = `button ${variant} ${className}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button; // Exportación del componente para su uso en otros archivos
