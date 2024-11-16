import React from "react";
import "./Rating.css";

const Rating = ({ value, onChange, darkMode }) => {
  const handleMouseEnter = (index) => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.add("hovered");
      } else {
        star.classList.remove("hovered");
      }
    });
  };

  const handleMouseLeave = () => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => star.classList.remove("hovered"));
  };

  const handleClick = (index) => {
    onChange(index + 1);
  };

  return (
    <div className={`rating-container ${darkMode ? "rating-dark" : ""}`}>
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < value ? "filled" : ""}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <i class="fa-solid fa-star"></i>
        </span>
      ))}
    </div>
  );
};

export default Rating;
