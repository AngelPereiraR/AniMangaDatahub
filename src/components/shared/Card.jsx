import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Card = ({ image, title, mal_id, type }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${type}/${mal_id}`);
  };

  return (
    <div className={`card ${darkMode ? "card--dark" : "card--light"}`}>
      <img
        src={image}
        alt={title}
        onClick={handleCardClick}
        className="card__image"
      />
      <div className="card__title-container">
        <p className="title-container__title" title={title}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
