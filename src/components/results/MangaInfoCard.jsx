import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const MangaInfoCard = ({ mal_id, title, image, valoration, firstEpisode }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section className="manga-info-card">
      <Link to={`/manga/${mal_id}`}>
        <h2
          className={`manga-info-card__title ${
            darkMode ? "manga-info-card__title--dark" : ""
          }`}
          title={title}
        >
          {title}
        </h2>
        <section className="manga-info-card__section">
          <aside>
            <img
              className={`manga-info-card__image ${
                darkMode ? "manga-info-card__image--dark" : ""
              }`}
              src={image}
              alt={title}
            />
          </aside>
          <section
            className={`manga-info-card__content ${
              darkMode ? "manga-info-card__content--dark" : ""
            }`}
          >
            <div
              className={`manga-info-card__valoration ${
                darkMode ? "manga-info-card__valoration--dark" : ""
              }`}
            >
              <i className="fa-solid fa-star"></i>{" "}
              {valoration !== null ? valoration : "---"}
            </div>
            <div
              className={`manga-info-card__details ${
                darkMode ? "manga-info-card__details--dark" : ""
              }`}
            >
              <div>
                <p className="details__title">Primer capítulo: </p>
                <p className="details__info">{firstEpisode}</p>
              </div>
            </div>

            <div
              className={`manga-info-card__add ${
                darkMode ? "manga-info-card__add--dark" : ""
              }`}
            >
              <p className="add__button">
                <span>Añadir a la lista</span>
                <i className="fa-solid fa-plus"></i>
              </p>
            </div>
          </section>
        </section>
      </Link>
    </section>
  );
};

export default MangaInfoCard;
