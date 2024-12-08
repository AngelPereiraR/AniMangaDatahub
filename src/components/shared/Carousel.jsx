import React, { useState } from "react";
import Card from "./Card";

const Carousel = ({ data, cardNumbers, type = "" }) => {
  // Filtrar elementos únicos
  const uniqueData = data.data
    ? data.data.filter(
        (item, index, self) =>
          self.findIndex((i) => i.mal_id === item.mal_id) === index
      )
    : data;

  // Estado para controlar el índice inicial de las tarjetas visibles
  const [startIndex, setStartIndex] = useState(0);

  // Cantidad total de elementos
  const totalCards = uniqueData.length;

  // Manejar clics en los botones para navegación cíclica
  const handlePrev = () => {
    setStartIndex((prev) => (prev - cardNumbers + totalCards) % totalCards);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + cardNumbers) % totalCards);
  };

  // Generar subconjunto de tarjetas visibles de manera cíclica
  const visibleCards = Array.from({ length: cardNumbers }, (_, i) => {
    const index = (startIndex + i) % totalCards;
    return uniqueData[index];
  });

  return (
    <div className="carousel-container">
      {visibleCards[0] ? (
        <div>
          {/* Botón para mostrar tarjetas anteriores */}
          <button
            type="button" // Asegura que no recargue la página
            className="carousel-button prev"
            onClick={handlePrev}
          >
            &#9664; {/* Símbolo de flecha izquierda */}
          </button>

          <div className="carousel-track">
            {visibleCards.map((result) => (
              <Card
                key={result.mal_id}
                title={
                  result.title_english ? result.title_english : result.title
                }
                image={
                  result.images
                    ? result.images.webp.large_image_url !== null
                      ? result.images.webp.large_image_url
                      : result.images.webp.image_url
                    : result.image
                }
                mal_id={result.mal_id}
                type={result.media ? result.media : type}
              />
            ))}
          </div>

          {/* Botón para mostrar tarjetas siguientes */}
          <button
            type="button" // Asegura que no recargue la página
            className="carousel-button next"
            onClick={handleNext}
          >
            &#9654; {/* Símbolo de flecha derecha */}
          </button>
        </div>
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </div>
  );
};

export default Carousel;
