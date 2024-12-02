import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Anime = () => {
  const { id } = useParams(); // Obtiene el ID del anime de la URL
  const navigate = useNavigate(); // Para redirigir en caso de error
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}/full`);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}/characters`);

  console.log(charactersData);

  useEffect(() => {
    updateEditScreen(false);
    updateFormMode(false);

    const fetchData = async () => {
      if (apiError) {
        setError(apiError);
        navigate("/error404");
        return;
      }
    };

    fetchData();
  }, []);

  if (apiLoading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (apiData.length > 0) {
    return null; // Evita renderizar si no hay datos (caso improbable)
  }

  const {
    title,
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
      {/* Encabezado con imagen e información principal */}
      <section className="anime-page__header">
        <img
          className="anime-page__image"
          src={images.jpg.large_image_url}
          alt={title}
        />
        <div className="anime-page__info">
          <Heading title={title} className="anime-page__title" />
          <p className="anime-page__details">
            {type} | {episodes} episodios | {status}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Temas:</strong>{" "}
            {themes.map((theme) => theme.name).join(", ")}
          </p>
          <p>
            <strong>Estudio:</strong>{" "}
            {studios.map((studio) => studio.name).join(", ")}
          </p>
          <p>
            <strong>Fuente:</strong> {source}
          </p>
          <p>
            <strong>Duración:</strong> {duration}
          </p>
          <p>
            <strong>Clasificación:</strong> {rating}
          </p>
          <div className="anime-page__buttons">
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
      <section className="anime-page__ranking">
        <Heading title="Ranking" className="anime-page__ranking-heading" />
        <p>Puntuación: {score}</p>
        <p>Posición: #{rank}</p>
        <p>Popularidad: #{popularity}</p>
      </section>

      {/* Sinopsis y Antecedentes encapsulados */}
      <div className="anime-page__content-row">
        <section className="anime-page__synopsis">
          <Heading title="Sinopsis" className="anime-page__synopsis-heading" />
          <p>{synopsis}</p>
        </section>
        {background && (
          <section className="anime-page__background">
            <Heading title="Antecedentes" />
            <p>{background}</p>
          </section>
        )}
      </div>

      {/* Personajes */}
      <section className="anime-page__characters">
        <Heading
          title="Personajes y actores de voz principales"
          className="anime-page__characters-heading"
        />
        <div className="anime-page__character-list">
          {charactersData != null
            ? charactersData.data
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
                })
            : ""}
        </div>
      </section>
    </main>
  );
};

export default Anime;
