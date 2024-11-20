import React, { useContext } from "react"; // Importación de React y el hook useContext
import { NavLink } from "react-router-dom"; // Importación de NavLink para navegación interna
import SearchBar from "./SearchBar"; // Importación del componente SearchBar
import { ThemeContext } from "../../context/ThemeContext"; // Contexto para gestionar el tema oscuro
import "./Navbar.css"; // Estilos específicos del componente Navbar
import { FormModeContext } from "../../context/FormModeContext";
import { ScreenWidthContext } from "../../context/ScreenWidthContext";

// Componente Navbar
const Navbar = () => {
  // Acceso al contexto de tema para obtener el estado del modo oscuro y la función para alternarlo
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isWideScreen } = useContext(ScreenWidthContext);
  const { formMode } = useContext(FormModeContext);

  return (
    <header>
      {/* Fila superior de la barra de navegación */}
      <div className="top-row">
        {/* Enlace al inicio con el logo y el título */}
        <NavLink className={`home ${darkMode ? "home-dark" : ""}`} to="/">
          <img
            className="logo"
            src="../favicon.svg" // Logo del sitio
            alt="Logo de AniMangaDatahub"
          />
          <h1>AniMangaDatahub</h1>
        </NavLink>

        {/* Contenedor para el interruptor de tema y los enlaces de usuario */}
        <div className="row">
          {/* Interruptor de modo oscuro */}
          <button
            className="dark-mode-switch"
            onClick={toggleDarkMode}
            aria-label={`Activar modo ${darkMode ? "claro" : "oscuro"}`}
          >
            <div className={`switch ${darkMode ? "switch-dark" : ""}`}>
              <i
                className={`fa-solid ${
                  darkMode ? "fa-moon" : "fa-sun"
                } toggle-icon`} // Ícono que cambia entre luna y sol según el tema
              ></i>
            </div>
          </button>
          {/* Enlaces de inicio de sesión y registro */}
          {!formMode && (
            <nav
              className={` ${!isWideScreen && "hidden"}`}
              aria-label="Enlaces de usuario"
            >
              <ul className="links">
                <li>
                  <NavLink
                    className={`link ${darkMode ? "link-dark" : ""}`}
                    to="/login"
                  >
                    <i className="fa-solid fa-user link-icon"></i>
                    <span className="link-text">Inicio</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`link ${darkMode ? "link-dark" : ""}`}
                    to="/register"
                  >
                    <i className="fa-solid fa-user-plus link-icon"></i>
                    <span className="link-text">Registro</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Fila inferior de la barra de navegación */}
      {!formMode && (
        <div className="bottom-row">
          <nav aria-label="Navegación de contenido">
            {/* Enlaces desplegables para animes y mangas */}
            <ul className="links">
              {/* Dropdown para animes */}
              <li className="dropdown">
                <NavLink
                  className={`search-link ${
                    darkMode ? "search-link-dark" : ""
                  }`}
                  to="/anime/search"
                >
                  Animes
                </NavLink>
                <ul className="dropdown-menu">
                  {/* Opciones del dropdown */}
                  <li>
                    <NavLink to="/anime/search">Búsqueda de Animes</NavLink>
                  </li>
                  <li>
                    <NavLink to="/anime/top">Top Animes</NavLink>
                  </li>
                  <li>
                    <NavLink to="/anime/season">Por temporada</NavLink>
                  </li>
                </ul>
              </li>
              {/* Dropdown para mangas */}
              <li className="dropdown">
                <NavLink
                  className={`search-link ${
                    darkMode ? "search-link-dark" : ""
                  }`}
                  to="/manga/search"
                >
                  Mangas
                </NavLink>
                <ul className="dropdown-menu">
                  {/* Opciones del dropdown */}
                  <li>
                    <NavLink to="/manga/search">Búsqueda de Mangas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manga/top">Top Mangas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manga/season">Por temporada</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          {!isWideScreen && (
            <nav aria-label="Enlaces de usuario">
              <ul className="links">
                <li>
                  <NavLink
                    className={`link ${darkMode ? "link-dark" : ""}`}
                    to="/login"
                  >
                    <i className="fa-solid fa-user link-icon"></i>
                    <span className="link-text">Inicio</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`link ${darkMode ? "link-dark" : ""}`}
                    to="/register"
                  >
                    <i className="fa-solid fa-user-plus link-icon"></i>
                    <span className="link-text">Registro</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}

          {/* Barra de búsqueda */}
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Navbar; // Exportación del componente para su uso en otros archivos
