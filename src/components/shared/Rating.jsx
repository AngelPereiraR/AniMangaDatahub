import React from "react"; // Importación de React
import "./Rating.css"; // Importación de los estilos específicos del componente

// Componente Rating que permite calificar con estrellas
const Rating = ({ value, onChange, darkMode }) => {
  // Maneja el evento cuando el mouse entra sobre una estrella
  const handleMouseEnter = (index) => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, i) => {
      // Añade la clase "hovered" a las estrellas hasta el índice actual
      if (i <= index) {
        star.classList.add("hovered");
      } else {
        // Elimina la clase "hovered" de las demás estrellas
        star.classList.remove("hovered");
      }
    });
  };

  // Maneja el evento cuando el mouse sale de una estrella
  const handleMouseLeave = () => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => star.classList.remove("hovered"));
  };

  // Maneja el evento cuando se hace clic en una estrella
  const handleClick = (index) => {
    onChange(index + 1);
  };

  return (
    <section className={`rating-container ${darkMode ? "rating-dark" : ""}`}>
      {/* Crea un array de 10 elementos (para 10 estrellas), y por cada elemento renderiza una estrella */}
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < value ? "filled" : ""}`} // Si el índice es menor que el valor de la calificación, añade la clase "filled"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <i className="fa-solid fa-star"></i> {/* Icono de estrella */}
        </span>
      ))}
    </section>
  );
};

export default Rating; // Exportación del componente para su uso en otros archivos
