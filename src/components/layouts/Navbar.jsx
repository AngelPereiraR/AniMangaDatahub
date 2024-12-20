import React, { useContext } from "react"; // Importación de React y el hook useContext
import { NavLink } from "react-router-dom"; // Importación de NavLink para navegación interna
import SearchBar from "./SearchBar"; // Importación del componente SearchBar
import { ThemeContext } from "../../context/ThemeContext"; // Contexto para gestionar el tema oscuro
import { FormModeContext } from "../../context/FormModeContext";
import { ScreenWidthContext } from "../../context/ScreenWidthContext";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../config/Firebase";
import { EditScreenContext } from "../../context/EditScreenContext";

// Componente Navbar
const Navbar = () => {
  // Acceso al contexto de tema para obtener el estado del modo oscuro y la función para alternarlo
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isWideScreen } = useContext(ScreenWidthContext);
  const { formMode } = useContext(FormModeContext);
  const { user } = useContext(UserContext);
  const { editScreen } = useContext(EditScreenContext);

  return (
    <header className="navbar">
      {/* Fila superior de la barra de navegación */}
      <div
        className={`navbar__top-row ${darkMode ? "navbar__top-row--dark" : ""}`}
      >
        {/* Enlace al inicio con el logo y el título */}
        <NavLink
          className={`navbar__home ${darkMode ? "navbar__home--dark" : ""}`}
          to="/"
        >
          <img
            className="navbar__logo"
            src="../favicon.svg" // Logo del sitio
            alt="Logo de AniMangaDatahub"
          />
          <h1>AniMangaDatahub</h1>
        </NavLink>

        {/* Contenedor para el interruptor de tema y los enlaces de usuario */}
        <div className="navbar__row">
          {/* Interruptor de modo oscuro */}
          <button
            className="navbar__dark-mode-switch"
            onClick={toggleDarkMode}
            aria-label={`Activar modo ${darkMode ? "claro" : "oscuro"}`}
          >
            <div
              className={`navbar__switch ${
                darkMode ? "navbar__switch--dark" : ""
              }`}
            >
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
              className={` ${!isWideScreen && "navbar__hidden"}`}
              aria-label="Enlaces de usuario"
            >
              <ul className="navbar__links">
                <li>
                  {user === null ? (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/login"
                    >
                      <i className="fa-solid fa-user navbar__link-icon"></i>
                      <span className="link-text">Inicio</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      onClick={logout}
                    >
                      <i className="fa-solid fa-right-from-bracket navbar__link-icon"></i>
                      <span className="link-text">Cerrar sesión</span>
                    </NavLink>
                  )}
                </li>
                <li>
                  {user === null ? (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/register"
                    >
                      <i className="fa-solid fa-user-plus navbar__link-icon"></i>
                      <span className="link-text">Registro</span>
                    </NavLink>
                  ) : editScreen ? (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/profile/edit"
                    >
                      <i className="fa-solid fa-pen-to-square navbar__link-icon"></i>
                      <span className="link-text">Editar perfil</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/profile"
                    >
                      <i className="fa-solid fa-user navbar__link-icon"></i>
                      <span className="link-text">Ver perfil</span>
                    </NavLink>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Fila inferior de la barra de navegación */}
      {!formMode && (
        <div
          className={`navbar__bottom-row ${
            darkMode ? "navbar__bottom-row--dark" : ""
          }`}
        >
          <nav aria-label="Navegación de contenido">
            {/* Enlaces desplegables para animes y mangas */}
            <ul className="navbar__links">
              {/* Dropdown para animes */}
              <li className="navbar__dropdown">
                <NavLink
                  className={`navbar__search-link ${
                    darkMode ? "navbar__search-link--dark" : ""
                  }`}
                  to="/anime/search"
                >
                  Animes
                </NavLink>
                <ul
                  className={`navbar__dropdown-menu ${
                    darkMode ? "navbar__dropdown-menu--dark" : ""
                  }`}
                >
                  {/* Opciones del dropdown */}
                  <li>
                    <NavLink to="/search?filtered=anime">
                      Búsqueda de Animes
                    </NavLink>
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
              <li className="navbar__dropdown">
                <NavLink
                  className={`navbar__search-link ${
                    darkMode ? "navbar__search-link--dark" : ""
                  }`}
                  to="/manga/search"
                >
                  Mangas
                </NavLink>
                <ul
                  className={`navbar__dropdown-menu ${
                    darkMode ? "navbar__dropdown-menu--dark" : ""
                  }`}
                >
                  {/* Opciones del dropdown */}
                  <li>
                    <NavLink to="/search?filtered=manga">
                      Búsqueda de Mangas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/manga/top">Top Mangas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manga/season">En publicación</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          {!isWideScreen && (
            <nav className="navbar__nav" aria-label="Enlaces de usuario">
              <ul className="navbar__links">
                <li>
                  {user === null ? (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/login"
                    >
                      <i className="fa-solid fa-user navbar__link-icon"></i>
                      <span className="link-text">Inicio</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      onClick={logout}
                    >
                      <i className="fa-solid fa-right-from-bracket navbar__link-icon"></i>
                      <span className="link-text">Cerrar</span>
                    </NavLink>
                  )}
                </li>
                <li>
                  {user === null ? (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/register"
                    >
                      <i className="fa-solid fa-user-plus navbar__link-icon"></i>
                      <span className="link-text">Registro</span>
                    </NavLink>
                  ) : editScreen ? (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/profile/edit"
                    >
                      <i className="fa-solid fa-pen-to-square navbar__link-icon"></i>
                      <span className="link-text">Editar</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      className={`navbar__link ${
                        darkMode ? "navbar__link--dark" : ""
                      }`}
                      to="/profile"
                    >
                      <i className="fa-solid fa-user navbar__link-icon"></i>
                      <span className="link-text">Ver perfil</span>
                    </NavLink>
                  )}
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
