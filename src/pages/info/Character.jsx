import React, { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import Button from "../../components/shared/Button";
import CharacterSeiyuuCard from "../../components/info/CharacterSeiyuuCard";

const Character = () => {
  const { id } = useParams(); // Obtiene el ID del personaje de la URL
  const navigate = useNavigate(); // Para redirigir en caso de error
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(`https://api.jikan.moe/v4/characters/${id}/full`);

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
          {about && about.split("\n").map((line) => <p>{line}</p>)}
          <div className="character-page__buttons">
            <Button
              label="Añadir a favoritos"
              variant="secondary"
              onClick={() => console.log("Favorito")}
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
          {voices.map((voice) => (
            <Link to={`/seiyuu/${voice.person.mal_id}`}>
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
            {anime.map((ani) => (
              <CharacterSeiyuuCard anime={ani.anime}></CharacterSeiyuuCard>
            ))}
          </section>
        )}
        {manga && (
          <section className="character-page__manga">
            <Heading title="Mangas" />
            {manga.map((man) => (
              <CharacterSeiyuuCard manga={man.manga}></CharacterSeiyuuCard>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Character;
