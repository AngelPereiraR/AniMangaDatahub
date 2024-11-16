import React, { useContext } from "react";
import "./Dropdown.css";
import { ThemeContext } from "../../context/ThemeContext";

const Dropdown = ({ onChange }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="dropdown-container">
      <select
        className={`search-dropdown ${darkMode ? "search-dropdown-dark" : ""}`}
        onChange={onChange}
      >
        <option value="todo">Todo</option>
        <option value="animes">Animes</option>
        <option value="mangas">Mangas</option>
        <option value="personajes">Personajes</option>
        <option value="personas">Personas</option>
      </select>
      <i
        className={`fa-solid fa-caret-down dropdown-icon ${
          darkMode ? "dropdown-icon-dark" : ""
        }`}
      ></i>
    </div>
  );
};

export default Dropdown;
