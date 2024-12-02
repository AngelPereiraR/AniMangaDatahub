import React, { useContext, useEffect, useState } from "react";
import Heading from "../../components/shared/Heading";
import { EditScreenContext } from "../../context/EditScreenContext";
import { ThemeContext } from "../../context/ThemeContext";
import { FormModeContext } from "../../context/FormModeContext";
import { ScreenWidthContext } from "../../context/ScreenWidthContext";
import { useFetch } from "../../hooks/useFetch";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";

const menuOptions = [
  { label: "Todos los Mangas", endpoint: "top/manga?" },
  { label: "Top En publicación", endpoint: "top/manga?filter=publishing" },
  { label: "Top Futuros", endpoint: "top/manga?filter=upcoming" },
  { label: "Top Manga", endpoint: "top/manga?type=manga" },
  { label: "Top Novelas", endpoint: "top/manga?type=novel" },
  { label: "Top Novelas ligeras", endpoint: "top/manga?type=lightnovel" },
  { label: "Top Oneshots", endpoint: "top/manga?type=oneshot" },
  { label: "Top Doujins", endpoint: "top/manga?type=doujin" },
  { label: "Top Manhwas", endpoint: "top/manga?type=manhwa" },
  { label: "Top Manhuas", endpoint: "top/manga?type=manhua" },
  { label: "Más populares", endpoint: "top/manga?filter=bypopularity" },
];

const TopMangas = () => {
  const [activeOption, setActiveOption] = useState(menuOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode } = useContext(ThemeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const { isWideScreen } = useContext(ScreenWidthContext);

  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/${activeOption.endpoint}&page=${currentPage}&limit=24`
  );

  useEffect(() => {
    updateEditScreen(false);
    updateFormMode(false);
  }, [updateEditScreen, updateFormMode]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setCurrentPage(1);
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const totalPages = data.pagination.last_visible_page;

  // Lógica para calcular las páginas visibles
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
    <main className="top-mangas__main">
      <Heading title="Top Mangas" />
      <nav
        className={`menu-container ${darkMode ? "menu-container--dark" : ""}`}
      >
        <ul className="menu">
          {menuOptions.map((option) => (
            <li
              key={option.label}
              className={`menu-item ${
                activeOption.label === option.label ? "active" : ""
              } ${darkMode ? "menu-item--dark" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </nav>
      <section className="main-table__mangas">
        <table className={`manga-table ${darkMode ? "manga-table--dark" : ""}`}>
          <thead>
            <tr>
              <th>Rango</th>
              <th>Título</th>
              {isWideScreen && <th>Puntuación</th>}
              {isWideScreen && <th>Estado</th>}
            </tr>
          </thead>
          <tbody>
            {data.data.map((manga, index) => (
              <tr key={manga.mal_id}>
                <td>
                  <div className="manga-rank">
                    {(currentPage - 1) * 24 + index + 1}
                    {!isWideScreen && (
                      <button
                        className="add-to-list-icon"
                        title="Añadir a la Lista"
                        onClick={() => console.log(`Añadido ${manga.title}`)}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <Link key={manga.mal_id} to={`/manga/${manga.mal_id}`}>
                    <div className="manga-title">
                      <img
                        src={manga.images.webp.image_url}
                        alt={manga.title}
                        className="manga-image"
                      />
                      <div>
                        <h3>{manga.title_english || manga.title}</h3>
                        <p>
                          {manga.synopsis
                            ? `${manga.synopsis.slice(0, 200)}...`
                            : "Sin descripción"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                {isWideScreen && <td>⭐ {manga.score || "N/A"}</td>}
                {isWideScreen && (
                  <td>
                    <Button label="Añadir a la Lista" variant="secondary" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={!data.pagination.has_previous_page}
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

export default TopMangas;
