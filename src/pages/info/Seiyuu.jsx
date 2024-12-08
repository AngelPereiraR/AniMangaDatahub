import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Seiyuu = () => {
  const { id } = useParams(); // Obtiene el ID del actor de voz de la URL
  const navigate = useNavigate(); // Para redirigir en caso de error
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para gestionar favoritos

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(`https://api.jikan.moe/v4/people/${id}`);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useFetch(`https://api.jikan.moe/v4/people/${id}/voices`);

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
      const isFav = favorites.some((person) => person.mal_id === parseInt(id));
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
      media: "seiyuu",
    };

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (person) => person.mal_id !== apiData.data.mal_id
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

  const { name, images, about, birthday } = apiData.data;

  return (
    <main className="seiyuu-page">
      {/* Encabezado con imagen e información principal */}
      <section className="seiyuu-page__header">
        {images && (
          <img
            className="seiyuu-page__image"
            src={images.jpg.large_image_url || images.jpg.image_url}
            alt={name}
          />
        )}
        <div className="seiyuu-page__info">
          <Heading title={name} className="seiyuu-page__title" />
          {birthday && (
            <p>
              <strong>Cumpleaños:</strong> {birthday.substring(0, 10)}
            </p>
          )}
          {about &&
            about.split("\n").map((line, index) => <p key={index}>{line}</p>)}
          <div className="seiyuu-page__buttons">
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

      {/* Personajes interpretados */}
      {charactersData?.data?.length > 0 && (
        <section className="seiyuu-page__characters">
          <Heading title="Personajes interpretados" />
          {[...charactersData.data]
            .sort((a, b) => a.character.name.localeCompare(b.character.name))
            .map((performance) => (
              <CharacterSeiyuuCard
                key={performance.character.mal_id}
                role={performance.role}
                anime={performance.anime}
                character={performance.character}
              />
            ))}
        </section>
      )}
    </main>
  );
};

export default Seiyuu;
