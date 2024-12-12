import React, { useContext, useEffect, useState } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { ThemeContext } from "../../context/ThemeContext";
import Heading from "../../components/shared/Heading";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "../../components/layouts/Dropdown";
import { useFetch } from "../../hooks/useFetch";

const menuOptions = [
  { label: "Animes", endpoint: "anime" },
  { label: "Mangas", endpoint: "manga" },
  { label: "Personajes", endpoint: "characters" },
];

const Search = () => {
  const { darkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [filtered, setFiltered] = useState(searchParams.get("filtered") || "");
  const [finalUrl, setFinalUrl] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros
  const [filterValues, setFilterValues] = useState({
    type: "", // Tipo
    score: 0, // Puntuación
    status: "", // Estado
    ageRating: "", // Valoración de Edad
    startDate: "", // Fecha de inicio
    endDate: "", // Fecha de fin
    sfw: false, // Modo seguro
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (query && filtered) {
      setSearchTerm(query);
      setDropdownValue(filtered);
      updateUrlParams();
      // Si query y filtered están presentes, actualiza la URL y realiza la petición
      setFinalUrl(buildUrl(filtered, currentPage, query));
    }
    updateEditScreen(false);
    updateFormMode(false);
  }, []);

  useEffect(() => {
    if (query !== "" && query !== null) {
      setSearchTerm(query);
    } else {
      setQuery(null);
    }
    if (filtered !== "" && filtered !== null) {
      setDropdownValue(filtered);
    } else if (filtered === "") {
      setFiltered(null);
      setDropdownValue("anime");
    }
    updateEditScreen(false);
    updateFormMode(false);
    updateUrlParams();
  }, [query, filtered, searchTerm, dropdownValue, finalUrl]);

  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", searchTerm);
      setQuery(null);
    } else if (searchTerm) params.set("query", searchTerm);
    if (filtered) {
      params.set("filtered", filtered);
      setFiltered(null);
    } else if (dropdownValue) params.set("filtered", dropdownValue);
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]) params.set(key, filterValues[key]);
    });

    navigate(`?${params.toString()}`);
  };

  const { data, loading, error } = useFetch(finalUrl);

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
    debounceSearch(e.target.value, "dropdown");
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value, "query");
  };

  const debounceSearch = (value, type) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setFinalUrl(
        type === "dropdown"
          ? buildUrl(value)
          : buildUrl(undefined, undefined, value)
      );
    }, 2000);

    setTimeoutId(newTimeoutId);
  };

  const buildUrl = (search, page, query) => {
    const filters = new URLSearchParams();

    if (searchTerm) filters.set("q", searchTerm);
    if (filterValues.type) filters.set("type", filterValues.type);
    if (filterValues.score) filters.set("score", filterValues.score);
    if (filterValues.status) filters.set("status", filterValues.status);
    if (filterValues.ageRating)
      filters.set("age_rating", filterValues.ageRating);
    if (filterValues.startDate)
      filters.set("start_date", filterValues.startDate);
    if (filterValues.endDate) filters.set("end_date", filterValues.endDate);
    if (filterValues.sfw) filters.set("sfw", filterValues.sfw);

    return `https://api.jikan.moe/v4/${
      search !== undefined ? search : dropdownValue
    }?${query ? `q=${query}` : `${filters.toString()}`}&limit=24&page=${
      page !== undefined ? page : currentPage
    }`;
  };

  const handleSearch = () => {
    setFinalUrl(buildUrl(searchTerm, undefined));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Alternar la visibilidad de los filtros
  };

  const handleFilterChange = (filterName, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [filterName]: value,
    }));
    debounceSearch();
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setFinalUrl(buildUrl(undefined, newPage, undefined));
  };

  const renderTable = () => {
    if (!data || !data.data) return null;

    const rows = data.data.map((item, index) => {
      switch (dropdownValue) {
        case "anime":
          return (
            <tr className="table__row" key={index}>
              <td className="table__cell">
                <Link to={`/anime/${item.mal_id}`}>
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title}
                    className="table__image"
                  />
                </Link>
              </td>
              <td className="table__cell">
                <Link to={`/anime/${item.mal_id}`}>
                  <h3 className="table__title">
                    {item.title_english || item.title}
                  </h3>
                  <p className="table__description">
                    {item.synopsis
                      ? `${item.synopsis.slice(0, 200)}${
                          item.synopsis.length > 200 ? "..." : ""
                        }`
                      : "Sin descripción"}
                  </p>
                </Link>
              </td>
            </tr>
          );
        case "manga":
          return (
            <tr className="table__row" key={index}>
              <td className="table__cell">
                <Link to={`/manga/${item.mal_id}`}>
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title}
                    className="table__image"
                  />
                </Link>
              </td>
              <td className="table__cell">
                <Link to={`/manga/${item.mal_id}`}>
                  <h3 className="table__title">
                    {item.title_english || item.title}
                  </h3>
                  <p className="table__description">
                    {item.synopsis
                      ? `${item.synopsis.slice(0, 200)}${
                          item.synopsis.length > 200 ? "..." : ""
                        }`
                      : "Sin descripción"}
                  </p>
                </Link>
              </td>
            </tr>
          );
        case "characters":
          return (
            <tr className="table__row" key={index}>
              <td className="table__cell">
                <Link to={`/character/${item.mal_id}`}>
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.name}
                    className="table__image"
                  />
                </Link>
              </td>
              <td className="table__cell">
                <Link to={`/character/${item.mal_id}`}>
                  <p className="table__title">{item.name}</p>
                  <p className="table__description">
                    {item.about
                      ? `${item.about.slice(0, 200)}${
                          item.about.length > 200 ? "..." : ""
                        }`
                      : "Sin descripción"}
                  </p>
                </Link>
              </td>
            </tr>
          );
        default:
          return null;
      }
    });

    return (
      <section className="table-container">
        <table className={`table ${darkMode ? "table--dark" : ""}`}>
          <thead className="table__header">
            <tr className="table__header-row">
              <th className="table__header-cell">Imagen</th>
              <th className="table__header-cell">
                {dropdownValue === "characters" ? "Nombre" : "Título"}
              </th>
            </tr>
          </thead>
          <tbody className="table__body">{rows}</tbody>
        </table>
      </section>
    );
  };

  let totalPages = null;

  if (data !== null) {
    totalPages = data.pagination.last_visible_page;
  }

  // Lógica para calcular páginas visibles
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
    <main className="search-anime">
      <Heading title="Búsqueda" />
      <div className="search-bar-container">
        <Dropdown onChange={handleDropdownChange} value={dropdownValue} />
        <div className={`search-bar ${darkMode ? "search-bar--dark" : ""}`}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button type="button" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {(dropdownValue === "anime" || dropdownValue === "manga") && (
          <button
            className={`filters-button ${
              darkMode ? "filters-button--dark" : ""
            }`}
            onClick={toggleFilters}
            aria-label="Filtros avanzados"
          >
            <i className="fa-solid fa-filter"></i>
          </button>
        )}
      </div>

      <div className="search__filters-table">
        {/* Filtros avanzados */}
        {showFilters &&
          (dropdownValue === "anime" || dropdownValue === "manga") && (
            <div
              className={`advanced-filters ${
                darkMode ? "advanced-filters--dark" : ""
              }`}
            >
              <div className="filter">
                <label>Tipo:</label>
                {dropdownValue === "anime" ? (
                  <select
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    value={filterValues.type}
                  >
                    <option value="tv">TV</option>
                    <option value="movie">Película</option>
                    <option value="ova">OVA</option>
                    <option value="special">Especial</option>
                    <option value="ona">ONA</option>
                    <option value="music">Música</option>
                    <option value="cm">CM</option>
                    <option value="pv">PV</option>
                    <option value="tv_special">TV Especial</option>
                  </select>
                ) : (
                  <select
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    value={filterValues.type}
                  >
                    <option value="manga">Manga</option>
                    <option value="novel">Novela</option>
                    <option value="lightnovel">Novela ligera</option>
                    <option value="oneshot">Oneshot</option>
                    <option value="doujin">Doujin</option>
                    <option value="manhwa">Manhwa</option>
                    <option value="manhua">Manhua</option>
                  </select>
                )}
              </div>
              <div className="filter">
                <label>Puntuación:</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  onChange={(e) => handleFilterChange("score", e.target.value)}
                />
              </div>
              <div className="filter">
                <label>Estado:</label>
                {dropdownValue === "anime" ? (
                  <select
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="airing">En emisión</option>
                    <option value="finished">Terminado</option>
                    <option value="upcoming">Próximo</option>
                  </select>
                ) : (
                  <select
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="publishing">En publicación</option>
                    <option value="complete">Completo</option>
                    <option value="hiatus">En pausa</option>
                    <option value="discontinued">Abandonado</option>
                    <option value="upcoming">Próximo</option>
                  </select>
                )}
              </div>
              {dropdownValue === "anime" && (
                <div className="filter">
                  <label>Valoración de Edad:</label>
                  <select
                    onChange={(e) =>
                      handleFilterChange("ageRating", e.target.value)
                    }
                  >
                    <option value="g">G - Todas las edades</option>
                    <option value="pg">PG - Niños</option>
                    <option value="pg13">
                      PG-13 - Adolescentes de 13 años o mayores
                    </option>
                    <option value="r17">
                      R- 17+ - (Violencia y profanidad)
                    </option>
                    <option value="r">R+ - Desnudez leve</option>
                    <option value="rx">Rx - Hentai</option>
                  </select>
                </div>
              )}
              <div className="filter">
                <label>Modo seguro</label>
                <select
                  onChange={(e) => handleFilterChange("sfw", e.target.value)}
                >
                  <option value="false">Sí</option>
                  <option value="true">No</option>
                </select>
              </div>
              <div className="filter">
                <label>Fecha de inicio:</label>
                <input
                  type="date"
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                />
              </div>
              <div className="filter">
                <label>Fecha de fin:</label>
                <input
                  type="date"
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                />
              </div>
            </div>
          )}

        {loading && (
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
        )}
        {!loading && data && renderTable()}
        {!loading && !data && (
          <p
            className={`search-anime__no-results ${
              darkMode ? "search-anime__no-results--dark" : ""
            }`}
          >
            No hay resultados
          </p>
        )}
      </div>
      {data && (
        <div className="pagination">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={data.pagination.current_page === 1}
            className="pagination__button"
          >
            Anterior
          </button>
          {visiblePages.map((page) => (
            <button
              key={page}
              className={`pagination__button ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={!data.pagination.has_next_page}
            className="pagination__button"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
};

export default Search;
