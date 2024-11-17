import React from "react"; // Importación de React
import "./Footer.css"; // Importación de los estilos CSS específicos del pie de página
import { NavLink } from "react-router-dom"; // Importación de NavLink para navegación interna

// Componente Footer
const Footer = () => {
  return (
    <footer>
      {/* Sección de créditos */}
      <div className="credits">
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
      </div>
      {/* Enlace interno para la página de contacto */}
      <div>
        <NavLink className="contact" to="/contact">
          Contacto
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer; // Exportación del componente para su uso en otros archivos
