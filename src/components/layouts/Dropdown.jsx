import React, { useContext } from "react"; // Importación de React y del hook useContext
import { ThemeContext } from "../../context/ThemeContext"; // Importación del contexto de tema

// Componente Dropdown, recibe una función `onChange` como prop
const Dropdown = ({ onChange, value }) => {
  // Uso del contexto para obtener el estado `darkMode` (modo oscuro)
  const { darkMode } = useContext(ThemeContext);

  return (
    <section className="dropdown">
      <select
        className={`dropdown__select ${
          darkMode ? "dropdown__select--dark" : ""
        }`}
        onChange={onChange}
        value={value}
      >
        <option className="dropdown__option" value="anime">
          Animes
        </option>
        <option className="dropdown__option" value="manga">
          Mangas
        </option>
        <option className="dropdown__option" value="characters">
          Personajes
        </option>
      </select>
      <i
        className={`fa-solid fa-caret-down dropdown__icon ${
          darkMode ? "dropdown__icon--dark" : ""
        }`}
      ></i>
    </section>
  );
};

export default Dropdown; // Exportación del componente para su uso en otros archivos
