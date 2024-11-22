import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ name, onChange, onBlur, clickMode = 1 }) => {
  const [state, setState] = useState(null); // Manejar '✔', '✘' o null según los clics

  const handleClick = () => {
    let newState;
    if (clickMode === 1) {
      // Un clic: alternar entre marcado y desmarcado
      newState = state === "✔" ? null : "✔";
    } else if (clickMode === 2) {
      // Dos clics: alternar entre '✔', '✘' y desmarcado
      newState = state === "✔" ? "✘" : state === "✘" ? null : "✔";
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

  return (
    <div
      className={`checkbox ${state === "✔" ? "checkbox--checked" : ""} ${
        state === "✘" ? "checkbox--crossed" : ""
      }`}
      onClick={handleClick}
      onBlur={handleBlur}
      tabIndex="0"
      role="checkbox"
      aria-checked={state === "✔"}
      name={name}
    >
      {state}
    </div>
  );
};

export default Checkbox;
