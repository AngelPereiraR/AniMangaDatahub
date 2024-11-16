import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
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
      <div>
        <NavLink className="contact" to="/contact">
          Contacto
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
