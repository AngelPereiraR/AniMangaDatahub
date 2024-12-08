import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Character = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(`https://api.jikan.moe/v4/characters/${id}/full`);

  useEffect(() => {
    updateEditScreen(false);
    updateFormMode(false);

    if (apiError) {
      navigate("/error404");
    }
  }, [apiError, navigate, updateEditScreen, updateFormMode]);

  useEffect(() => {
    if (apiData?.data) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFav = favorites.some(
        (character) => character.mal_id === parseInt(id)
      );
      setIsFavorite(isFav);
    }
  }, [apiData, id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorite = {
      mal_id: apiData.data.mal_id,
      title: apiData.data.name,
      image:
        apiData.data.images.jpg.large_image_url ||
        apiData.data.images.jpg.image_url,
      media: "character",
    };

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (character) => character.mal_id !== apiData.data.mal_id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (apiLoading) {
    return <div>Cargando...</div>;
  }

  if (apiData.length > 0) {
    return null;
  }

  const { name, nicknames, images, about, anime, manga, voices } = apiData.data;

  return (
    <main className="character-page">
      {/* Encabezado con imagen e información principal */}
      <section className="character-page__header">
        {images && (
          <img
            className="character-page__image"
            src={images.jpg.large_image_url || images.jpg.image_url}
            alt={name}
          />
        )}
        <div className="character-page__info">
          <Heading title={name} className="character-page__title" />
          {nicknames.length > 0 && (
            <p>
              <strong>Apodos:</strong> {nicknames.join(", ")}
            </p>
          )}
          {about &&
            about.split("\n").map((line, index) => <p key={index}>{line}</p>)}
          <div className="character-page__buttons">
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

      {voices.length > 0 && (
        <section>
          <Heading
            title="Actores de voz"
            className="character-page__seiyuu-heading"
          />
          {voices.map((voice, index) => (
            <Link to={`/seiyuu/${voice.person.mal_id}`} key={index}>
              <CharacterSeiyuuCard voiceActor={voice}></CharacterSeiyuuCard>
            </Link>
          ))}
        </section>
      )}

      <div className="character-page__content-row">
        {anime && (
          <section className="character-page__anime">
            <Heading
              title="Animes"
              className="character-page__character-heading"
            />
            {anime.map((ani, index) => (
              <CharacterSeiyuuCard
                anime={ani.anime}
                key={index}
              ></CharacterSeiyuuCard>
            ))}
          </section>
        )}
        {manga && (
          <section className="character-page__manga">
            <Heading title="Mangas" />
            {manga.map((man, index) => (
              <CharacterSeiyuuCard
                manga={man.manga}
                key={index}
              ></CharacterSeiyuuCard>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Character;
