import React from "react"; // Importación de React
import "./Footer.css"; // Importación de los estilos CSS específicos del pie de página
import { NavLink, useLocation } from "react-router-dom"; // Importación de NavLink para navegación interna

// Componente Footer
const Footer = () => {
  const location = useLocation();

  const footerClass = location.pathname === "/login" ? "footer-login" : "";
  return (
    <footer className={footerClass}>
      {/* Sección de créditos */}
      <section className="credits">
        <a href="/" target="_blank">
          AniMangaDatahub
        </a>{" "}
        © 2024 by{" "}
        <a href="https://portfolio-angelpereira.netlify.app/" target="_blank">
          Ángel Pereira
        </a>{" "}
        is licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>
        . Icons by{" "}
        <a href="https://fontawesome.com/" target="_blank">
          Font Awesome
        </a>
      </section>
      {/* Enlace interno para la página de contacto */}
      <nav aria-label="Footer navigation">
        <NavLink className="contact" to="/contact">
          <i className="fa-solid fa-address-book"></i>
          <span>Contacto</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer; // Exportación del componente para su uso en otros archivos
