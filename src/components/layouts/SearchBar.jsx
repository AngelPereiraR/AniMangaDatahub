import React, { useContext, useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { ThemeContext } from "../../context/ThemeContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownValue, setDropdownValue] = useState("todo");
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(
        `/anime/search?query=${encodeURIComponent(
          searchTerm
        )}&filter=${dropdownValue}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(e);
    }
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <div className="search-container">
      <Dropdown onChange={handleDropdownChange} />
      <div className={`search-bar ${darkMode ? "search-bar-dark" : ""}`}>
        <input
          type="text"
          placeholder={`Escribe tu búsqueda...`}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
        <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
      </div>
    </div>
  );
};

export default SearchBar;
