import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Manga = () => {
  const { id } = useParams(); // Obtiene el ID del manga de la URL
  const navigate = useNavigate(); // Para redirigir en caso de error
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(`https://api.jikan.moe/v4/manga/${id}`);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useFetch(`https://api.jikan.moe/v4/manga/${id}/characters`);

  useEffect(() => {
    updateEditScreen(false);
    updateFormMode(false);

    const fetchData = async () => {
      if (apiError || charactersError) {
        setError(apiError || charactersError);
        navigate("/error404");
        return;
      }
    };

    fetchData();
  }, []);

  if (apiLoading || charactersLoading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (apiData === null) {
    return null; // Evita renderizar si no hay datos (caso improbable)
  }

  const {
    title,
    title_english,
    images,
    synopsis,
    score,
    rank,
    popularity,
    status,
    type,
    chapters,
    genres,
    serializations,
    themes,
    background,
  } = apiData.data;

  return (
    <main className="manga-page">
      {/* Encabezado con imagen e información principal */}
      <section className="manga-page__header">
        {images && (
          <img
            className="manga-page__image"
            src={images.jpg.large_image_url}
            alt={title}
          />
        )}
        <div className="manga-page__info">
          <Heading
            title={title_english || title}
            className="manga-page__title"
          />
          <p className="manga-page__details">
            {type} {chapters !== null ? `| ${chapters} capítulos` : ""} |{" "}
            {status}
          </p>
          {genres.length > 0 && (
            <p>
              <strong>Géneros:</strong>{" "}
              {genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
          {themes.length > 0 && (
            <p>
              <strong>Temas:</strong>{" "}
              {themes.map((theme) => theme.name).join(", ")}
            </p>
          )}
          {serializations.length > 0 && (
            <p>
              <strong>Revista:</strong>{" "}
              {serializations
                .map((serialization) => serialization.name)
                .join(", ")}
            </p>
          )}
          <div className="manga-page__buttons">
            <Button
              label="Añadir a lista"
              onClick={() => console.log("Añadido")}
            />
            <Button
              label="Añadir a favoritos"
              variant="secondary"
              onClick={() => console.log("Favorito")}
            />
          </div>
        </div>
      </section>

      {/* Ranking */}
      <section>
        <Heading title="Ranking" className="manga-page__ranking-heading" />
        <section className="manga-page__ranking">
          {score && <p>Puntuación: {score}</p>}
          {rank && <p>Posición: #{rank}</p>}
          {popularity && <p>Popularidad: #{popularity}</p>}
        </section>
      </section>

      {/* Sinopsis y Antecedentes encapsulados */}
      <div className="manga-page__content-row">
        {synopsis && (
          <section className="manga-page__synopsis">
            <Heading
              title="Sinopsis"
              className="manga-page__synopsis-heading"
            />
            <p>{synopsis}</p>
          </section>
        )}
        {background && (
          <section className="manga-page__background">
            <Heading title="Antecedentes" />
            <p>{background}</p>
          </section>
        )}
      </div>

      {/* Personajes */}
      {charactersData.data.length > 0 && (
        <section className="manga-page__characters">
          <Heading
            title="Personajes principales"
            className="manga-page__characters-heading"
          />
          <div
            className={`manga-page__character-list ${
              charactersData?.data?.every(
                (character) => !character.voice_actors?.length
              )
                ? "manga-page__character-list--expanded"
                : ""
            }`}
          >
            {charactersData.data
              ?.sort((a, b) => {
                if (a.role === "Main" && b.role !== "Main") return -1;
                if (a.role !== "Main" && b.role === "Main") return 1;
                return b.favorites - a.favorites;
              })
              .slice(0, 8)
              .map((character) => {
                const voiceActor = character.voice_actors?.[0];
                return (
                  <CharacterSeiyuuCard
                    key={character.mal_id}
                    character={character.character}
                    voiceActor={voiceActor}
                    role={character.role}
                  />
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Manga;
