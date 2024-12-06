import React, { useContext, useEffect } from "react";
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
    return <div>Cargando...</div>;
  }

  if (apiData.length > 0) {
    return null;
  }

  const { name, images, about, birthday } = apiData.data;

  console.log(charactersData.data);

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
          {about && about.split("\n").map((line) => <p>{line}</p>)}
          <div className="seiyuu-page__buttons">
            <Button
              label="Añadir a favoritos"
              variant="secondary"
              onClick={() => console.log("Favorito")}
              className="width-50"
            />
          </div>
        </div>
      </section>

      {charactersData.data.length > 0 &&
        [...charactersData.data]
          .sort((a, b) => {
            const nameA = a.character.name.toLowerCase();
            const nameB = b.character.name.toLowerCase();
            return nameA.localeCompare(nameB);
          })
          .map((performance) => (
            <CharacterSeiyuuCard
              key={performance.character.mal_id}
              role={performance.role}
              anime={performance.anime}
              character={performance.character}
            />
          ))}
    </main>
  );
};

export default Seiyuu;
