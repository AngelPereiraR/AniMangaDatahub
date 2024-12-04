import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const CharacterSeiyuuCard = ({
  character = null,
  voiceActor = null,
  anime = null,
  manga = null,
  role,
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`character-seiyuu-card ${
        darkMode
          ? "character-seiyuu-card--dark"
          : "character-seiyuu-card--light"
      }`}
    >
      {/* Imagen del actor de voz y su información */}
      {voiceActor && (
        <Link to={`/seiyuu/${voiceActor.person.mal_id}`}>
          <div className="character-seiyuu-card__voice-actor">
            <img
              src={
                voiceActor?.person.images.webp?.image_url ??
                voiceActor?.person.images.jpg?.image_url ??
                "/placeholder.png"
              }
              alt={voiceActor?.person.name || "Sin actor"}
              className="character-seiyuu-card__voice-actor-image"
            />
            <div className="character-seiyuu-card__voice-actor-info">
              <p
                className={`character-seiyuu-card__voice-actor-name ${
                  darkMode
                    ? "character-seiyuu-card__voice-actor-name--dark"
                    : "character-seiyuu-card__voice-actor-name--light"
                }`}
              >
                {voiceActor?.person.name || "No disponible"}
              </p>
              <p className="character-seiyuu-card__voice-actor-nationality">
                {voiceActor?.language || "No disponible"}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Imagen del personaje y su información */}
      {voiceActor !== null
        ? character !== null && (
            <Link to={`/character/${character.mal_id}`}>
              <div className={`character-seiyuu-card__character`}>
                <div className="character-seiyuu-card__character-info">
                  <p
                    className={`character-seiyuu-card__character-name ${
                      darkMode
                        ? "character-seiyuu-card__character-name--dark"
                        : "character-seiyuu-card__character-name--light"
                    }`}
                  >
                    {character.name}
                  </p>
                  <p className="character-seiyuu-card__character-role">
                    {role}
                  </p>
                </div>
                <img
                  src={
                    character.images.jpg.image_url ||
                    character.images.webp.image_url
                  }
                  alt={character.name}
                  className="character-seiyuu-card__character-image"
                />
              </div>
            </Link>
          )
        : character !== null && (
            <Link to={`/character/${character.mal_id}`}>
              <div
                className={`character-seiyuu-card__character character-seiyuu-card__character--left`}
              >
                <img
                  src={
                    character.images.jpg.image_url ||
                    character.images.webp.image_url
                  }
                  alt={character.name}
                  className="character-seiyuu-card__character-image"
                />
                <div className="character-seiyuu-card__character-info">
                  <p
                    className={`character-seiyuu-card__character-name ${
                      darkMode
                        ? "character-seiyuu-card__character-name--dark"
                        : "character-seiyuu-card__character-name--light"
                    }`}
                  >
                    {character.name}
                  </p>
                  <p className="character-seiyuu-card__character-role">
                    {role}
                  </p>
                </div>
              </div>
            </Link>
          )}

      {anime && character ? (
        <Link to={`/anime/${anime.mal_id}`}>
          <div className="character-seiyuu-card__anime character-seiyuu-card__anime--with-character">
            <div className="character-seiyuu-card__anime-info">
              <p
                className={`character-seiyuu-card__anime-name ${
                  darkMode
                    ? "character-seiyuu-card__anime-name--dark"
                    : "character-seiyuu-card__anime-name--light"
                }`}
              >
                {anime.title || "No disponible"}
              </p>
            </div>
            <img
              src={
                anime.images.webp.image_url ??
                anime.images.jpg.image_url ??
                "/placeholder.png"
              }
              alt={anime.title || "No disponible"}
              className="character-seiyuu-card__anime-image"
            />
          </div>
        </Link>
      ) : anime ? (
        <Link to={`/anime/${anime.mal_id}`}>
          <div className="character-seiyuu-card__anime">
            <img
              src={
                anime.images.webp.image_url ??
                anime.images.jpg.image_url ??
                "/placeholder.png"
              }
              alt={anime.title || "No disponible"}
              className="character-seiyuu-card__anime-image"
            />
            <div className="character-seiyuu-card__anime-info">
              <p
                className={`character-seiyuu-card__anime-name ${
                  darkMode
                    ? "character-seiyuu-card__anime-name--dark"
                    : "character-seiyuu-card__anime-name--light"
                }`}
              >
                {anime.title || "No disponible"}
              </p>
            </div>
          </div>
        </Link>
      ) : null}

      {manga && (
        <Link to={`/manga/${manga.mal_id}`}>
          <div className="character-seiyuu-card__manga">
            <img
              src={
                manga.images.webp.image_url ??
                manga.images.jpg.image_url ??
                "/placeholder.png"
              }
              alt={manga.title || "No disponible"}
              className="character-seiyuu-card__manga-image"
            />
            <div className="character-seiyuu-card__manga-info">
              <p
                className={`character-seiyuu-card__manga-name ${
                  darkMode
                    ? "character-seiyuu-card__manga-name--dark"
                    : "character-seiyuu-card__manga-name--light"
                }`}
              >
                {manga.title || "No disponible"}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CharacterSeiyuuCard;
