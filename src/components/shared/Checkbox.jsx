import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ name, onChange, onBlur, clickMode = 1 }) => {
  const [state, setState] = useState(null); // Manejar '✔', '✘' o null según los clics

  const handleClick = () => {
    let newState;
    if (clickMode === 1) {
      // Un clic: alternar entre marcado y desmarcado
      newState = state === true ? null : true;
    } else if (clickMode === 2) {
      // Dos clics: alternar entre '✔', '✘' y desmarcado
      newState = state === true ? false : state === false ? null : true;
    }
    setState(newState);

    // Generar un evento simulado para manejarlo en el formulario
    const event = {
      target: {
        name,
        value: newState, // Puede ser '✔', '✘' o `null`
      },
    };
    onChange(event); // Disparar onChange con el evento simulado
  };

  const handleBlur = () => {
    const event = {
      target: {
        name,
        value: state,
      },
    };
    onBlur(event); // Disparar onBlur con el evento simulado
  };

  // Determinar el contenido a mostrar basado en el estado
  const renderState = () => {
    if (state === true) {
      return "✔"; // Mostrar un check
    } else if (state === false) {
      return "✘"; // Mostrar un cross
    }
    return null; // No mostrar nada si el estado es null
  };

  return (
    <div
      className={`checkbox ${state === true ? "checkbox--checked" : ""} ${
        state === false ? "checkbox--crossed" : ""
      }`}
      onClick={handleClick}
      onBlur={handleBlur}
      tabIndex="0"
      role="checkbox"
      aria-checked={state === true}
      name={name}
    >
      {renderState()} {/* Renderizar el símbolo basado en el estado */}
    </div>
  );
};

export default Checkbox;
