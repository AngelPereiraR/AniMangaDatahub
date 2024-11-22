import React, { useContext, useState } from "react"; // Importación de React y hooks
import "./SearchBar.css"; // Importación de los estilos específicos del componente
import { useNavigate } from "react-router-dom"; // Importación de useNavigate para la navegación programática
import Dropdown from "./Dropdown"; // Importación del componente Dropdown para selección de filtros
import { ThemeContext } from "../../context/ThemeContext"; // Contexto para gestionar el tema oscuro

// Componente SearchBar
const SearchBar = () => {
  // Estado para gestionar el término de búsqueda y el valor del dropdown
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownValue, setDropdownValue] = useState("todo");

  // Accede al estado darkMode desde el contexto
  const { darkMode } = useContext(ThemeContext);

  // Hook para navegación programática
  const navigate = useNavigate();

  // Función que realiza la búsqueda al enviar el formulario
  const search = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Navega a la URL de búsqueda con los parámetros correspondientes
      navigate(
        `/anime/search?query=${encodeURIComponent(
          searchTerm
        )}&filter=${dropdownValue}`
      );
    }
  };

  // Maneja el evento de tecla "Enter" en el campo de búsqueda
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(e);
    }
  };

  // Maneja el cambio en el campo de entrada
  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  // Maneja el cambio en el valor del dropdown (filtro de búsqueda)
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <section className="search-container">
      {/* Componente Dropdown que permite seleccionar el filtro */}
      <Dropdown
        onChange={handleDropdownChange}
        className="search-bar__dropdown"
      />

      {/* Contenedor de la barra de búsqueda */}
      <div className={`search-bar ${darkMode ? "search-bar--dark" : ""}`}>
        <input
          type="text"
          placeholder="Escribe tu búsqueda..."
          className={`search-bar__input ${
            darkMode ? "search-bar__input--dark" : ""
          }`}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
        {/* Ícono de búsqueda */}
        <i
          className="fa-solid fa-magnifying-glass search-bar__icon"
          onClick={search}
        ></i>
      </div>
    </section>
  );
};

export default SearchBar; // Exportación del componente para su uso en otros archivos
