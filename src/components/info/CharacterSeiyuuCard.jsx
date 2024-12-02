import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const CharacterSeiyuuCard = ({ character, voiceActor, role }) => {
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
          <p className="character-seiyuu-card__voice-actor-name">
            {voiceActor?.person.name || "No disponible"}
          </p>
          <p className="character-seiyuu-card__voice-actor-nationality">
            {voiceActor?.language || "No disponible"}
          </p>
        </div>
      </div>

      {/* Imagen del personaje y su información */}
      <div className="character-seiyuu-card__character">
        <div className="character-seiyuu-card__character-info">
          <p className="character-seiyuu-card__character-name">
            {character.name}
          </p>
          <p className="character-seiyuu-card__character-role">{role}</p>
        </div>
        <img
          src={character.images.webp.image_url}
          alt={character.name}
          className="character-seiyuu-card__character-image"
        />
      </div>
    </div>
  );
};

export default CharacterSeiyuuCard;
