import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Importar el hook de navegación
import "./AnimeInfoCard.css";

const AnimeInfoCard = ({
  mal_id,
  title,
  image,
  valoration,
  firstEpisode,
  episodes,
  duration,
  themes,
}) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/anime/${mal_id}`);
  };

  return (
    <section className="anime-info-card" onClick={handleCardClick}>
      <h2
        className={`anime-info-card__title ${
          darkMode ? "anime-info-card__title--dark" : ""
        }`}
      >
        {title}
      </h2>
      <section className="anime-info-card__section">
        <aside>
          <img
            className={`anime-info-card__image ${
              darkMode ? "anime-info-card__image--dark" : ""
            }`}
            src={image}
            alt={title}
          />
        </aside>
        <section
          className={`anime-info-card__content ${
            darkMode ? "anime-info-card__content--dark" : ""
          }`}
        >
          <div
            className={`anime-info-card__valoration ${
              darkMode ? "anime-info-card__valoration--dark" : ""
            }`}
          >
            <i className="fa-solid fa-star"></i> {valoration}
          </div>
          <div
            className={`anime-info-card__details ${
              darkMode ? "anime-info-card__details--dark" : ""
            }`}
          >
            <div>
              <p className="details__title">Primer episodio</p>
              <p className="details__info">{firstEpisode}</p>
            </div>
            <div>
              <p className="details__title">Episodios</p>
              <p className="details__info">{episodes}</p>
            </div>
            <div>
              <p className="details__title">Duración</p>
              <p className="details__info">{duration}</p>
            </div>
          </div>
          {themes.length > 0 ? (
            <div
              className={`anime-info-card__themes ${
                darkMode ? "anime-info-card__themes--dark" : ""
              }`}
            >
              <p className="themes__title">Temas</p>
              <p>
                {themes.map((theme) => {
                  return (
                    <span
                      className={`themes__theme ${
                        darkMode ? "themes__theme--dark" : ""
                      }`}
                      key={theme.name}
                    >
                      {theme.name}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          ) : (
            ""
          )}
          <div
            className={`anime-info-card__add ${
              darkMode ? "anime-info-card__add--dark" : ""
            }`}
          >
            <p className="add__button">
              <span>Añadir a la lista</span>
              <i className="fa-solid fa-plus"></i>
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default AnimeInfoCard;
