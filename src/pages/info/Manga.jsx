import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Manga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [isFavorite, setIsFavorite] = useState(false);

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

    if (apiError || charactersError) {
      navigate("/error404");
    }
  }, [apiError, charactersError, navigate, updateEditScreen, updateFormMode]);

  useEffect(() => {
    if (apiData?.data) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFav = favorites.some((manga) => manga.mal_id === parseInt(id));
      setIsFavorite(isFav);
    }
  }, [apiData, id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorite = {
      mal_id: apiData.data.mal_id,
      title: apiData.data.title,
      image:
        apiData.data.images.jpg.large_image_url ||
        apiData.data.images.jpg.image_url,
      media: "manga",
    };

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (manga) => manga.mal_id !== apiData.data.mal_id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (apiLoading || charactersLoading) {
    return <div>Cargando...</div>;
  }

  if (!apiData) {
    return null;
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
              label={
                isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"
              }
              variant="secondary"
              onClick={handleAddToFavorites}
              className="width-50"
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
      {charactersData?.data?.length > 0 && (
        <section className="manga-page__characters">
          <Heading
            title="Personajes principales"
            className="manga-page__characters-heading"
          />
          <div className="manga-page__character-list">
            {charactersData.data
              ?.sort((a, b) => b.favorites - a.favorites)
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
