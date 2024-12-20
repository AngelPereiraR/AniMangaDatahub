import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Anime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}`);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}/characters`);

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
      const isFav = favorites.some((anime) => anime.mal_id === parseInt(id));
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
      media: "anime",
    };

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (anime) => anime.mal_id !== apiData.data.mal_id
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

  if (apiData.length > 0) {
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
    episodes,
    genres,
    studios,
    source,
    themes,
    duration,
    rating,
    background,
  } = apiData.data;

  return (
    <main className="anime-page">
      <section className="anime-page__header">
        {images && (
          <img
            className="anime-page__image"
            src={images.jpg.large_image_url}
            alt={title}
          />
        )}
        <div className="anime-page__info">
          <Heading
            title={title_english || title}
            className="anime-page__title"
          />
          <p className="anime-page__details">
            {type} {episodes !== null && `| ${episodes} capítulos`} | {status}
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
          {studios && (
            <p>
              <strong>Estudio:</strong>{" "}
              {studios.map((studio) => studio.name).join(", ")}
            </p>
          )}
          {source && (
            <p>
              <strong>Fuente:</strong> {source}
            </p>
          )}
          {duration && (
            <p>
              <strong>Duración:</strong> {duration}
            </p>
          )}
          {rating && (
            <p>
              <strong>Clasificación:</strong> {rating}
            </p>
          )}
          <div className="anime-page__buttons">
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

      <section>
        <Heading title="Ranking" className="anime-page__ranking-heading" />
        <section className="anime-page__ranking">
          {score && <p>Puntuación: {score}</p>}
          {rank && <p>Posición: #{rank}</p>}
          {popularity && <p>Popularidad: #{popularity}</p>}
        </section>
      </section>

      <div className="anime-page__content-row">
        {synopsis && (
          <section className="anime-page__synopsis">
            <Heading
              title="Sinopsis"
              className="anime-page__synopsis-heading"
            />
            <p>{synopsis}</p>
          </section>
        )}
        {background && (
          <section className="anime-page__background">
            <Heading title="Antecedentes" />
            <p>{background}</p>
          </section>
        )}
      </div>

      {charactersData.data.length > 0 && (
        <section className="anime-page__characters">
          <Heading
            title="Personajes y actores de voz principales"
            className="anime-page__characters-heading"
          />
          <div className="anime-page__character-list">
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

export default Anime;
