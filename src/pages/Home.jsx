import React, { useContext, useEffect, useState } from "react";
import { FormModeContext } from "../context/FormModeContext";
import { EditScreenContext } from "../context/EditScreenContext";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Heading from "../components/shared/Heading";
import { useFetch } from "../hooks/useFetch";
import Carousel from "../components/shared/Carousel";
import { ScreenWidthContext } from "../context/ScreenWidthContext";

const Home = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { isWideScreen } = useContext(ScreenWidthContext);
  const { user } = useContext(UserContext);
  const [carouselCardCount, setCarouselCardCount] = useState(4); // Inicialmente 4

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(false);

    // Establecer la cantidad de tarjetas a mostrar según el ancho de la pantalla
    const updateCardCount = () => {
      const width = window.innerWidth;
      if (width > 1600) {
        setCarouselCardCount(6); // Más de 1050px, mostrar 6
      } else if (width < 710) {
        setCarouselCardCount(2); // Menos de 600px, mostrar 2
      } else if (width > 1050 && width < 1600) {
        setCarouselCardCount(5); // Menos de 600px, mostrar 2
      } else {
        setCarouselCardCount(4); // En otro caso, mostrar 4
      }
    };

    // Llamar a la función de ajuste del número de tarjetas
    updateCardCount();

    // Añadir un listener para detectar cambios en el tamaño de la ventana
    window.addEventListener("resize", updateCardCount);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", updateCardCount);
    };
  });

  const {
    data: animeData,
    loading: animeLoading,
    error: animeError,
  } = useFetch("https://api.jikan.moe/v4/seasons/now?continuing&limit=24");

  const {
    data: mangaData,
    loading: mangaLoading,
    error: mangaError,
  } = useFetch(
    "https://api.jikan.moe/v4/manga?status=publishing&order_by=start_date&sort=desc&limit=24"
  );

  if (animeLoading || mangaLoading) return <div>Cargando...</div>;
  if (animeError || mangaError) return <p>Error!!!</p>;

  return (
    <main>
      <section className="home-main">
        <section className="main-intro">
          <h2 className="intro-title">
            Una base de datos interactiva con todos los animes y mangas del
            mundo.
          </h2>
          {user === null && (
            <div className="intro-buttons">
              <Button
                label="Iniciar sesión"
                className="buttons-button"
                onClick={() => navigate("/login")}
              ></Button>
              <Button
                label="Primeros pasos"
                className="buttons-button"
                variant="secondary"
                onClick={() => navigate("/register")}
              ></Button>
            </div>
          )}
        </section>
      </section>
      <Heading
        title="Animes Última Temporada"
        className="heading-subtitle"
        hasMore={true}
        isDeployable={false}
        url="/anime/season"
      />
      <Carousel data={animeData} cardNumbers={carouselCardCount} type="anime" />
      <Heading
        title={isWideScreen ? "Últimos mangas en producción" : "Últimos mangas"}
        className="heading-subtitle"
        hasMore={true}
        isDeployable={false}
        url="/manga/season"
      />
      <Carousel data={mangaData} cardNumbers={carouselCardCount} type="manga" />
    </main>
  );
};

export default Home;
