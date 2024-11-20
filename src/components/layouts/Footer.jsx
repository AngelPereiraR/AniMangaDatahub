import React from "react"; // Importación de React
import "./Footer.css"; // Importación de los estilos CSS específicos del pie de página
import { NavLink, useLocation } from "react-router-dom"; // Importación de NavLink para navegación interna

// Componente Footer
const Footer = () => {
  const location = useLocation();

  const footerClass = location.pathname === "/login" ? "footer--login" : "";
  return (
    <footer className={`footer ${footerClass}`}>
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
