import React from "react";
import "./Input.css";

const Input = ({
  label,
  type,
  placeholder,
  value,
  errorMessage,
  onChange,
  onBlur,
  name,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>

      {/* Condicional para renderizar input o textarea */}
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

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;
