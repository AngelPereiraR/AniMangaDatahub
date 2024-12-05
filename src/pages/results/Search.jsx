import React, { useContext, useEffect, useState } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { ThemeContext } from "../../context/ThemeContext";
import Heading from "../../components/shared/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "../../components/layouts/Dropdown";
import { useFetch } from "../../hooks/useFetch";

const menuOptions = [
  { label: "Animes", endpoint: "anime" },
  { label: "Mangas", endpoint: "manga" },
  { label: "Personajes", endpoint: "characters" },
  { label: "Personas", endpoint: "people" },
];

const SearchAnime = () => {
  const { darkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownValue, setDropdownValue] = useState(menuOptions[0].endpoint);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { updateFormMode } = useContext(FormModeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const filtered = searchParams.get("filtered") || "";
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
    safeMode: false, // Modo seguro
  });
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(query);
    if (filtered !== "") setDropdownValue(filtered);
    updateEditScreen(false);
    updateFormMode(false);
    updateUrlParams();
  }, [query, filtered, searchTerm, dropdownValue]);

  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("query", searchTerm);
    if (dropdownValue) params.set("filtered", dropdownValue);
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]) params.set(key, filterValues[key]);
    });

    navigate(`?${params.toString()}`);
  };

  const { data, loading, error } = useFetch(finalUrl);

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = (searchTerm) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setFinalUrl(buildUrl(searchTerm));
    }, 3000);

    setTimeoutId(newTimeoutId);
  };

  const buildUrl = () => {
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
    if (filterValues.safeMode) filters.set("safe_mode", filterValues.safeMode);

    return `https://api.jikan.moe/v4/${dropdownValue}?${filters.toString()}&limit=24&page=${currentPage}`;
  };

  const handleSearchButtonClick = () => {
    setFinalUrl(buildUrl(searchTerm));
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
  };

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
          <button type="button" onClick={handleSearchButtonClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {(dropdownValue === "anime" || dropdownValue === "manga") && (
          <button
            className="filters-button"
            onClick={toggleFilters}
            aria-label="Filtros avanzados"
          >
            <i className="fa-solid fa-filter"></i>
          </button>
        )}
      </div>

      {/* Filtros avanzados */}
      {showFilters &&
        (dropdownValue === "anime" || dropdownValue === "manga") && (
          <div className="advanced-filters">
            <div className="filter">
              <label>Tipo:</label>
              {dropdownValue === "anime" ? (
                <select
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  value={filterValues.type}
                >
                  <option value="tv">TV</option>
                  <option value="movie">Película</option>
                  <option value="ona">OVA</option>
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
              <input type="range" min="0" max="10" step="0.1" />
            </div>
            <div className="filter">
              <label>Estado:</label>
              {dropdownValue === "anime" ? (
                <select>
                  <option value="airing">En emisión</option>
                  <option value="finished">Terminado</option>
                  <option value="upcoming">Próximo</option>
                </select>
              ) : (
                <select>
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
                <select>
                  <option value="g">G - Todas las edades</option>
                  <option value="pg">PG - Niños</option>
                  <option value="pg13">
                    PG-13 - Adolescentes de 13 años o mayores
                  </option>
                  <option value="r17">R- 17+ - (Violencia y profanidad)</option>
                  <option value="r">R+ - Desnudez leve</option>
                  <option value="rx">Rx - Hentai</option>
                </select>
              </div>
            )}
            <div className="filter">
              <label>Modo seguro</label>
              <select>
                <option value="false">Sí</option>
                <option value="true">No</option>
              </select>
            </div>
            <div className="filter">
              <label>Fecha de inicio:</label>
              <input type="date" />
            </div>
            <div className="filter">
              <label>Fecha de fin:</label>
              <input type="date" />
            </div>
          </div>
        )}

      {loading && <p>Cargando...</p>}
      {!loading && data && <div>{/* Renderizar resultados */}</div>}
    </main>
  );
};

export default SearchAnime;
