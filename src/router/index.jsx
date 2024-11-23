import { createBrowserRouter } from "react-router-dom";
// Importación de componentes y páginas necesarias para las rutas
import LayoutPublic from "../layouts/LayoutPublic";
import Error404 from "../pages/errors/Error404";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/auth/Profile";
import EditProfile from "../pages/auth/EditProfile";
import Anime from "../pages/info/Anime";
import SearchAnime from "../pages/results/SearchAnime";
import TopAnimes from "../pages/results/TopAnimes";
import AnimesBySeason from "../pages/results/AnimesBySeason";
import Manga from "../pages/info/Manga";
import SearchManga from "../pages/results/SearchManga";
import TopMangas from "../pages/results/TopMangas";
import MangasBySeason from "../pages/results/MangasBySeason";
import Contact from "../pages/auth/Contact";
import Seiyuu from "../pages/info/Seiyuu";
import Character from "../pages/info/Character";

// Definición del router con las rutas principales y anidadas
export const router = createBrowserRouter([
  {
    path: "/", // Ruta raíz
    element: <LayoutPublic />, // Componente de diseño principal para las rutas públicas
    errorElement: (
      <LayoutPublic>
        <Error404 /> {/* Página de error 404 en caso de ruta no encontrada */}
      </LayoutPublic>
    ),
    children: [
      {
        index: true, // Ruta por defecto para "/"
        element: <Home />, // Componente de la página de inicio
      },
      {
        path: "/login", // Ruta para iniciar sesión
        element: <Login />,
      },
      {
        path: "/register", // Ruta para registrarse
        element: <Register />,
      },
      {
        path: "/profile", // Ruta para el perfil del usuario
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "/profile/edit", // Subruta para editar el perfil
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/contact", // Ruta para la página de contacto
        element: <Contact />,
      },
      {
        path: "/anime", // Rutas relacionadas con animes
        children: [
          {
            path: "/anime/:id", // Ruta para información de un anime específico
            element: <Anime />,
          },
          {
            path: "/anime/search", // Ruta para buscar animes
            element: <SearchAnime />,
          },
          {
            path: "/anime/top", // Ruta para ver los animes más populares
            element: <TopAnimes />,
          },
          {
            path: "/anime/season", // Ruta para animes por temporada
            element: <AnimesBySeason />,
          },
        ],
      },
      {
        path: "/manga", // Rutas relacionadas con mangas
        children: [
          {
            path: "/manga/:id", // Ruta para información de un manga específico
            element: <Manga />,
          },
          {
            path: "/manga/search", // Ruta para buscar mangas
            element: <SearchManga />,
          },
          {
            path: "/manga/top", // Ruta para ver los mangas más populares
            element: <TopMangas />,
          },
          {
            path: "/manga/season", // Ruta para mangas por temporada
            element: <MangasBySeason />,
          },
        ],
      },
      {
        path: "/seiyuu/:id", // Ruta para información de un actor de voz específico
        element: <Seiyuu />,
      },
      {
        path: "/character/:id", // Ruta para información de un personaje específico
        element: <Character />,
      },
    ],
  },
]);
