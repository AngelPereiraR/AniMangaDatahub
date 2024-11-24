import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Card.css";

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
      <p className="card__title">{title}</p>
    </div>
  );
};

export default Card;
