import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../context/FormModeContext";
import { EditScreenContext } from "../context/EditScreenContext";
import Button from "../components/shared/Button";
import "./Home.css";
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

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(false);
  });

  const {
    data: animeData,
    loading: animeLoading,
    error: animeError,
  } = useFetch("https://api.jikan.moe/v4/seasons/now?continuing");

  const {
    data: mangaData,
    loading: mangaLoading,
    error: mangaError,
  } = useFetch(
    "https://api.jikan.moe/v4/manga?status=publishing&order_by=start_date&sort=desc"
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
      <Carousel
        data={animeData}
        cardNumbers={isWideScreen ? 6 : 2}
        type="anime"
      />
      <Heading
        title={isWideScreen ? "Últimos mangas en producción" : "Últimos mangas"}
        className="heading-subtitle"
        hasMore={true}
        isDeployable={false}
        url="/manga/season"
      />
      <Carousel
        data={mangaData}
        cardNumbers={isWideScreen ? 6 : 2}
        type="manga"
      />
    </main>
  );
};

export default Home;
