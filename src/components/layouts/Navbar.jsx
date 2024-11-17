import React, { useContext } from "react"; // Importación de React y el hook useContext
import { NavLink } from "react-router-dom"; // Importación de NavLink para navegación interna
import SearchBar from "./SearchBar"; // Importación del componente SearchBar
import { ThemeContext } from "../../context/ThemeContext"; // Contexto para gestionar el tema oscuro
import "./Navbar.css"; // Estilos específicos del componente Navbar

// Componente Navbar
const Navbar = () => {
  // Acceso al contexto de tema para obtener el estado del modo oscuro y la función para alternarlo
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav>
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
          <div className="dark-mode-switch" onClick={toggleDarkMode}>
            <div className={`switch ${darkMode ? "switch-dark" : ""}`}>
              <div className="switch-icon">
                <i
                  className={`fa-solid ${
                    darkMode ? "fa-moon" : "fa-sun"
                  } toggle-icon`} // Ícono que cambia entre luna y sol según el tema
                ></i>
              </div>
            </div>
          </div>
          {/* Enlaces de inicio de sesión y registro */}
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

      {/* Fila inferior de la barra de navegación */}
      <div className="bottom-row">
        {/* Enlaces desplegables para animes y mangas */}
        <ul className="links">
          {/* Dropdown para animes */}
          <div className="dropdown">
            <NavLink
              className={`search-link ${darkMode ? "search-link-dark" : ""}`}
              to="/anime/search"
            >
              Animes
            </NavLink>
            <div className="dropdown-menu">
              {/* Opciones del dropdown */}
              <NavLink to="/anime/search">Búsqueda de Animes</NavLink>
              <NavLink to="/anime/top">Top Animes</NavLink>
              <NavLink to="/anime/season">Por temporada</NavLink>
            </div>
          </div>
          {/* Dropdown para mangas */}
          <div className="dropdown">
            <NavLink
              className={`search-link ${darkMode ? "search-link-dark" : ""}`}
              to="/manga/search"
            >
              Mangas
            </NavLink>
            <div className="dropdown-menu">
              {/* Opciones del dropdown */}
              <NavLink to="/manga/search">Búsqueda de Mangas</NavLink>
              <NavLink to="/manga/top">Top Mangas</NavLink>
              <NavLink to="/manga/season">Por temporada</NavLink>
            </div>
          </div>
        </ul>

        {/* Barra de búsqueda */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar; // Exportación del componente para su uso en otros archivos
