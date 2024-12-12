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
  { label: "Todos los Animes", endpoint: "top/anime?" },
  { label: "Top En emisión", endpoint: "top/anime?filter=airing" },
  { label: "Top Futuros", endpoint: "top/anime?filter=upcoming" },
  { label: "Top TV series", endpoint: "top/anime?type=tv" },
  { label: "Top Películas", endpoint: "top/anime?type=movie" },
  { label: "Top OVAs", endpoint: "top/anime?type=ova" },
  { label: "Top ONAs", endpoint: "top/anime?type=ona" },
  { label: "Top Especiales", endpoint: "top/anime?type=special" },
  { label: "Más populares", endpoint: "top/anime?filter=bypopularity" },
];

const TopAnimes = () => {
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

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) return <Navigate to="/error-404"></Navigate>;

  const totalPages = data.pagination.last_visible_page;

  // Lógica para calcular las páginas visibles
  const getVisiblePages = () => {
    const maxButtons = 4;
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
    <main className="top-animes__main">
      <Heading title="Top Animes" />
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
      <section className="main-table__animes">
        <table className={`anime-table ${darkMode ? "anime-table--dark" : ""}`}>
          <thead>
            <tr>
              <th>Rango</th>
              <th>Título</th>
              {isWideScreen && <th>Puntuación</th>}
              {isWideScreen && <th>Estado</th>}
            </tr>
          </thead>
          <tbody>
            {data.data.map((anime, index) => (
              <tr key={anime.mal_id}>
                <td>
                  <div className="anime-rank">
                    {(currentPage - 1) * 24 + index + 1}
                    {!isWideScreen && (
                      <button
                        className="add-to-list-icon"
                        title="Añadir a favoritos"
                        onClick={() => console.log(`Añadido ${anime.title}`)}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                    <div className="anime-title">
                      <img
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        className="anime-image"
                      />
                      <div>
                        <h3>{anime.title_english || anime.title}</h3>
                        <p>
                          {anime.synopsis
                            ? `${anime.synopsis.slice(0, 200)}${
                                anime.synopsis.length > 200 ? "..." : ""
                              }`
                            : "Sin descripción"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                {isWideScreen && <td>⭐ {anime.score || "N/A"}</td>}
                {isWideScreen && (
                  <td>
                    <Button label="Añadir a favoritos" variant="secondary" />
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

export default TopAnimes;
