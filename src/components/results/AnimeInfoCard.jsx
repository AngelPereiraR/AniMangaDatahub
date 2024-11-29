import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const AnimeInfoCard = ({
  mal_id,
  title,
  image,
  valoration,
  firstEpisode,
  episodes,
  duration,
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section className="anime-info-card">
      <Link to={`/anime/${mal_id}`}>
        <h2
          className={`anime-info-card__title ${
            darkMode ? "anime-info-card__title--dark" : ""
          }`}
          title={title}
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
              <i className="fa-solid fa-star"></i>{" "}
              {valoration !== null ? valoration : "---"}
            </div>
            <div
              className={`anime-info-card__details ${
                darkMode ? "anime-info-card__details--dark" : ""
              }`}
            >
              <div>
                <p className="details__title">Primer episodio: </p>
                <p className="details__info">{firstEpisode}</p>
              </div>
              <div>
                <p className="details__title">Episodios: </p>
                <p className="details__info">
                  {episodes !== null ? episodes : "--"}
                </p>
              </div>
              <div>
                <p className="details__title">Duración: </p>
                <p className="details__info">
                  {duration !== "Unknown" ? duration : "--"}
                </p>
              </div>
            </div>

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
      </Link>
    </section>
  );
};

export default AnimeInfoCard;
