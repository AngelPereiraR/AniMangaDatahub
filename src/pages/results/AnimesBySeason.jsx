import React, { useContext, useEffect, useState } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import AnimeInfoCard from "../../components/results/AnimeInfoCard";

const seasons = ["Winter", "Spring", "Summer", "Fall"]; // Temporadas en inglés

const getCurrentSeasonAndYear = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // Mes actual (de 0 a 11, por eso sumamos 1)
  const year = now.getFullYear();

  if (month >= 1 && month <= 3) return { season: "Winter", year };
  if (month >= 4 && month <= 6) return { season: "Spring", year };
  if (month >= 7 && month <= 9) return { season: "Summer", year };
  return { season: "Fall", year }; // Meses 10, 11, 12
};

const AnimesBySeason = () => {
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);

  const { season: currentSeason, year: currentYear } =
    getCurrentSeasonAndYear();

  const [year, setYear] = useState(currentYear); // Año actual
  const [season, setSeason] = useState(currentSeason); // Temporada actual
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  const baseUrl = `https://api.jikan.moe/v4/seasons/${year}/${season.toLowerCase()}?limit=24&page=${currentPage}`;

  useEffect(() => {
    updateEditScreen(false);
    updateFormMode(false);
  });

  const { data, loading, error } = useFetch(baseUrl);

  // Cambiar temporada
  const changeSeason = (direction) => {
    const currentSeasonIndex = seasons.indexOf(season);
    let newSeasonIndex = currentSeasonIndex + direction;

    if (newSeasonIndex < 0) {
      newSeasonIndex = seasons.length - 1;
      setYear((prev) => prev - 1);
    } else if (newSeasonIndex >= seasons.length) {
      newSeasonIndex = 0;
      setYear((prev) => prev + 1);
    }

    setSeason(seasons[newSeasonIndex]);
    setCurrentPage(1); // Resetear a la primera página al cambiar de temporada
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const totalPages = data.pagination.last_visible_page;

  // Lógica para calcular páginas visibles
  const getVisiblePages = () => {
    const maxButtons = 7;
    const pages = [];
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxButtons - 1, totalPages);

    if (end - start < maxButtons - 1) {
      start = Math.max(end - maxButtons + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <main className="animes-season__main">
      <Heading
        title="Animes de temporada"
        hasMore={false}
        isDeployable={false}
        url={null}
        className={"heading-menu"}
      />
      <div className="season-selector">
        <button onClick={() => changeSeason(-1)}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <span>
          {season} {year}
        </span>
        <button onClick={() => changeSeason(1)}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
      <section className="main__animes">
        {data.data.map((anime) => (
          <AnimeInfoCard
            key={anime.mal_id}
            title={anime.title_english || anime.title}
            image={anime.images.webp.image_url}
            duration={anime.duration}
            episodes={anime.episodes}
            firstEpisode={`${anime.aired.prop.from.day} - ${anime.aired.prop.from.month} - ${anime.aired.prop.from.year}`}
            valoration={anime.score}
            mal_id={anime.mal_id}
          />
        ))}
      </section>
      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={data.pagination.current_page === 1}
        >
          Anterior
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={!data.pagination.has_next_page}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
};

export default AnimesBySeason;
