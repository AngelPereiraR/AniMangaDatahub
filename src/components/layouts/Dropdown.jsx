import React, { useContext } from "react"; // Importación de React y del hook useContext
import "./Dropdown.css"; // Importación de los estilos CSS específicos del componente
import { ThemeContext } from "../../context/ThemeContext"; // Importación del contexto de tema

// Componente Dropdown, recibe una función `onChange` como prop
const Dropdown = ({ onChange }) => {
  // Uso del contexto para obtener el estado `darkMode` (modo oscuro)
  const { darkMode } = useContext(ThemeContext);

  return (
    <section className="dropdown-container">
      {" "}
      {/* Contenedor principal del dropdown */}
      <select
        className={`search-dropdown ${darkMode ? "search-dropdown-dark" : ""}`} // Clase condicional según el tema actual
        onChange={onChange} // Llama a la función `onChange` cuando cambia la selección
      >
        {/* Opciones del menú desplegable */}
        <option value="todo">Todo</option>
        <option value="animes">Animes</option>
        <option value="mangas">Mangas</option>
        <option value="personajes">Personajes</option>
        <option value="personas">Personas</option>
      </select>
      <i
        className={`fa-solid fa-caret-down dropdown-icon ${
          darkMode ? "dropdown-icon-dark" : ""
        }`} // Ícono con clases condicionales basadas en el tema
      ></i>
    </section>
  );
};

export default Dropdown; // Exportación del componente para su uso en otros archivos
