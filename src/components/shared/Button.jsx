import React from "react";
import "./Button.css"; // Asegúrate de que la ruta sea correcta

const Button = ({ label, onClick, variant = "primary", className = "" }) => {
  const buttonClass = `button ${variant} } ${className}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
