import React from "react";

const Rating = ({ value, onChange, darkMode }) => {
  // Maneja el evento cuando el mouse entra sobre una estrella
  const handleMouseEnter = (index) => {
    const stars = document.querySelectorAll(".rating-container__star");
    stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.add("rating-container__star--hovered");
      } else {
        star.classList.remove("rating-container__star--hovered");
      }
    });
  };

  // Maneja el evento cuando el mouse sale de una estrella
  const handleMouseLeave = () => {
    const stars = document.querySelectorAll(".rating-container__star");
    stars.forEach((star) =>
      star.classList.remove("rating-container__star--hovered")
    );
  };

  // Maneja el evento cuando se hace clic en una estrella
  const handleClick = (index) => {
    onChange(index + 1);
  };

  return (
    <section
      className={`rating-container ${darkMode ? "rating-container--dark" : ""}`}
    >
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          className={`rating-container__star ${
            index < value ? "rating-container__star--filled" : ""
          }`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <i className="fa-solid fa-star"></i>
        </span>
      ))}
    </section>
  );
};

export default Rating;
