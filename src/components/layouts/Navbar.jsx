import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav>
      <div className="top-row">
        <NavLink className={`home ${darkMode ? "home-dark" : ""}`} to="/">
          <img
            className="logo"
            src="../favicon.svg"
            alt="Logo de AniMangaDatahub"
          />
          <h1>AniMangaDatahub</h1>
        </NavLink>

        <div className="top-row">
          <div className="dark-mode-switch" onClick={toggleDarkMode}>
            <div className={`switch ${darkMode ? "switch-dark" : ""}`}>
              <div className="switch-icon">
                <i
                  className={`fa-solid ${
                    darkMode ? "fa-moon" : "fa-sun"
                  } toggle-icon`}
                ></i>
              </div>
            </div>
          </div>
          <ul className="links">
            <NavLink
              className={`link ${darkMode ? "link-dark" : ""}`}
              to="/login"
            >
              <i className="fa-solid fa-user link-icon"></i>
              <span className="link-text">Inicio</span>
            </NavLink>
            <NavLink
              className={`link ${darkMode ? "link-dark" : ""}`}
              to="/register"
            >
              <i className="fa-solid fa-user-plus link-icon"></i>
              <span className="link-text">Registro</span>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="bottom-row">
        <ul className="links">
          <div className="dropdown">
            <NavLink
              className={`search-link ${darkMode ? "search-link-dark" : ""}`}
              to="/anime/search"
            >
              Animes
            </NavLink>
            <div className="dropdown-menu">
              <NavLink to="/anime/search">Búsqueda de Animes</NavLink>
              <NavLink to="/anime/top">Top Animes</NavLink>
              <NavLink to="/anime/season">Por temporada</NavLink>
            </div>
          </div>
          <div className="dropdown">
            <NavLink
              className={`search-link ${darkMode ? "search-link-dark" : ""}`}
              to="/manga/search"
            >
              Mangas
            </NavLink>
            <div className="dropdown-menu">
              <NavLink to="/manga/search">Búsqueda de Mangas</NavLink>
              <NavLink to="/manga/top">Top Mangas</NavLink>
              <NavLink to="/manga/season">Por temporada</NavLink>
            </div>
          </div>
        </ul>

        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
