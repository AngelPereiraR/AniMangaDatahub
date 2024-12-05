import React, { useContext, useEffect, useState } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { useFetch } from "../../hooks/useFetch";
import Heading from "../../components/shared/Heading";
import MangaInfoCard from "../../components/results/MangaInfoCard";

const MangasBySeason = () => {
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [currentPage, setCurrentPage] = useState(1);

  const baseUrl = `https://api.jikan.moe/v4/manga?status=publishing&sort=desc&limit=24&page=${currentPage}`;

  useEffect(() => {
    updateEditScreen(false);
    updateFormMode(false);
  }, []);

  const { data, loading, error } = useFetch(baseUrl);

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= data.pagination.last_visible_page) {
      setCurrentPage(newPage);
    }
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
    <main className="mangas-season__main">
      <Heading
        title="Mangas en publicación"
        hasMore={false}
        isDeployable={false}
        url={null}
        className={"heading-menu"}
      />
      <section className="main__mangas">
        {data.data.map((manga) => (
          <MangaInfoCard
            key={manga.mal_id}
            title={manga.title_english || manga.title}
            image={manga.images.webp.image_url}
            episodes={manga.chapters}
            firstEpisode={`${manga.published.prop.from.day} - ${manga.published.prop.from.month} - ${manga.published.prop.from.year}`}
            valoration={manga.score}
            mal_id={manga.mal_id}
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

export default MangasBySeason;
