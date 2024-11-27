import React, { useContext } from "react"; // Importación de React
import { NavLink } from "react-router-dom"; // Importación de NavLink para navegación interna
import { ThemeContext } from "../../context/ThemeContext";

// Componente Footer
const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <footer className={`footer ${darkMode ? "footer--dark" : ""}`}>
      {/* Sección de créditos */}
      <section className="footer__section footer__credits">
        Icons by{" "}
        <a href="https://fontawesome.com/" target="_blank">
          Font Awesome
        </a>
      </section>
      {/* Enlace interno para la página de contacto */}
      <nav aria-label="Footer navigation" className="footer__nav">
        <NavLink className="footer__contact" to="/contact">
          <i className="fa-solid fa-address-book"></i>
          <span>Contacto</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer; // Exportación del componente para su uso en otros archivos
