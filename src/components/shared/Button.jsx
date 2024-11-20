import React from "react";
import "./Button.css";

// Componente Button que renderiza un botón con variantes usando BEM
const Button = ({ label, onClick, variant = "primary", className = "" }) => {
  // Clase principal del botón con variante y clases adicionales
  const buttonClass = `button button--${variant} ${className}`.trim();

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
